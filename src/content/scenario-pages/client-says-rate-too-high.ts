import type { ScenarioPageData } from '@/types/scenario-page';

export const clientSaysRateTooHighScenarioPage: ScenarioPageData = {
  slug: 'client-says-rate-too-high',
  seoTitle: 'How to Respond When a Client Says Your Rate Is Too High | Flowdockr',
  metaDescription:
    "Learn how to respond when a client says your freelance rate is too high and try Flowdockr's negotiation guidance for this situation.",
  canonicalPath: '/scenario/client-says-rate-too-high',
  h1: 'How to respond when a client says your rate is too high',
  subtitle:
    'A common freelance negotiation moment where your response can affect both price and trust.',
  overview: [
    'A client saying your rate is too high is one of the most common freelance negotiation moments.',
    'Lowering your price too quickly can weaken your position, but pushing back too aggressively can damage the relationship.',
    'Many freelancers struggle to respond in a way that protects both their price and the client relationship.',
  ],
  difficultyPoints: [
    'Price pressure often appears late in the conversation.',
    'Your response can change how the client perceives your value.',
    'A rushed reply can make the negotiation harder instead of easier.',
  ],
  commonMistakes: [
    'Lowering the price immediately',
    'Over-explaining the quote',
    'Responding defensively',
    "Ignoring the client's concern",
  ],
  mistakesClosingLine:
    'These responses often make the conversation harder instead of easier.',
  toolPreset: {
    scenarioSlug: 'lowball-offer',
    title: 'Try this scenario',
    description:
      'Paste the message your client sent and see how Flowdockr suggests responding.',
    ctaLabel: 'Generate negotiation guidance',
    inputPlaceholder:
      'Thanks for the quote. We like the direction, but $1,200 is above budget. Can you do it for $800?',
  },
  relatedScenarios: [
    {
      slug: 'client-asks-for-discount',
      title: 'How to respond when a client asks for a discount',
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
      'See how Flowdockr suggests responding to a real negotiation situation.',
    buttonLabel: 'Start with this scenario',
  },
};
