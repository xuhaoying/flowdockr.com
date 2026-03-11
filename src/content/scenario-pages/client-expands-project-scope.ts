import type { ScenarioPageData } from '@/types/scenario-page';

export const clientExpandsProjectScopeScenarioPage: ScenarioPageData = {
  slug: 'client-expands-project-scope',
  seoTitle:
    'How to Respond When a Client Expands the Project Scope | Flowdockr',
  metaDescription:
    'Learn how to respond when a client expands the project scope and try Flowdockr guidance for this negotiation situation.',
  canonicalPath: '/scenario/client-expands-project-scope',
  h1: 'How to respond when a client expands the project scope',
  subtitle:
    'A familiar project moment where new asks can quietly turn into unpriced work.',
  overview: [
    'Project scope often expands after the client sees progress and starts adding new requests.',
    'If you absorb that extra work without resetting scope, timeline, or price, the project becomes harder to deliver well.',
    'The goal is to acknowledge the request while re-establishing what the original agreement actually covers.',
  ],
  difficultyPoints: [
    'Scope changes often arrive gradually rather than as one clear request.',
    'The client may not realize the new ask changes effort, timeline, or price.',
    'A rushed yes can make future boundaries much harder to defend.',
  ],
  commonMistakes: [
    'Treating new deliverables as part of the original quote',
    'Quoting extra work without clarifying the scope change',
    'Letting urgency replace a clear scope conversation',
    'Skipping a revised next step',
  ],
  mistakesClosingLine:
    'These responses usually create more ambiguity instead of less.',
  toolPreset: {
    scenarioSlug: 'more-work-same-budget',
    title: 'Try this scenario',
    description:
      'Paste the client message and review a response strategy before scope keeps drifting.',
    ctaLabel: 'Generate negotiation guidance',
    inputPlaceholder:
      'Can we also add a landing page and two extra deliverables without changing the original budget?',
  },
  relatedScenarios: [
    {
      slug: 'client-says-rate-too-high',
      title: 'How to respond when a client says your rate is too high',
    },
    {
      slug: 'client-asks-for-discount',
      title: 'How to respond when a client asks for a discount',
    },
    {
      slug: 'client-asks-for-extra-revisions',
      title: 'How to respond when a client asks for extra revisions',
    },
    {
      slug: 'client-delays-payment',
      title: 'How to respond when a client delays payment',
    },
  ],
  cta: {
    title: 'Try your own client message',
    description:
      'See how Flowdockr suggests responding before the project scope moves again.',
    buttonLabel: 'Start with this scenario',
  },
};
