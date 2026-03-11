import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const scopeCreepScenarioPage: ScenarioPageData = {
  slug: 'scope-creep',
  seoTitle:
    'What to Say When a Client Expands the Project Scope | Flowdockr',
  metaDescription:
    'Learn how to respond when a project scope expands and test the scenario in Flowdockr.',
  canonicalPath: '/scenario/scope-creep',
  h1: 'What to say when a client expands the project scope',
  subtitle:
    'A project-boundary moment where extra work starts to blur the original agreement.',
  overview: [
    'Scope creep often happens gradually, with new requests added after the project has already started.',
    'Because the additions come in pieces, it can feel awkward to stop and renegotiate.',
    'The longer you wait, the harder it becomes to reset the terms.',
  ],
  difficultyPoints: [
    'Scope changes can arrive in small, seemingly harmless additions.',
    'Clients may assume flexibility means inclusion.',
    'Renegotiation feels harder once momentum is already underway.',
  ],
  commonMistakes: [
    'Accepting additions without restating scope',
    'Waiting too long to address the change',
    'Treating every new request as goodwill work',
    'Failing to connect changes to time or price',
  ],
  mistakesClosingLine:
    'These patterns turn scope drift into the new default instead of resetting the agreement.',
  toolPreset: {
    scenarioSlug: 'scope-creep',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Can we also add two more pages and a slightly different flow while we are at it?',
  },
  relatedScenarios: [
    related(
      'extra-revisions',
      'How to respond when a client asks for extra revisions'
    ),
    related(
      'additional-features',
      'Client asks for additional features after agreement'
    ),
    related('more-work', 'When a client keeps asking for more work'),
    related(
      'rush-delivery',
      'What to say when a client asks for rush delivery'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
