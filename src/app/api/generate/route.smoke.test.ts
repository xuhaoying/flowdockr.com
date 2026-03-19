// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  hashRequestIp: vi.fn(() => 'ip_hash'),
  hashRequestUserAgent: vi.fn(() => 'ua_hash'),
  setAnonymousSessionCookie: vi.fn(),
  canGenerate: vi.fn(),
  consumeUsage: vi.fn(),
  getGenerationIdentity: vi.fn(),
  getDefaultBillingProfile: vi.fn(),
  getUserBillingProfile: vi.fn(),
  saveGeneration: vi.fn(),
}));

vi.mock('@/lib/anonymous', () => ({
  hashRequestIp: mocks.hashRequestIp,
  hashRequestUserAgent: mocks.hashRequestUserAgent,
  setAnonymousSessionCookie: mocks.setAnonymousSessionCookie,
}));

vi.mock('@/lib/credits', () => ({
  canGenerate: mocks.canGenerate,
  consumeUsage: mocks.consumeUsage,
  getGenerationIdentity: mocks.getGenerationIdentity,
}));

vi.mock('@/lib/billing', () => ({
  getDefaultBillingProfile: mocks.getDefaultBillingProfile,
  getUserBillingProfile: mocks.getUserBillingProfile,
}));

vi.mock('@/lib/generation/saveGeneration', () => ({
  saveGeneration: mocks.saveGeneration,
}));

import { POST } from './route';

const PROVIDER_OUTPUT = {
  strategy: {
    objective:
      'Protect price by linking any movement to scope rather than discounting the same work.',
    why_it_works: [
      'It keeps the price anchor tied to scope and delivery risk.',
      'It gives the client a concrete lower-cost option instead of vague flexibility.',
    ],
    what_to_avoid: [
      'Do not reduce the same scope without a tradeoff.',
      'Do not sound defensive or apologetic about the quote.',
    ],
    negotiation_framing:
      'Treat price as a function of scope, delivery risk, and the result being purchased.',
  },
  replies: {
    professional:
      'Thanks for flagging that. The quote reflects the full scope and delivery standard we discussed, so I would not reduce the same scope without changing something else. If budget is the real constraint, I can outline a leaner first phase or a reduced-scope option so you can compare clear paths forward.',
    firm:
      'I would not lower the same scope to a different number. If the budget needs to change, the clean route is to reduce scope, phase the work, or narrow priorities so the tradeoff is explicit.',
    softer:
      'I understand the budget concern. The current quote is built around the full scope we discussed, but if it helps I can suggest a smaller first phase that keeps the core priority moving without forcing the same scope into a lower fee.',
  },
  risk_insights: [
    'Lowering the same scope too quickly would weaken your price anchor.',
  ],
  follow_up: {
    reply:
      'If helpful, send me the target budget or the one priority that matters most and I will map out two scoped options.',
    direction:
      'Move the client toward a scoped option rather than an unstructured discount.',
  },
};

describe('/api/generate route smoke', () => {
  beforeEach(() => {
    process.env.FAL_API_KEY = 'test-fal-key';
    process.env.OPENAI_API_KEY = '';
    process.env.FLOWDOCKR_MODEL = 'gpt-5-mini';
    delete process.env.FLOWDOCKR_DEBUG_OUTBOUND;

    mocks.getGenerationIdentity.mockResolvedValue({
      isLoggedIn: false,
      anonymousId: 'anon_session_123',
      createdAnonymousId: true,
    });
    mocks.canGenerate.mockResolvedValue({
      isLoggedIn: false,
      anonymousId: 'anon_session_123',
      createdAnonymousId: true,
      creditsRemaining: 0,
      freeRepliesRemaining: 2,
      canGenerate: true,
      requiresUpgrade: false,
      mode: 'free',
    });
    mocks.consumeUsage.mockResolvedValue({
      creditsRemaining: 0,
      freeRepliesRemaining: 1,
      modeUsed: 'free',
    });
    mocks.getDefaultBillingProfile.mockReturnValue({
      creditsRemaining: 0,
      creditsTotal: 0,
      supportLevel: 'free',
      purchasedPlan: 'free_trial',
      entitlements: {
        multiVersionEnabled: false,
        strategyExplanationEnabled: false,
        riskAlertEnabled: false,
        historyEnabled: false,
        followUpEnabled: false,
        advancedModesEnabled: false,
      },
    });
    mocks.getUserBillingProfile.mockResolvedValue(
      mocks.getDefaultBillingProfile()
    );
    mocks.saveGeneration.mockResolvedValue('gen_smoke_123');
  });

  it('returns success true through the route and provider request path', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const providerFetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      expect(String(input)).toBe(
        'https://fal.run/openrouter/router/openai/v1/responses'
      );
      expect(init?.method).toBe('POST');

      const body = JSON.parse(String(init?.body));
      expect(body).toMatchObject({
        model: 'openai/gpt-5-mini',
        input: [
          { role: 'system' },
          { role: 'user' },
        ],
      });
      expect(body).not.toHaveProperty('messages');
      expect(body).not.toHaveProperty('response_format');
      expect(body).not.toHaveProperty('text');
      expect(body).not.toHaveProperty('tools');
      expect(body).not.toHaveProperty('metadata');
      expect(body).not.toHaveProperty('temperature');
      expect(body).not.toHaveProperty('max_output_tokens');

      return new Response(
        JSON.stringify({
          output_text: JSON.stringify(PROVIDER_OUTPUT),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    vi.stubGlobal('fetch', providerFetch);

    const request = new NextRequest('http://localhost/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenarioSlug: 'quote-too-high',
        message:
          'Your quote feels too high for what we expected. If you can bring it down a bit, we can probably move this forward this week.',
        sourcePage: 'tool',
        serviceType: 'developer',
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      success: boolean;
      scenarioSlug: string;
      reply: string;
      generationId?: string;
    };

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      success: true,
      scenarioSlug: 'quote-too-high',
      generationId: 'gen_smoke_123',
    });
    expect(payload.reply.length).toBeGreaterThan(40);
    expect(providerFetch).toHaveBeenCalledTimes(1);
    expect(mocks.saveGeneration).toHaveBeenCalledTimes(1);
    expect(mocks.setAnonymousSessionCookie).toHaveBeenCalledTimes(1);

    const successLogCall = infoSpy.mock.calls.find(
      ([tag, body]) =>
        tag === '[flowdockr.generate]' &&
        typeof body === 'string' &&
        body.includes('"event":"generation_succeeded"')
    );

    expect(successLogCall).toBeTruthy();
    expect(successLogCall?.[1]).toContain('"schema_status":"valid"');
    expect(successLogCall?.[1]).toContain('"fallback_status":"not_used"');
    expect(successLogCall?.[1]).toContain('"rubric_status":"passed"');
    expect(successLogCall?.[1]).toContain('"rubric_failure_reasons":[]');
    expect(successLogCall?.[1]).toContain('"rubric_warning_reasons":');
    expect(successLogCall?.[1]).not.toContain('"rubric_passed"');
    expect(successLogCall?.[1]).not.toContain('"rubric_fail_reasons"');
  });
});
