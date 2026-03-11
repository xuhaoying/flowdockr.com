import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const fasterTurnaroundScenarioPage: ScenarioPageData = {
  slug: 'faster-turnaround',
  seoTitle:
    'When a Client Asks for Faster Turnaround | Flowdockr',
  metaDescription:
    'Learn how to respond when a client asks for a faster timeline and test the scenario in Flowdockr.',
  canonicalPath: '/scenario/faster-turnaround',
  h1: 'When a client asks for faster turnaround',
  subtitle:
    'A timeline negotiation where speed pressure can blur boundaries and pricing logic.',
  overview: [
    'Faster turnaround requests are common when clients suddenly realize their internal deadline is closer than expected.',
    'These requests may sound simple, but they often affect scheduling, scope, and quality.',
    'A clear response helps you avoid treating speed as a free add-on.',
  ],
  difficultyPoints: [
    'Timeline pressure can make rushed agreement feel easier than careful negotiation.',
    'Clients may not see the cost of reprioritization.',
    'Speed requests often arrive after scope is already set.',
  ],
  commonMistakes: [
    'Saying yes too quickly',
    'Treating timeline compression as free',
    'Ignoring scheduling impact',
    'Responding without clarifying the new deadline',
  ],
  mistakesClosingLine:
    'These responses hide the real cost of speed instead of making the tradeoff visible.',
  toolPreset: {
    scenarioSlug: 'more-work-same-budget',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Could you turn this around faster than we originally discussed?',
  },
  relatedScenarios: [
    related(
      'rush-delivery',
      'What to say when a client asks for rush delivery'
    ),
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
    related(
      'additional-features',
      'Client asks for additional features after agreement'
    ),
    related('late-payment', 'How to respond when a client delays payment'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
