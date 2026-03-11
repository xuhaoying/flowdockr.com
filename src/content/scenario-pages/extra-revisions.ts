import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const extraRevisionsScenarioPage: ScenarioPageData = {
  slug: 'extra-revisions',
  seoTitle:
    'How to Respond When a Client Asks for Extra Revisions | Flowdockr',
  metaDescription:
    'Learn how to handle clients asking for extra revisions beyond the original scope.',
  canonicalPath: '/scenario/extra-revisions',
  h1: 'How to respond when a client asks for extra revisions',
  subtitle:
    'A scope-boundary moment where you need to stay helpful without giving away unlimited work.',
  overview: [
    'Extra revisions often sound small in the moment, but they can quickly expand the project beyond the original agreement.',
    'Many freelancers want to stay accommodating and end up absorbing more work than planned.',
    'A good response protects the relationship while re-establishing boundaries.',
  ],
  difficultyPoints: [
    'Revision requests are often framed as minor adjustments.',
    'Saying yes too casually can reset the scope expectation.',
    'Pushing back too late makes the boundary harder to defend.',
  ],
  commonMistakes: [
    'Agreeing before checking the agreed scope',
    'Treating all revisions as included by default',
    'Explaining boundaries too harshly',
    'Avoiding the pricing conversation entirely',
  ],
  mistakesClosingLine:
    'These replies blur what was included and make later boundaries harder to defend.',
  toolPreset: {
    scenarioSlug: 'small-extra-free',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Can we do a few more revision rounds before we finalize this?',
  },
  relatedScenarios: [
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
    related(
      'additional-features',
      'Client asks for additional features after agreement'
    ),
    related('more-work', 'When a client keeps asking for more work'),
    related('discount-request', 'What to say when a client asks for a discount'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
