import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { GenerateReplyResponse } from '@/types/generation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
  ToolPaywall: () => <div data-testid="tool-paywall" />,
}));

vi.mock('./ToolResult', () => ({
  ToolResult: () => <div data-testid="tool-result" />,
}));

import { ToolForm } from './ToolForm';

function buildSuccessResponse(): GenerateReplyResponse {
  return {
    success: true,
    reply: 'Thanks for sharing that. I can adjust scope if budget is the issue.',
    alternativeReply:
      'Happy to explore a leaner version if that would help keep the project moving.',
    strategy: ['Hold value', 'Offer scope options', 'Keep next step clear'],
    scenarioSlug: 'quote-too-high',
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
}) {
  installFetchMock({
    remainingFreeGenerations: params?.remainingFreeGenerations,
  });

  render(
    <ToolForm
      analyticsScenarioSlug="quote-too-high"
      funnelScenarioSlug={params?.funnelScenarioSlug}
      sourcePage="scenario"
      defaultScenarioSlug="quote-too-high"
      showScenarioSelector={false}
    />
  );

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
}

describe('ToolForm analytics funnel guard', () => {
  beforeEach(() => {
    trackEvent.mockReset();
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
});
