import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const additionalFeaturesScenarioPage: ScenarioPageData = {
  slug: 'additional-features',
  seoTitle:
    'Client Asks for Additional Features After Agreement | Flowdockr',
  metaDescription:
    'Learn how to respond when a client asks for additional features after the project is already agreed.',
  canonicalPath: '/scenario/additional-features',
  h1: 'Client asks for additional features after agreement',
  subtitle:
    'A post-agreement request where small additions can quietly become unpaid scope expansion.',
  overview: [
    'Additional feature requests often arrive after a client feels excited and starts imagining more possibilities.',
    'These requests are not always unreasonable, but they do change the original agreement.',
    'A strong response stays positive while making the scope impact visible.',
  ],
  difficultyPoints: [
    'Clients may present extra features as natural extensions.',
    'The request can sound small while carrying meaningful implementation cost.',
    'It is easy to say yes before evaluating downstream effects.',
  ],
  commonMistakes: [
    'Treating new features as if they were already included',
    'Giving a quick yes before reviewing the impact',
    'Avoiding a scope or pricing adjustment discussion',
    'Letting enthusiasm erase boundaries',
  ],
  mistakesClosingLine:
    'These replies encourage expansion before the work has been properly re-scoped.',
  toolPreset: {
    scenarioSlug: 'additional-features',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'We were thinking it would be great to add one more feature before launch. Could you include that too?',
  },
  relatedScenarios: [
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
    related(
      'extra-revisions',
      'How to respond when a client asks for extra revisions'
    ),
    related('more-work', 'When a client keeps asking for more work'),
    related(
      'faster-turnaround',
      'When a client asks for faster turnaround'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
