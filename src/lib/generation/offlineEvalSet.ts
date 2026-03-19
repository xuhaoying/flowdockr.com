import type { GenerateReplyRequest } from '@/types/generation';

type ServiceType = NonNullable<GenerateReplyRequest['serviceType']>;

export type OfflineEvalCase = {
  id: string;
  category:
    | 'lowball_offer'
    | 'quote_too_high'
    | 'delayed_decision'
    | 'ghosting_after_rate'
    | 'payment_follow_up'
    | 'scope_creep'
    | 'revision_loop'
    | 'urgency_without_commitment'
    | 'discount_pressure'
    | 'ambiguous_budget_pushback';
  scenarioSlug: string;
  serviceType: ServiceType;
  clientMessage: string;
  expectedSignals: string[];
};

export const offlineEvalSet: OfflineEvalCase[] = [
  {
    id: 'eval-lowball-01',
    category: 'lowball_offer',
    scenarioSlug: 'cheaper-freelancer',
    serviceType: 'developer',
    clientMessage:
      'Another developer offered to build this for half your quote. Can you match that?',
    expectedSignals: [
      'no price race',
      'reframe comparison',
      'scope-based alternative',
    ],
  },
  {
    id: 'eval-lowball-02',
    category: 'lowball_offer',
    scenarioSlug: 'cheaper-freelancer',
    serviceType: 'designer',
    clientMessage:
      'Someone else said they can do the same brand package for $400. Why are you higher?',
    expectedSignals: ['differentiate scope', 'protect rate', 'calm tone'],
  },
  {
    id: 'eval-lowball-03',
    category: 'lowball_offer',
    scenarioSlug: 'cheaper-freelancer',
    serviceType: 'copywriter',
    clientMessage:
      'A cheaper writer can turn this around tomorrow. Can you just lower your number to stay competitive?',
    expectedSignals: ['no instant match', 'highlight standard', 'next step'],
  },
  {
    id: 'eval-quote-high-01',
    category: 'quote_too_high',
    scenarioSlug: 'quote-too-high',
    serviceType: 'marketer',
    clientMessage:
      'Your proposal looks solid, but the quote is too high for us.',
    expectedSignals: ['value anchor', 'non-defensive', 'scope option'],
  },
  {
    id: 'eval-quote-high-02',
    category: 'quote_too_high',
    scenarioSlug: 'quote-too-high',
    serviceType: 'video_editor',
    clientMessage:
      'This is more expensive than we expected for a launch edit. Can you bring it down?',
    expectedSignals: [
      'protect base scope',
      'tradeoff framing',
      'practical tone',
    ],
  },
  {
    id: 'eval-quote-high-03',
    category: 'quote_too_high',
    scenarioSlug: 'quote-too-high',
    serviceType: 'consultant',
    clientMessage:
      'We like your approach, but the number feels too high for this stage.',
    expectedSignals: ['keep deal alive', 'anchor on outcomes', 'concrete path'],
  },
  {
    id: 'eval-delay-01',
    category: 'delayed_decision',
    scenarioSlug: 'reviewing-internally-no-response',
    serviceType: 'designer',
    clientMessage:
      'We are reviewing this internally and will get back to you soon.',
    expectedSignals: [
      'low-pressure follow-up',
      'easy response path',
      'no guilt tone',
    ],
  },
  {
    id: 'eval-delay-02',
    category: 'delayed_decision',
    scenarioSlug: 'reviewing-internally-no-response',
    serviceType: 'developer',
    clientMessage:
      'Still discussing this with the team. We will circle back when we can.',
    expectedSignals: ['momentum recovery', 'clarification offer', 'concise'],
  },
  {
    id: 'eval-delay-03',
    category: 'delayed_decision',
    scenarioSlug: 'reviewing-internally-no-response',
    serviceType: 'consultant',
    clientMessage:
      'Need a bit more time to review internally. Will let you know.',
    expectedSignals: ['decision-oriented', 'not needy', 'sendable'],
  },
  {
    id: 'eval-ghosted-01',
    category: 'ghosting_after_rate',
    scenarioSlug: 'ghosted-after-rate',
    serviceType: 'copywriter',
    clientMessage: 'Thanks, I will review your rate and get back to you.',
    expectedSignals: [
      'follow-up ready',
      'no pre-emptive discount',
      'clear option',
    ],
  },
  {
    id: 'eval-ghosted-02',
    category: 'ghosting_after_rate',
    scenarioSlug: 'ghosted-after-rate',
    serviceType: 'video_editor',
    clientMessage: 'Appreciate the quote. Let me think about it.',
    expectedSignals: [
      'low-pressure re-entry',
      'budget-aware',
      'natural wording',
    ],
  },
  {
    id: 'eval-ghosted-03',
    category: 'ghosting_after_rate',
    scenarioSlug: 'ghosted-after-rate',
    serviceType: 'marketer',
    clientMessage: 'I will take this back to the team and follow up.',
    expectedSignals: [
      'recover momentum',
      'structured next step',
      'no chasing vibe',
    ],
  },
  {
    id: 'eval-payment-01',
    category: 'payment_follow_up',
    scenarioSlug: 'unpaid-invoice-follow-up',
    serviceType: 'designer',
    clientMessage: "We haven't processed the invoice yet.",
    expectedSignals: [
      'invoice specificity',
      'direct ask',
      'professional firmness',
    ],
  },
  {
    id: 'eval-payment-02',
    category: 'payment_follow_up',
    scenarioSlug: 'unpaid-invoice-follow-up',
    serviceType: 'developer',
    clientMessage: 'Finance is still working through it. Sorry for the delay.',
    expectedSignals: ['payment date ask', 'polite but clear', 'no vagueness'],
  },
  {
    id: 'eval-payment-03',
    category: 'payment_follow_up',
    scenarioSlug: 'unpaid-invoice-follow-up',
    serviceType: 'consultant',
    clientMessage:
      'We know the invoice is overdue. We should have an update soon.',
    expectedSignals: ['timeline clarity', 'invoice-first framing', 'concise'],
  },
  {
    id: 'eval-scope-01',
    category: 'scope_creep',
    scenarioSlug: 'scope-creep-polite-response',
    serviceType: 'developer',
    clientMessage:
      'Can you also add these extra features? It should be a quick add-on.',
    expectedSignals: ['name scope change', 'offer options', 'no silent yes'],
  },
  {
    id: 'eval-scope-02',
    category: 'scope_creep',
    scenarioSlug: 'scope-creep-polite-response',
    serviceType: 'designer',
    clientMessage:
      'Could you include a few more social variants as part of the current package?',
    expectedSignals: [
      'polite boundary',
      'commercial clarity',
      'swap or extend',
    ],
  },
  {
    id: 'eval-scope-03',
    category: 'scope_creep',
    scenarioSlug: 'scope-creep-polite-response',
    serviceType: 'marketer',
    clientMessage:
      'Since we are already doing this campaign, can you also run email for us at no extra cost?',
    expectedSignals: ['scope impact', 'structured next step', 'non-defensive'],
  },
  {
    id: 'eval-revisions-01',
    category: 'revision_loop',
    scenarioSlug: 'unlimited-revisions',
    serviceType: 'video_editor',
    clientMessage:
      'We would want unlimited revisions included before we sign off.',
    expectedSignals: ['process framing', 'limit clarity', 'extra-round option'],
  },
  {
    id: 'eval-revisions-02',
    category: 'revision_loop',
    scenarioSlug: 'unlimited-revisions',
    serviceType: 'copywriter',
    clientMessage:
      'Can you make revisions unlimited so our team can keep polishing it?',
    expectedSignals: [
      'boundary without stiffness',
      'defined rounds',
      'client benefit',
    ],
  },
  {
    id: 'eval-revisions-03',
    category: 'revision_loop',
    scenarioSlug: 'unlimited-revisions',
    serviceType: 'designer',
    clientMessage:
      'We usually need a lot of tweaks. Can unlimited changes be part of the proposal?',
    expectedSignals: [
      'quality/process rationale',
      'paid add-on path',
      'calm tone',
    ],
  },
  {
    id: 'eval-urgency-01',
    category: 'urgency_without_commitment',
    scenarioSlug: 'start-before-payment',
    serviceType: 'developer',
    clientMessage:
      'Can you start now and we will handle the deposit later? We need to move fast.',
    expectedSignals: [
      'protect kickoff term',
      'acknowledge urgency',
      'payment step clarity',
    ],
  },
  {
    id: 'eval-urgency-02',
    category: 'urgency_without_commitment',
    scenarioSlug: 'start-before-payment',
    serviceType: 'consultant',
    clientMessage:
      'Can we jump into the work this week and settle the paperwork after?',
    expectedSignals: [
      'no start before commitment',
      'operational clarity',
      'non-accusatory',
    ],
  },
  {
    id: 'eval-urgency-03',
    category: 'urgency_without_commitment',
    scenarioSlug: 'start-before-payment',
    serviceType: 'video_editor',
    clientMessage:
      'We are on a tight deadline. Just begin and we will sort payment as soon as possible.',
    expectedSignals: [
      'boundary on start',
      'fast next step',
      'no over-explaining',
    ],
  },
  {
    id: 'eval-discount-01',
    category: 'discount_pressure',
    scenarioSlug: 'discount-request',
    serviceType: 'designer',
    clientMessage: 'If we sign this week, can you give us a discount?',
    expectedSignals: [
      'conditional tradeoff',
      'no instant cut',
      'commercial tone',
    ],
  },
  {
    id: 'eval-discount-02',
    category: 'discount_pressure',
    scenarioSlug: 'discount-request',
    serviceType: 'copywriter',
    clientMessage: 'Can you shave 20% off if we bring you more work later?',
    expectedSignals: [
      'future-work skepticism',
      'structured concession',
      'short reply',
    ],
  },
  {
    id: 'eval-discount-03',
    category: 'discount_pressure',
    scenarioSlug: 'discount-request',
    serviceType: 'marketer',
    clientMessage:
      'We want to move forward, but only if you can lower the fee first.',
    expectedSignals: [
      'protect base rate',
      'ask underlying constraint',
      'next-step clarity',
    ],
  },
  {
    id: 'eval-budget-01',
    category: 'ambiguous_budget_pushback',
    scenarioSlug: 'meet-their-budget',
    serviceType: 'developer',
    clientMessage:
      'Our budget is well below your quote. Can you make something work?',
    expectedSignals: [
      'scope planning not compression',
      'lean option',
      'concrete choice',
    ],
  },
  {
    id: 'eval-budget-02',
    category: 'ambiguous_budget_pushback',
    scenarioSlug: 'meet-their-budget',
    serviceType: 'designer',
    clientMessage:
      'This is our maximum budget. Is there a way to fit within it?',
    expectedSignals: [
      'budget-as-constraint',
      'do not promise same scope',
      'practical tone',
    ],
  },
  {
    id: 'eval-budget-03',
    category: 'ambiguous_budget_pushback',
    scenarioSlug: 'meet-their-budget',
    serviceType: 'consultant',
    clientMessage: 'We are interested, but this is all we can spend right now.',
    expectedSignals: [
      'phased option',
      'protect commercial logic',
      'clear next step',
    ],
  },
];

export const offlineEvalCoverageBreakdown = offlineEvalSet.reduce<
  Record<OfflineEvalCase['category'], number>
>(
  (acc, item) => {
    acc[item.category] += 1;
    return acc;
  },
  {
    lowball_offer: 0,
    quote_too_high: 0,
    delayed_decision: 0,
    ghosting_after_rate: 0,
    payment_follow_up: 0,
    scope_creep: 0,
    revision_loop: 0,
    urgency_without_commitment: 0,
    discount_pressure: 0,
    ambiguous_budget_pushback: 0,
  }
);
