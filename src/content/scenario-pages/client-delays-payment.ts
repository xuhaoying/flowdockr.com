import type { ScenarioPageData } from '@/types/scenario-page';

export const clientDelaysPaymentScenarioPage: ScenarioPageData = {
  slug: 'client-delays-payment',
  seoTitle: 'How to Respond When a Client Delays Payment | Flowdockr',
  metaDescription:
    'Learn how to respond when a client delays payment and try Flowdockr guidance for this client follow-up situation.',
  canonicalPath: '/scenario/client-delays-payment',
  h1: 'How to respond when a client delays payment',
  subtitle:
    'A follow-up situation where clarity matters for both cash flow and the client relationship.',
  overview: [
    'Payment delays create pressure on both the relationship and your cash flow.',
    'Following up too softly can drag the situation out, but escalating too fast can create unnecessary friction.',
    'A good response stays professional, clear about the obligation, and specific about the next step.',
  ],
  difficultyPoints: [
    'Late payment often mixes admin friction with trust concerns.',
    'You need to protect the relationship without sounding passive.',
    'An unclear follow-up can invite more delay instead of faster resolution.',
  ],
  commonMistakes: [
    'Sending vague reminders without naming the due date',
    'Sounding apologetic about asking for payment',
    'Letting frustration drive the tone',
    'Failing to state the next step clearly',
  ],
  mistakesClosingLine:
    'These follow-ups often prolong the delay instead of helping it close.',
  toolPreset: {
    scenarioSlug: 'client-delays-payment',
    title: 'Try this scenario',
    description:
      'Paste the payment delay message and review a clearer follow-up before you send it.',
    ctaLabel: 'Generate negotiation guidance',
    inputPlaceholder:
      'Following up on invoice #104. It was due last week. Can you confirm payment timing?',
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
      slug: 'client-expands-project-scope',
      title: 'How to respond when a client expands the project scope',
    },
  ],
  cta: {
    title: 'Try your own client message',
    description:
      'See how Flowdockr suggests responding to a delayed payment situation.',
    buttonLabel: 'Start with this scenario',
  },
};
