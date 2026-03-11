import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const rateTooHighScenarioPage: ScenarioPageData = {
  slug: 'rate-too-high',
  seoTitle: 'How to Respond When a Client Says Your Rate Is Too High | Flowdockr',
  metaDescription:
    "Learn how to respond when a client says your freelance rate is too high and try Flowdockr's negotiation guidance for this situation.",
  canonicalPath: '/scenario/rate-too-high',
  h1: 'How to respond when a client says your rate is too high',
  subtitle:
    'A common freelance negotiation moment where your response can affect both price and trust.',
  overview: [
    'A client saying your rate is too high is one of the most common freelance negotiation moments.',
    'Lowering your price too quickly can weaken your position, but pushing back too aggressively can damage the relationship.',
    'Many freelancers struggle to respond in a way that protects both their price and the client relationship.',
  ],
  difficultyPoints: [
    'Price pressure often appears late in the conversation.',
    'Your response can change how the client perceives your value.',
    'A rushed reply can make the negotiation harder.',
  ],
  commonMistakes: [
    'Lowering the price immediately',
    'Over-explaining the quote',
    'Responding defensively',
    "Ignoring the client's concern",
  ],
  mistakesClosingLine:
    'These responses often make the negotiation harder instead of clarifying the next step.',
  toolPreset: {
    scenarioSlug: 'lowball-offer',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Thanks for the quote. We like the direction, but $1,200 is above budget. Can you do it for $800?',
  },
  relatedScenarios: [
    related('discount-request', 'What to say when a client asks for a discount'),
    related(
      'price-too-expensive',
      'Client says your price is too expensive: how to respond'
    ),
    related(
      'extra-revisions',
      'How to respond when a client asks for extra revisions'
    ),
    related('late-payment', 'How to respond when a client delays payment'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
