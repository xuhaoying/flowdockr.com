// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  generateReplyWithAI: vi.fn(),
  evaluateReplyQuality: vi.fn(),
}));

vi.mock('@/lib/generation-ai', () => ({
  generateReplyWithAI: mocks.generateReplyWithAI,
}));

vi.mock('./replyQualityRubric', () => ({
  evaluateReplyQuality: mocks.evaluateReplyQuality,
}));

import { getScenarioBySlug } from '@/lib/scenarios';

import { generateReply } from './generateReply';

const MODEL_OUTPUT = JSON.stringify({
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
});

describe('generateReply log semantics', () => {
  beforeEach(() => {
    mocks.generateReplyWithAI.mockReset();
    mocks.evaluateReplyQuality.mockReset();
  });

  it('records warnings separately when rubric still passes', async () => {
    mocks.generateReplyWithAI.mockResolvedValue({
      text: MODEL_OUTPUT,
      model: 'openai/gpt-5-mini',
      provider: 'fal',
      promptMeta: {
        strategyCardSource: 'top10',
        calibrationExampleCount: 3,
        usedServiceAdjustment: true,
      },
    });
    mocks.evaluateReplyQuality.mockReturnValue({
      passed: true,
      score: 5,
      failedCriteria: ['sendability'],
      failures: [
        {
          criterion: 'sendability',
          reason: 'The output is slightly longer than ideal.',
          repairHint: 'Tighten the main reply by one sentence.',
        },
      ],
      repairHints: ['Tighten the main reply by one sentence.'],
      criteria: {
        pressure_recognition: true,
        position_protection: true,
        relationship_quality: true,
        sendability: false,
        non_genericness: true,
        strategic_movement: true,
      },
    });

    const result = await generateReply({
      scenario: getScenarioBySlug('quote-too-high')!,
      message: 'Your quote seems a bit high.',
      sourcePage: 'tool',
      serviceType: 'developer',
    });

    expect(result.generationLog.rubricPassed).toBe(true);
    expect(result.generationLog.rubricFailReasons).toEqual([]);
    expect(result.generationLog.rubricWarningReasons).toEqual([
      'sendability',
    ]);
  });
});
