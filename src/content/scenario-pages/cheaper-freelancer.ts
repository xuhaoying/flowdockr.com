import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const cheaperFreelancerScenarioPage: ScenarioPageData = {
  slug: 'cheaper-freelancer',
  seoTitle:
    'When a Client Compares You With a Cheaper Freelancer | Flowdockr',
  metaDescription:
    'Learn how to respond when a client compares your price with a cheaper freelancer.',
  canonicalPath: '/scenario/cheaper-freelancer',
  h1: 'When a client compares you with a cheaper freelancer',
  subtitle:
    'A pricing comparison moment where you need to reinforce fit and value instead of racing to the bottom.',
  overview: [
    'Some clients will mention a cheaper freelancer to pressure your pricing or test your flexibility.',
    'This can trigger insecurity or push you toward matching the lower rate.',
    'A better response keeps the conversation focused on scope, fit, and outcomes.',
  ],
  difficultyPoints: [
    'Comparison anchors the conversation around price instead of value.',
    'Matching a lower rate can damage your positioning.',
    'Reacting defensively can make you look uncertain.',
  ],
  commonMistakes: [
    'Trying to match the cheaper quote immediately',
    'Criticizing the other freelancer',
    'Over-defending your value',
    'Treating the comparison as a personal attack',
  ],
  mistakesClosingLine:
    'These reactions make the comparison stronger instead of moving the client back toward fit.',
  toolPreset: {
    scenarioSlug: 'cheaper-freelancer',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Another freelancer said they could do this for much less. Can you match that?',
  },
  relatedScenarios: [
    related(
      'rate-too-high',
      'How to respond when a client says your rate is too high'
    ),
    related('discount-request', 'What to say when a client asks for a discount'),
    related(
      'price-too-expensive',
      'Client says your price is too expensive: how to respond'
    ),
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
