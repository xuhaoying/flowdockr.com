import type { ScenarioPageData } from '@/types/scenario-page';

export const clientAsksForExtraRevisionsScenarioPage: ScenarioPageData = {
  slug: 'client-asks-for-extra-revisions',
  seoTitle:
    'How to Respond When a Client Asks for Extra Revisions | Flowdockr',
  metaDescription:
    'Learn how to respond when a client asks for extra revisions and try Flowdockr guidance for this freelance negotiation situation.',
  canonicalPath: '/scenario/client-asks-for-extra-revisions',
  h1: 'How to respond when a client asks for extra revisions',
  subtitle:
    'A scope boundary moment where being helpful can quietly turn into unpaid work.',
  overview: [
    'Extra revision requests become difficult when the client pushes beyond the rounds you originally agreed on.',
    'Many freelancers want to stay accommodating, but repeated revisions can quietly erode margin and reset expectations.',
    'The challenge is setting a clear boundary without making the relationship feel colder than it needs to be.',
  ],
  difficultyPoints: [
    'Revision requests often sound small even when they expand the workload.',
    'A vague reply can create a new baseline for future rounds.',
    'Pushing back too sharply can make the client feel dismissed.',
  ],
  commonMistakes: [
    'Agreeing before checking the original scope',
    'Apologizing for the boundary',
    'Treating a repeated request as a one-off favor',
    'Leaving the next step unclear',
  ],
  mistakesClosingLine:
    'These replies make scope creep easier to repeat on the same project.',
  toolPreset: {
    scenarioSlug: 'small-extra-free',
    title: 'Try this scenario',
    description:
      'Paste the client request and review a calmer way to protect the boundary.',
    ctaLabel: 'Generate negotiation guidance',
    inputPlaceholder:
      'Could you make a few more revision rounds on this version? It should only take a little longer.',
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
      'Use Flowdockr to review the next reply before the scope expands further.',
    buttonLabel: 'Start with this scenario',
  },
};
