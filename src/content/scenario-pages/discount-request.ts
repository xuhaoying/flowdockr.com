import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const discountRequestScenarioPage: ScenarioPageData = {
  slug: 'discount-request',
  seoTitle: 'What to Say When a Client Asks for a Discount | Flowdockr',
  metaDescription:
    'Learn how to respond when a client asks for a discount in a freelance negotiation and try the scenario in Flowdockr.',
  canonicalPath: '/scenario/discount-request',
  h1: 'What to say when a client asks for a discount',
  subtitle:
    'A negotiation moment where you need to protect value without shutting down the conversation.',
  overview: [
    'Discount requests are common in freelance work, especially after a client likes the proposal but hesitates on price.',
    'The wrong response can train clients to expect concessions every time they push.',
    'The goal is not only to answer the request, but to protect your positioning.',
  ],
  difficultyPoints: [
    'Clients often frame discounts as a small or reasonable ask.',
    'Conceding too quickly can weaken future negotiations.',
    'Refusing too bluntly can create unnecessary friction.',
  ],
  commonMistakes: [
    'Offering a discount immediately',
    'Defending the price emotionally',
    'Saying no without an alternative',
    'Turning the conversation into a long justification',
  ],
  mistakesClosingLine:
    'These moves weaken your position before the client has earned a concession.',
  toolPreset: {
    scenarioSlug: 'client-asks-discount',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'We love the proposal. Is there any room for a discount if we move forward this week?',
  },
  relatedScenarios: [
    related(
      'rate-too-high',
      'How to respond when a client says your rate is too high'
    ),
    related(
      'price-too-expensive',
      'Client says your price is too expensive: how to respond'
    ),
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
    related(
      'extra-revisions',
      'How to respond when a client asks for extra revisions'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
