import type { GenerateReplyResponse } from '@/types/generation';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ToolForm } from './ToolForm';

const { trackEvent } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@/lib/analytics', () => ({
  trackEvent,
}));

vi.mock('./ToolPaywall', () => ({
  ToolPaywall: ({
    onCheckout,
  }: {
    onCheckout: (packageId: 'quick_help') => void;
  }) => (
    <div data-testid="tool-paywall">
      <button type="button" onClick={() => onCheckout('quick_help')}>
        Mock checkout
      </button>
    </div>
  ),
}));

vi.mock('./ToolResult', () => ({
  ToolResult: ({
    onFeedback,
  }: {
    onFeedback: (params: {
      type: 'sent_as_is' | 'edited_before_send' | 'not_useful' | 'regenerated';
      reason?:
        | 'too_generic'
        | 'too_soft'
        | 'too_aggressive'
        | 'missed_context'
        | 'not_my_style';
    }) => void;
  }) => (
    <div data-testid="tool-result">
      <button
        type="button"
        onClick={() =>
          onFeedback({ type: 'not_useful', reason: 'too_generic' })
        }
      >
        Mock feedback
      </button>
    </div>
  ),
}));

function buildSuccessResponse(): GenerateReplyResponse {
  return {
    success: true,
    reply:
      'Thanks for sharing that. I can adjust scope if budget is the issue.',
    alternativeReply:
      'Happy to explore a leaner version if that would help keep the project moving.',
    strategy: ['Hold value', 'Offer scope options', 'Keep next step clear'],
    scenarioSlug: 'quote-too-high',
    generationId: 'gen_test_123',
    strategyBlock: {
      title: 'Suggested approach',
      sections: [
        {
          title: 'Objective',
          bullets: ['Protect price while keeping the deal workable.'],
        },
      ],
    },
    replyVersions: [],
    riskInsights: [],
    supportLevel: 'free',
    entitlements: {
      multiVersionEnabled: false,
      strategyExplanationEnabled: false,
      riskAlertEnabled: false,
      historyEnabled: false,
      followUpEnabled: false,
      advancedModesEnabled: false,
    },
  };
}

function installFetchMock(params?: {
  remainingFreeGenerations?: number;
  generateResponse?: GenerateReplyResponse;
}) {
  const {
    remainingFreeGenerations = 2,
    generateResponse = buildSuccessResponse(),
  } = params || {};

  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = getRequestUrl(input);

    if (url === '/api/session') {
      return buildJsonResponse({});
    }

    if (url === '/api/credits') {
      return buildJsonResponse({
        loggedIn: false,
        remainingFreeGenerations,
      });
    }

    if (url === '/api/generate') {
      return buildJsonResponse(generateResponse);
    }

    if (url === '/api/generate/feedback') {
      return buildJsonResponse({ ok: true });
    }

    if (url === '/api/checkout/session') {
      return buildJsonResponse({
        ok: true,
        checkoutUrl: 'https://checkout.stripe.com/mock-session',
      });
    }

    throw new Error(`Unexpected fetch url: ${url}`);
  });

  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function buildJsonResponse(payload: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
  } as Response;
}

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

function getEventPayloads(eventName: string) {
  return trackEvent.mock.calls
    .filter(([name]) => name === eventName)
    .map(([, payload]) => payload);
}

function getClientMessageInput() {
  return screen.getAllByRole('textbox')[0];
}

async function renderToolForm(params?: {
  funnelScenarioSlug?: string;
  remainingFreeGenerations?: number;
  sourcePage?: 'home' | 'scenario' | 'tool';
  pricingAttribution?: {
    pricingSlug: 'client-messaging-outside-work-hours';
    sourceSurface: 'pricing_page' | 'tool_page';
    locale: 'en';
  };
  generateResponse?: GenerateReplyResponse;
}) {
  const fetchMock = installFetchMock({
    remainingFreeGenerations: params?.remainingFreeGenerations,
    generateResponse: params?.generateResponse,
  });

  render(
    <ToolForm
      analyticsScenarioSlug="quote-too-high"
      funnelScenarioSlug={params?.funnelScenarioSlug}
      pricingAttribution={params?.pricingAttribution}
      sourcePage={params?.sourcePage || 'scenario'}
      defaultScenarioSlug="quote-too-high"
      showScenarioSelector={false}
    />
  );

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });

  return fetchMock;
}

describe('ToolForm analytics funnel guard', () => {
  beforeEach(() => {
    trackEvent.mockReset();
    vi.unstubAllGlobals();
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('location', {
      assign: vi.fn(),
    } as unknown as Location);
  });

  it('keeps the default first-touch form limited to message and generate', async () => {
    await renderToolForm({
      remainingFreeGenerations: 2,
    });

    expect(
      screen.queryByRole('combobox', { name: 'Pricing situation' })
    ).toBeNull();
    expect(screen.queryByRole('combobox', { name: 'Tone' })).toBeNull();
    expect(screen.queryByRole('combobox', { name: 'Project type' })).toBeNull();
    expect(
      screen.queryByText('Quote / scope / deal context (optional)')
    ).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    ).toBeTruthy();
  });

  it('emits canonical tool_start and generation_success when funnelScenarioSlug is present', async () => {
    await renderToolForm({
      funnelScenarioSlug: 'quote-too-high',
      remainingFreeGenerations: 2,
    });

    fireEvent.change(getClientMessageInput(), {
      target: { value: 'Your quote is too high for us.' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    );

    await waitFor(() => {
      expect(getEventPayloads('fd_generation_success')).toHaveLength(1);
    });

    expect(getEventPayloads('fd_tool_start')[0]).toMatchObject({
      scenario_slug: 'quote-too-high',
      page_type: 'scenario',
    });
    expect(getEventPayloads('fd_generation_success')[0]).toMatchObject({
      scenario_slug: 'quote-too-high',
      page_type: 'scenario',
    });
  });

  it('does not emit canonical tool_start and generation_success without funnelScenarioSlug', async () => {
    await renderToolForm({
      remainingFreeGenerations: 2,
    });

    fireEvent.change(getClientMessageInput(), {
      target: { value: 'Your quote is too high for us.' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    );

    await waitFor(() => {
      expect(getEventPayloads('tool_submit_success')).toHaveLength(1);
    });

    expect(getEventPayloads('fd_tool_start')).toHaveLength(0);
    expect(getEventPayloads('fd_generation_success')).toHaveLength(0);
  });

  it('emits canonical paywall_shown when funnelScenarioSlug is present', async () => {
    await renderToolForm({
      funnelScenarioSlug: 'quote-too-high',
      remainingFreeGenerations: 0,
    });

    await waitFor(() => {
      expect(getEventPayloads('fd_paywall_shown')).toHaveLength(1);
    });

    expect(getEventPayloads('fd_paywall_shown')[0]).toMatchObject({
      scenario_slug: 'quote-too-high',
      page_type: 'scenario',
    });
  });

  it('does not emit canonical paywall_shown without funnelScenarioSlug', async () => {
    await renderToolForm({
      remainingFreeGenerations: 0,
    });

    await waitFor(() => {
      expect(getEventPayloads('paywall_trigger')).toHaveLength(1);
    });

    expect(getEventPayloads('fd_paywall_shown')).toHaveLength(0);
  });

  it('does not leak scenario_slug on generic tool events outside canonical scenario routes', async () => {
    await renderToolForm({
      remainingFreeGenerations: 2,
      sourcePage: 'tool',
    });

    fireEvent.change(getClientMessageInput(), {
      target: { value: 'Your quote is too high for us.' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    );

    await waitFor(() => {
      expect(getEventPayloads('tool_submit_success')).toHaveLength(1);
    });

    expect(getEventPayloads('tool_open')[0]).not.toHaveProperty(
      'scenario_slug'
    );
    expect(getEventPayloads('generate_click')[0]).not.toHaveProperty(
      'scenario_slug'
    );
  });

  it('emits pricing-attributed funnel events and request bodies for pricing-origin sessions', async () => {
    const generateResponse: GenerateReplyResponse = {
      ...buildSuccessResponse(),
      entitlements: {
        multiVersionEnabled: false,
        strategyExplanationEnabled: false,
        riskAlertEnabled: false,
        historyEnabled: true,
        followUpEnabled: false,
        advancedModesEnabled: false,
      },
    };
    const fetchMock = await renderToolForm({
      remainingFreeGenerations: 2,
      sourcePage: 'tool',
      pricingAttribution: {
        pricingSlug: 'client-messaging-outside-work-hours',
        sourceSurface: 'tool_page',
        locale: 'en',
      },
      generateResponse,
    });

    fireEvent.change(getClientMessageInput(), {
      target: { value: 'Can you answer tonight? I need this now.' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    );

    await waitFor(() => {
      expect(getEventPayloads('generate_success_from_pricing_scenario')).toHaveLength(
        1
      );
    });

    expect(
      getEventPayloads('click_generate_from_pricing_scenario')[0]
    ).toMatchObject({
      pricing_slug: 'client-messaging-outside-work-hours',
      pricing_family: 'availability-boundary',
      generator_scenario_slug: 'client-messaging-outside-work-hours',
      generator_mapping_kind: 'dedicated',
      source_surface: 'tool_page',
      page_type: 'pricing',
    });
    expect(
      getEventPayloads('generate_success_from_pricing_scenario')[0]
    ).toMatchObject({
      pricing_slug: 'client-messaging-outside-work-hours',
      generation_id: 'gen_test_123',
    });
    expect(getEventPayloads('save_history_from_pricing_scenario')[0]).toMatchObject(
      {
        pricing_slug: 'client-messaging-outside-work-hours',
        generation_id: 'gen_test_123',
      }
    );

    const generateCall = fetchMock.mock.calls.find(
      ([input]) => getRequestUrl(input) === '/api/generate'
    ) as [RequestInfo | URL, RequestInit?] | undefined;
    expect(generateCall).toBeDefined();
    const generateInit = (generateCall?.[1] || {}) as RequestInit;
    expect(JSON.parse(String(generateInit.body))).toMatchObject({
      pricingAttribution: {
        pricingSlug: 'client-messaging-outside-work-hours',
        sourceSurface: 'tool_page',
        locale: 'en',
      },
    });
  });

  it('emits pricing-attributed checkout click events and checkout request bodies', async () => {
    const fetchMock = await renderToolForm({
      remainingFreeGenerations: 0,
      sourcePage: 'tool',
      pricingAttribution: {
        pricingSlug: 'client-messaging-outside-work-hours',
        sourceSurface: 'tool_page',
        locale: 'en',
      },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Mock checkout' })).toBeTruthy();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Mock checkout' }));

    await waitFor(() => {
      expect(getEventPayloads('click_checkout_from_pricing_scenario')).toHaveLength(
        1
      );
    });

    expect(getEventPayloads('click_checkout_from_pricing_scenario')[0]).toMatchObject(
      {
        pricing_slug: 'client-messaging-outside-work-hours',
        source_surface: 'tool_page',
      }
    );

    const checkoutCall = fetchMock.mock.calls.find(
      ([input]) => getRequestUrl(input) === '/api/checkout/session'
    ) as [RequestInfo | URL, RequestInit?] | undefined;
    expect(checkoutCall).toBeDefined();
    const checkoutInit = (checkoutCall?.[1] || {}) as RequestInit;
    expect(JSON.parse(String(checkoutInit.body))).toMatchObject({
      pricingAttribution: {
        pricingSlug: 'client-messaging-outside-work-hours',
        sourceSurface: 'tool_page',
        locale: 'en',
      },
    });
  });

  it('does not leak scenario_slug on non-canonical paywall and checkout events', async () => {
    await renderToolForm({
      remainingFreeGenerations: 0,
      sourcePage: 'tool',
    });

    await waitFor(() => {
      expect(getEventPayloads('paywall_trigger')).toHaveLength(1);
    });

    expect(getEventPayloads('paywall_trigger')[0]).not.toHaveProperty(
      'scenario_slug'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Mock checkout' }));

    await waitFor(() => {
      expect(getEventPayloads('checkout_click')).toHaveLength(1);
    });

    expect(getEventPayloads('checkout_click')[0]).not.toHaveProperty(
      'scenario_slug'
    );
  });

  it('does not leak scenario_slug on non-canonical feedback events', async () => {
    await renderToolForm({
      remainingFreeGenerations: 2,
      sourcePage: 'tool',
    });

    fireEvent.change(getClientMessageInput(), {
      target: { value: 'Your quote is too high for us.' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Draft negotiation reply' })
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Mock feedback' })
      ).toBeTruthy();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Mock feedback' }));

    await waitFor(() => {
      expect(getEventPayloads('generation_feedback_submitted')).toHaveLength(1);
    });

    expect(
      getEventPayloads('generation_feedback_submitted')[0]
    ).not.toHaveProperty('scenario_slug');
  });
});
