// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenarioBySlug } from '@/lib/scenarios';

import { generateReplyWithAI } from './generation-ai';

const PROVIDER_OUTPUT = {
  strategy: {
    objective:
      'Protect price by linking any movement to scope rather than discounting the same work.',
    why_it_works: [
      'It keeps the price anchor tied to scope and delivery risk.',
    ],
    what_to_avoid: [
      'Do not reduce the same scope without a tradeoff.',
    ],
    negotiation_framing:
      'Treat price as a function of scope and delivery risk.',
  },
  replies: {
    professional:
      'Thanks for flagging that. The quote reflects the full scope we discussed, so I would not lower the same scope without changing something else. If budget is the issue, I can outline a smaller first phase.',
    firm:
      'I would not reduce the same scope to a different number. If the budget needs to change, the clean path is to reduce scope or phase the work.',
    softer:
      'I understand the budget concern. If it helps, I can suggest a smaller first phase rather than force the same scope into a lower fee.',
  },
  risk_insights: [
    'Lowering the same scope too quickly would weaken your price anchor.',
  ],
  follow_up: {
    reply:
      'If helpful, send me the target budget and I can map out two scoped options.',
    direction:
      'Move the client toward a scoped option instead of an unstructured discount.',
  },
};

describe('generateReplyWithAI outbound debug boundary', () => {
  beforeEach(() => {
    process.env.FAL_API_KEY = 'test-fal-key';
    process.env.OPENAI_API_KEY = '';
    process.env.FLOWDOCKR_MODEL = 'gpt-5-mini';
    delete process.env.FLOWDOCKR_DEBUG_OUTBOUND;
  });

  it('stays silent by default', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
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
      })
    );

    await generateReplyWithAI(
      {
        scenarioSlug: 'quote-too-high',
        message: 'Your quote seems a bit high.',
        sourcePage: 'tool',
        serviceType: 'developer',
        goal: 'protect_price',
      },
      getScenarioBySlug('quote-too-high')!
    );

    expect(infoSpy).not.toHaveBeenCalled();
  });

  it('logs only redacted outbound shape when explicitly enabled', async () => {
    process.env.FLOWDOCKR_DEBUG_OUTBOUND = 'true';

    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
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
      })
    );

    await generateReplyWithAI(
      {
        scenarioSlug: 'quote-too-high',
        message: 'Your quote seems a bit high.',
        sourcePage: 'tool',
        serviceType: 'developer',
        goal: 'protect_price',
      },
      getScenarioBySlug('quote-too-high')!
    );

    expect(infoSpy).toHaveBeenCalledWith(
      '[flowdockr.provider]',
      expect.stringContaining('"event":"provider_request_preflight"')
    );
    expect(infoSpy).toHaveBeenCalledWith(
      '[flowdockr.provider]',
      expect.not.stringContaining('Your quote seems a bit high.')
    );
  });
});
