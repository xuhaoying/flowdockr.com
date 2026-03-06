import { ScenarioContent } from '@/types/scenario';

export const wantsMoreWorkSameBudgetScenario: ScenarioContent = {
  slug: 'client-wants-more-work-for-same-budget',
  seoTitle: 'Client Wants More Work for the Same Budget: How to Reply',
  seoDescription:
    'Generate a response when clients ask for additional work without increasing budget. Keep scope control and relationship quality.',
  h1: 'Client wants more work for the same budget',
  intro:
    'Scope expansion requests are common right before delivery. You need to keep collaboration positive while resetting terms clearly.',
  problemSummary:
    'Extra work without budget changes hurts margin and timeline. A good response separates in-scope vs out-of-scope and gives options.',
  bullets: [
    'Confirm the request and stay collaborative',
    'Clarify impact on scope, timeline, and cost',
    'Offer option A/B paths for fast decisions',
  ],
  examples: [
    {
      title: 'Scope clarification',
      reply:
        'Happy to include that if needed. Since it extends the original scope, I can either add it with an updated quote or keep current budget and prioritize only the core deliverables.',
    },
    {
      title: 'Timeline + scope option',
      reply:
        'That addition is workable, but it changes scope and delivery effort. I can send two options today: keep budget with current scope, or expand scope with adjusted pricing and timing.',
    },
    {
      title: 'Concise reset',
      reply:
        'Great request. To do this properly, we should treat it as scope expansion. I can share an add-on estimate, or we keep the current scope under the original budget.',
    },
  ],
  mistakes: [
    'Saying yes without updating terms',
    'Using blame-heavy language',
    'Mixing goodwill favors with production work repeatedly',
  ],
  faq: [
    {
      question: 'Can I include small extras for goodwill?',
      answer:
        'Yes, but keep it intentional and limited. Document what is one-time goodwill versus billable expansion.',
    },
    {
      question: 'How should I present options?',
      answer:
        'Use clear A/B paths: original scope at original budget, or expanded scope with revised fee/timeline.',
    },
    {
      question: 'Should I mention contract terms?',
      answer:
        'Briefly, yes. Mention agreed scope and propose the cleanest next step.',
    },
  ],
  relatedSlugs: [
    'client-asks-for-free-sample-work',
    'client-asks-for-one-small-thing-for-free',
    'client-asks-for-a-discount',
  ],
  promptContext: {
    scenarioType: 'scope_expansion_same_budget',
    negotiationGoal: 'protect_scope_and_margin',
    riskLevel: 'medium',
    defaultTone: 'warm_confident',
  },
};
