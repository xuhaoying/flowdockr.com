import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const priceTooExpensiveScenarioPage: ScenarioPageData = {
  slug: 'price-too-expensive',
  seoTitle: 'Client Says Your Price Is Too Expensive: How to Respond | Flowdockr',
  metaDescription:
    'Learn how to respond when a client says your price is too expensive and test the scenario in Flowdockr.',
  canonicalPath: '/scenario/price-too-expensive',
  h1: 'Client says your price is too expensive: how to respond',
  subtitle:
    'A pricing objection where your reply can either reinforce value or weaken your position.',
  overview: [
    'Some clients will say your price feels too expensive even when they have not compared the actual scope closely.',
    'This creates pressure to defend yourself or lower the number too quickly.',
    'A stronger response reframes the conversation around value, scope, or tradeoffs.',
  ],
  difficultyPoints: [
    '“Too expensive” is often vague and emotionally loaded.',
    'Clients may be testing whether price pressure works on you.',
    'A weak reply can make your quote feel negotiable by default.',
  ],
  commonMistakes: [
    'Apologizing for the quote',
    'Dropping the price without changing scope',
    'Explaining every detail of the estimate',
    'Treating the objection as purely emotional',
  ],
  mistakesClosingLine:
    'These responses pull the conversation toward price defense instead of clearer positioning.',
  toolPreset: {
    scenarioSlug: 'price-objection',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'This looks good, but honestly the price feels too expensive for what we had in mind.',
  },
  relatedScenarios: [
    related(
      'rate-too-high',
      'How to respond when a client says your rate is too high'
    ),
    related('discount-request', 'What to say when a client asks for a discount'),
    related(
      'cheaper-freelancer',
      'When a client compares you with a cheaper freelancer'
    ),
    related(
      'rush-delivery',
      'What to say when a client asks for rush delivery'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
