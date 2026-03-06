import { ScenarioContent } from '@/types/scenario';

export const asksSmallThingForFreeScenario: ScenarioContent = {
  slug: 'client-asks-for-one-small-thing-for-free',
  seoTitle: 'Client Asks for One Small Thing for Free: Best Response',
  seoDescription:
    'Write a professional reply when a client asks for a small extra task for free. Keep boundaries while preserving relationship.',
  h1: 'Client asks you to do one small thing for free',
  intro:
    'Small unpaid requests can seem minor, but repeated exceptions create hidden scope creep. A good response keeps trust and reinforces boundaries.',
  problemSummary:
    'Freelancers often agree to small free add-ons without limits. Better replies define whether it is goodwill or billable scope expansion.',
  bullets: [
    'Acknowledge request and keep tone positive',
    'Clarify whether it is one-time goodwill or add-on scope',
    'Set expectations for future requests',
  ],
  examples: [
    {
      title: 'One-time goodwill boundary',
      reply:
        'I can include this as a one-time courtesy so we keep momentum. For any additional add-ons after this, I will quote them separately to keep scope clear.',
    },
    {
      title: 'Billable add-on framing',
      reply:
        'Happy to help with that. Since it sits outside the current scope, I can add it as a small extra item and share the updated estimate.',
    },
    {
      title: 'Option-based response',
      reply:
        'We can do this in two ways: include it now as an add-on with a small fee, or swap it in by removing another lower-priority item from current scope.',
    },
  ],
  mistakes: [
    'Always saying yes to avoid friction',
    'Refusing abruptly without options',
    'Not documenting repeated free requests',
  ],
  faq: [
    {
      question: 'Should I ever do small extras for free?',
      answer:
        'Occasionally, yes, as a deliberate goodwill move. Keep it rare and explicit so it does not reset scope expectations.',
    },
    {
      question: 'How do I avoid future free requests?',
      answer:
        'State clearly that this is one-time or that future add-ons are quoted separately.',
    },
    {
      question: 'What if client says it will only take five minutes?',
      answer:
        'Acknowledge it, then focus on process consistency and scope clarity rather than arguing duration.',
    },
  ],
  relatedSlugs: [
    'client-wants-more-work-for-same-budget',
    'client-asks-for-free-sample-work',
    'client-asks-for-a-discount',
  ],
  promptContext: {
    scenarioType: 'small_free_request',
    negotiationGoal: 'protect_scope_boundary_without_tension',
    riskLevel: 'medium',
    defaultTone: 'diplomatic',
  },
};
