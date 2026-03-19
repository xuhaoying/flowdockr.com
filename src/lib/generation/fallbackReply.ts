import { getStrategyCard } from '@/lib/generation/strategyCards';
import type { Scenario } from '@/lib/scenarios';
import type { GenerateReplyInput } from '@/types/generation';

import type { ParsedGenerationOutput } from './parseResponse';

export type GenerationFallbackReason =
  | 'schema_validation_failed'
  | 'schema_validation_failed_after_retry'
  | 'rubric_failed_after_retry'
  | 'provider_error';

export function buildFallbackReply(params: {
  scenario: Scenario;
  serviceType?: GenerateReplyInput['serviceType'];
  goal?: GenerateReplyInput['goal'];
  reason: GenerationFallbackReason;
}): ParsedGenerationOutput {
  const { card } = getStrategyCard(params.scenario);
  const serviceAdjustment =
    params.serviceType && card.serviceAdjustments
      ? card.serviceAdjustments[params.serviceType]
      : undefined;
  const scopeLever =
    serviceAdjustment?.scopeLever || 'adjust the scope, sequencing, or terms';
  const nextStep = card.nextStepTemplates[0]
    ? normalizeSentence(card.nextStepTemplates[0])
    : 'If helpful, I can outline the cleanest next step from here.';
  const goalLead = getGoalLead(params.goal);

  const professional = [
    goalLead,
    normalizeSentence(card.requiredReframe),
    `If the current version does not fit, the cleanest route is to ${scopeLever} rather than weaken the original terms.`,
    nextStep,
  ].join(' ');

  const firm = [
    normalizeSentence(card.requiredReframe),
    `I would not ${normalizeLower(card.forbiddenConcessions[0] || 'change the same scope without a tradeoff')}.`,
    nextStep,
  ].join(' ');

  const softer = [
    'I understand the constraint.',
    normalizeSentence(card.requiredReframe),
    `If helpful, I can suggest a version that lets us ${scopeLever} without losing the core goal.`,
  ].join(' ');

  return {
    reply: professional,
    alternativeReply: firm,
    strategy: [
      card.primaryGoal,
      card.preferredMoves[0] || card.requiredReframe,
      card.avoidMoves[0] ||
        card.forbiddenConcessions[0] ||
        'Avoid weak concessions.',
    ]
      .map((item) => normalizeSentence(item))
      .slice(0, 3),
    strategyBlock: {
      objective: normalizeSentence(card.primaryGoal),
      whyItWorks: [
        normalizeSentence(card.requiredReframe),
        normalizeSentence(card.preferredMoves[0] || nextStep),
      ].slice(0, 2),
      whatToAvoid: [
        normalizeSentence(
          card.forbiddenConcessions[0] || 'Do not weaken the original terms.'
        ),
        normalizeSentence(
          card.avoidMoves[0] || 'Do not make vague concessions.'
        ),
      ].slice(0, 2),
      negotiationFraming: normalizeSentence(card.toneProfile),
    },
    replyVersions: [
      {
        key: 'professional',
        label: 'Professional',
        text: professional,
      },
      {
        key: 'firm',
        label: 'Firm',
        text: firm,
      },
      {
        key: 'softer',
        label: 'Softer',
        text: softer,
      },
    ],
    riskInsights: [
      normalizeSentence(
        card.redFlags[0] || 'Avoid making an unstructured concession.'
      ),
      normalizeSentence(
        params.reason === 'rubric_failed_after_retry'
          ? 'Fallback was used because the repaired draft still missed the quality rubric.'
          : 'Fallback was used because the structured model output was invalid after retry.'
      ),
    ].slice(0, 2),
    followUpSuggestion: {
      reply:
        card.nextStepTemplates[1] ||
        'If helpful, I can outline the cleanest next step based on the real constraint on your side.',
      direction:
        'Keep the reply commercially clear and move the client toward a concrete choice rather than an open-ended concession.',
    },
    confidence: 'low',
    caution: `Fallback reply used after ${params.reason}. Review the reply before sending.`,
  };
}

function getGoalLead(goal: GenerateReplyInput['goal'] | undefined): string {
  switch (goal) {
    case 'keep_relationship':
      return 'I want to keep this workable without blurring the commercial boundary.';
    case 'close_faster':
      return 'The quickest way to move this forward is to keep the tradeoff clear.';
    case 'offer_scope_reduction':
      return 'A smaller version can work if we define it cleanly.';
    case 'protect_price':
    default:
      return 'I want to keep the commercial logic intact here.';
  }
}

function normalizeSentence(value: string): string {
  const trimmed = value.trim().replace(/^["'\s]+|["'\s]+$/g, '');
  if (!trimmed) {
    return '';
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function normalizeLower(value: string): string {
  const trimmed = value.trim().replace(/^["'\s]+|["'\s]+$/g, '');
  if (!trimmed) {
    return 'change the same scope without a tradeoff';
  }

  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}
