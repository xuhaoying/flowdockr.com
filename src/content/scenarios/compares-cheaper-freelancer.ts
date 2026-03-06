import { ScenarioContent } from '@/types/scenario';

export const comparesCheaperFreelancerScenario: ScenarioContent = {
  slug: 'client-says-another-freelancer-is-cheaper',
  seoTitle: 'Client Says Another Freelancer Is Cheaper: Best Reply',
  seoDescription:
    'Generate a strong reply when a client compares your price with cheaper freelancers. Re-anchor on value and execution quality.',
  h1: 'Client says another freelancer is cheaper',
  intro:
    'Price comparison pressure is rarely only about price. You need to reframe the decision around outcomes, risk, and reliability.',
  problemSummary:
    'When clients compare quotes, freelancers often race to the bottom. A better strategy is value differentiation plus clear options.',
  bullets: [
    'Acknowledge comparison without attacking competitors',
    'Differentiate on outcomes, process, and risk control',
    'Offer choices that keep value visible',
  ],
  examples: [
    {
      title: 'Value differentiation',
      reply:
        'Totally fair to compare options. My pricing reflects the delivery depth, revision structure, and reliability needed for this scope. If budget is the key constraint, I can suggest a trimmed option.',
    },
    {
      title: 'Risk framing',
      reply:
        'I understand. Lower quotes can work in some cases, but this project has quality and timeline risk that my scope is designed to cover. I can share a lean version if you want to prioritize budget.',
    },
    {
      title: 'Decision support',
      reply:
        'Thanks for the context. If helpful, I can send two options: full-scope at the current rate, and a lighter package that reduces cost while protecting core outcomes.',
    },
  ],
  mistakes: [
    'Insulting cheaper competitors',
    'Matching price without redefining scope',
    'Ignoring delivery risk and decision criteria',
  ],
  faq: [
    {
      question: 'Should I match competitor pricing?',
      answer:
        'Usually no. If you adjust price, pair it with clear scope or terms changes so expectations stay aligned.',
    },
    {
      question: 'How do I avoid sounding defensive?',
      answer:
        'Focus on outcomes and fit, not on proving the other provider is bad.',
    },
    {
      question: 'What if the client only cares about budget?',
      answer:
        'Offer a smaller package with clear boundaries instead of discounting full scope.',
    },
  ],
  relatedSlugs: [
    'how-to-respond-to-a-lowball-offer',
    'client-asks-for-a-discount',
    'client-says-budget-is-limited',
  ],
  promptContext: {
    scenarioType: 'cheaper_competitor',
    negotiationGoal: 'differentiate_value_without_price_race',
    riskLevel: 'high',
    defaultTone: 'professional_firm',
  },
};
