import type { ScenarioPageData } from '@/types/scenario-page';

export const clientAsksForDiscountScenarioPage: ScenarioPageData = {
  slug: 'client-asks-for-discount',
  seoTitle: 'How to Respond When a Client Asks for a Discount | Flowdockr',
  metaDescription:
    'Learn how to respond when a client asks for a discount and try Flowdockr guidance for this negotiation situation.',
  canonicalPath: '/scenario/client-asks-for-discount',
  h1: 'How to respond when a client asks for a discount',
  subtitle:
    'A negotiation moment where a small concession can quickly change your pricing position.',
  overview: [
    'A client asking for a discount is often testing flexibility, not rejecting the project outright.',
    'Giving a discount too quickly can weaken your price anchor and make future negotiation harder.',
    'The goal is to stay collaborative while making sure any concession is tied to scope, timing, or terms.',
  ],
  difficultyPoints: [
    'Discount requests often appear right before the client is ready to commit.',
    'A small concession can reset the value perception for the whole project.',
    'It is easy to sound rigid if you protect price without offering a path forward.',
  ],
  commonMistakes: [
    'Offering an unstructured discount immediately',
    'Explaining your rate defensively',
    'Negotiating against yourself before the client reacts',
    'Ignoring scope or term tradeoffs',
  ],
  mistakesClosingLine:
    'These moves make your pricing feel weaker instead of more credible.',
  toolPreset: {
    scenarioSlug: 'client-asks-discount',
    title: 'Try this scenario',
    description:
      'Paste the client message and review negotiation guidance before you reply.',
    ctaLabel: 'Generate negotiation guidance',
    inputPlaceholder:
      'This looks good overall. Is there any discount you can offer if we move ahead this week?',
  },
  relatedScenarios: [
    {
      slug: 'client-says-rate-too-high',
      title: 'How to respond when a client says your rate is too high',
    },
    {
      slug: 'client-asks-for-extra-revisions',
      title: 'How to respond when a client asks for extra revisions',
    },
    {
      slug: 'client-expands-project-scope',
      title: 'How to respond when a client expands the project scope',
    },
    {
      slug: 'client-delays-payment',
      title: 'How to respond when a client delays payment',
    },
  ],
  cta: {
    title: 'Try your own client message',
    description:
      'See how Flowdockr suggests responding to a live discount negotiation.',
    buttonLabel: 'Start with this scenario',
  },
};
