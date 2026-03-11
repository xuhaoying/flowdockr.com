import type { ScenarioPageData } from '@/types/scenario-page';

import {
  DEFAULT_SCENARIO_CTA,
  DEFAULT_TOOL_CTA,
  DEFAULT_TOOL_DESCRIPTION,
  DEFAULT_TOOL_TITLE,
  related,
} from './shared';

export const latePaymentScenarioPage: ScenarioPageData = {
  slug: 'late-payment',
  seoTitle:
    'How to Respond When a Client Delays Payment | Flowdockr',
  metaDescription:
    'Learn how freelancers follow up when a client delays payment and test the scenario in Flowdockr.',
  canonicalPath: '/scenario/late-payment',
  h1: 'How to respond when a client delays payment',
  subtitle:
    'A payment follow-up moment where tone matters, but clarity matters more.',
  overview: [
    'Delayed payment is one of the most stressful client situations because the work may already be done.',
    'Many freelancers hesitate to follow up clearly because they do not want to sound rude or desperate.',
    'A stronger response keeps the message professional while making the payment expectation explicit.',
  ],
  difficultyPoints: [
    'Payment conversations often feel more emotionally charged than scope conversations.',
    'Waiting too long can weaken urgency.',
    'Over-softening the follow-up can make it easier to ignore.',
  ],
  commonMistakes: [
    'Avoiding follow-up for too long',
    'Writing vague reminders',
    'Sounding apologetic about asking for payment',
    'Mixing frustration into the message',
  ],
  mistakesClosingLine:
    'These follow-ups make payment easier to postpone instead of easier to resolve.',
  toolPreset: {
    scenarioSlug: 'client-delays-payment',
    title: DEFAULT_TOOL_TITLE,
    description: DEFAULT_TOOL_DESCRIPTION,
    ctaLabel: DEFAULT_TOOL_CTA,
    inputPlaceholder:
      'Hi, just checking in on the invoice from last week. Please let me know when payment is scheduled.',
  },
  relatedScenarios: [
    related(
      'invoice-follow-up',
      "Client hasn't paid the invoice: how to follow up"
    ),
    related(
      'rate-too-high',
      'How to respond when a client says your rate is too high'
    ),
    related(
      'rush-delivery',
      'What to say when a client asks for rush delivery'
    ),
    related(
      'faster-turnaround',
      'When a client asks for faster turnaround'
    ),
  ],
  cta: DEFAULT_SCENARIO_CTA,
};
