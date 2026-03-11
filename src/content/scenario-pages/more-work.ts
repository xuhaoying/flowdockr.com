import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const moreWorkScenarioPage: ScenarioPageData = {
  slug: 'more-work',
  seoTitle: 'When a Client Keeps Asking for More Work | Flowdockr',
  metaDescription:
    'Learn how to handle clients who keep asking for more work without clearly resetting scope or price.',
  canonicalPath: '/scenario/more-work',
  h1: 'When a client keeps asking for more work',
  subtitle:
    'An ongoing boundary problem where repeated small asks can slowly consume your margin and time.',
  overview: [
    'Some clients do not make one big extra request. Instead, they keep adding more work in small pieces.',
    'This can create a pattern where saying yes feels easier than drawing a line.',
    'Over time, the problem becomes less about one request and more about expectation management.',
  ],
  difficultyPoints: [
    'Repeated small asks feel harder to challenge than one large request.',
    'The relationship can drift into open-ended work.',
    'A weak boundary early makes later correction harder.',
  ],
  commonMistakes: [
    'Saying yes to every small add-on',
    'Waiting until frustration builds up',
    'Framing the issue emotionally instead of structurally',
    'Failing to reset expectations clearly',
  ],
  mistakesClosingLine:
    'These patterns encourage open-ended work instead of reinforcing a professional scope boundary.',
  toolPreset: {
    scenarioSlug: 'more-work-same-budget',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Could you also add this one thing? And maybe one more small tweak after that?',
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
    related(
      'additional-features',
      'Client asks for additional features after agreement'
    ),
    related('discount-request', 'What to say when a client asks for a discount'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
