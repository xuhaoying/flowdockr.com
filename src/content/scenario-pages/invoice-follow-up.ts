import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const invoiceFollowUpScenarioPage: ScenarioPageData = {
  slug: 'invoice-follow-up',
  seoTitle:
    "Client Hasn't Paid the Invoice: How to Follow Up | Flowdockr",
  metaDescription:
    'Learn how to follow up when a freelance invoice has not been paid.',
  canonicalPath: '/scenario/invoice-follow-up',
  h1: "Client hasn't paid the invoice: how to follow up",
  subtitle:
    'A payment reminder scenario where the goal is to stay professional while moving the process forward.',
  overview: [
    'An unpaid invoice follow-up often requires a more direct tone than freelancers first feel comfortable using.',
    'The challenge is to be clear without escalating too early.',
    'A good follow-up reminds the client of the agreement and gives them a simple next step.',
  ],
  difficultyPoints: [
    'Payment reminders can feel confrontational.',
    'Some clients ignore vague messages.',
    'Escalating too fast can create unnecessary tension.',
  ],
  commonMistakes: [
    'Writing unclear reminders',
    'Avoiding dates or invoice references',
    'Waiting for the client to raise the issue first',
    'Sending emotionally charged follow-ups',
  ],
  mistakesClosingLine:
    'These reminders reduce clarity right when the next step should be explicit.',
  toolPreset: {
    scenarioSlug: 'client-delays-payment',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Hi, I wanted to follow up on invoice #1042, which is now overdue. Can you confirm the payment timeline?',
  },
  relatedScenarios: [
    related('late-payment', 'How to respond when a client delays payment'),
    related(
      'rush-delivery',
      'What to say when a client asks for rush delivery'
    ),
    related(
      'faster-turnaround',
      'When a client asks for faster turnaround'
    ),
    related('discount-request', 'What to say when a client asks for a discount'),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
