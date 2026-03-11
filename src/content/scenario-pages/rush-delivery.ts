import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const rushDeliveryScenarioPage: ScenarioPageData = {
  slug: 'rush-delivery',
  seoTitle:
    'What to Say When a Client Asks for Rush Delivery | Flowdockr',
  metaDescription:
    'Learn how freelancers respond to rush delivery requests and protect timeline, pricing, and scope.',
  canonicalPath: '/scenario/rush-delivery',
  h1: 'What to say when a client asks for rush delivery',
  subtitle:
    'A time-pressure scenario where urgency can easily lead to underpricing or rushed decisions.',
  overview: [
    'Rush delivery requests often arrive with urgency but without a clear discussion of tradeoffs.',
    'Freelancers may feel pressure to help quickly and sort out the details later.',
    'A better response acknowledges urgency while making timeline and pricing implications explicit.',
  ],
  difficultyPoints: [
    'Urgency can short-circuit careful negotiation.',
    'Clients may assume faster delivery should not change pricing.',
    'Accepting rush work can affect other commitments.',
  ],
  commonMistakes: [
    'Agreeing before checking workload',
    'Not discussing timeline tradeoffs',
    'Treating urgency as included by default',
    'Forgetting to reframe price around speed',
  ],
  mistakesClosingLine:
    'These replies make the faster timeline sound free instead of negotiated.',
  toolPreset: {
    scenarioSlug: 'rush-delivery',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'We need this much sooner than planned. Is there any way you can deliver it by Friday?',
  },
  relatedScenarios: [
    related(
      'faster-turnaround',
      'When a client asks for faster turnaround'
    ),
    related(
      'scope-creep',
      'What to say when a client expands the project scope'
    ),
    related(
      'rate-too-high',
      'How to respond when a client says your rate is too high'
    ),
    related('late-payment', 'How to respond when a client delays payment'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
