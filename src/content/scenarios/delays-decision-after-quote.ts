import { ScenarioContent } from '@/types/scenario';

export const delaysDecisionAfterQuoteScenario: ScenarioContent = {
  slug: 'client-delays-decision-after-quote',
  seoTitle: 'Client Delays Decision After Quote: Follow-up Reply Generator',
  seoDescription:
    'Generate a professional follow-up when a client delays after receiving your quote. Re-open momentum without sounding pushy.',
  h1: 'Client delays decision after your quote',
  intro:
    'Silence after sending a quote usually means uncertainty, priority shift, or internal blockers. Your response should lower friction and prompt a clear next step.',
  problemSummary:
    'Waiting passively stalls pipeline velocity. Good follow-ups are short, respectful, and decision-oriented.',
  bullets: [
    'Re-open conversation without guilt language',
    'Offer a simple yes/no/adjust path',
    'Anchor next step and timeline',
  ],
  examples: [
    {
      title: 'Low-friction follow-up',
      reply:
        'Quick follow-up on the quote I sent. If timing or priorities changed, no problem. I can keep the proposal open, adjust scope, or pause for now based on your preference.',
    },
    {
      title: 'Decision nudge',
      reply:
        'Just checking in on the proposal. If useful, I can provide a lighter-scope option this week so you can decide faster with current constraints.',
    },
    {
      title: 'Timeline anchor',
      reply:
        'Wanted to circle back on the quote. If this is still relevant, I can hold current terms through [date]. If not, I can close this out and reconnect later.',
    },
  ],
  mistakes: [
    'Sending pressure-heavy reminders',
    'Following up without a decision path',
    'Waiting too long between follow-ups',
  ],
  faq: [
    {
      question: 'How long should I wait before following up?',
      answer:
        'A common pattern is 3-5 business days after sending the quote, then another touch with a clear decision path.',
    },
    {
      question: 'Should I lower price in follow-up?',
      answer:
        'Usually no. First diagnose what is blocking the decision, then propose scope-based adjustments if needed.',
    },
    {
      question: 'What is the best call-to-action?',
      answer:
        'Offer simple choices: proceed, adjust scope, or pause.',
    },
  ],
  relatedSlugs: [
    'client-says-budget-is-limited',
    'client-asks-for-a-discount',
    'how-to-respond-to-a-lowball-offer',
  ],
  promptContext: {
    scenarioType: 'decision_delay',
    negotiationGoal: 'recover_momentum_and_get_clear_next_step',
    riskLevel: 'low',
    defaultTone: 'warm_confident',
  },
};
