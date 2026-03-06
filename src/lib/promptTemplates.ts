export type ScenarioSlug =
  | 'client-price-too-high'
  | 'client-asking-discount'
  | 'client-comparing-freelancers'
  | 'client-asking-price-breakdown'
  | 'client-disappears-after-quote'
  | 'client-asks-free-test-work'
  | 'client-wants-extra-work'
  | 'client-delaying-payment'
  | 'client-asks-rush-delivery'
  | 'client-requests-many-revisions';

export type ScenarioDefinition = {
  slug: ScenarioSlug;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  shortExplanation: string;
  situationExample: string;
  whyClientsSayThis: string[];
  commonMistakes: string[];
  promptContext: string;
  related: ScenarioSlug[];
};

export const scenarioCatalog: ScenarioDefinition[] = [
  {
    slug: 'client-price-too-high',
    pageTitle: 'Client Says Your Price Is Too High: Professional Reply Generator',
    metaDescription:
      'Generate a calm, value-focused reply when a client says your freelance price is too high. Keep the conversation open without discounting immediately.',
    h1: 'Client says your price is too high: what to reply',
    shortExplanation:
      'This scenario helps freelancers respond to price pushback without sounding defensive or desperate.',
    situationExample:
      'Client: "Your quote is too high for us. We can find cheaper options."',
    whyClientsSayThis: [
      'They are testing how flexible your pricing is.',
      'They do not yet see the business value behind the quote.',
      'They are comparing only cost, not risk and delivery quality.',
    ],
    commonMistakes: [
      'Dropping price before reframing scope and outcomes.',
      'Over-explaining and sounding insecure about your rate.',
      'Turning the reply into a long defense instead of a clear next step.',
    ],
    promptContext:
      'Scenario: A client says the freelancer\'s price is too high. Goal: Generate a professional reply that maintains value, keeps the conversation open, and avoids sounding defensive.',
    related: [
      'client-asking-discount',
      'client-comparing-freelancers',
      'client-asking-price-breakdown',
    ],
  },
  {
    slug: 'client-asking-discount',
    pageTitle: 'Client Asking for a Discount: Freelance Negotiation Reply Generator',
    metaDescription:
      'Write a confident discount response that protects your pricing integrity and offers smart alternatives instead of immediate concessions.',
    h1: 'Client asks for a discount: what to say',
    shortExplanation:
      'Use this when a client directly requests a lower price and you need to protect your rate.',
    situationExample:
      'Client: "Can you give us a 20% discount so we can start this week?"',
    whyClientsSayThis: [
      'They assume every quote includes hidden margin.',
      'They want to see your flexibility before committing.',
      'They are balancing internal budget pressure with delivery urgency.',
    ],
    commonMistakes: [
      'Saying yes too quickly and weakening future negotiation power.',
      'Rejecting too hard and making collaboration feel adversarial.',
      'Offering vague discounts without changing deliverables.',
    ],
    promptContext:
      'Scenario: A client asks for a discount. Goal: Generate a reply that protects pricing integrity and offers alternative value options when useful.',
    related: [
      'client-price-too-high',
      'client-asking-price-breakdown',
      'client-asks-rush-delivery',
    ],
  },
  {
    slug: 'client-comparing-freelancers',
    pageTitle: 'Client Comparing Freelancers: How to Reply Without Racing to the Bottom',
    metaDescription:
      'Generate a professional response when a client compares your quote with cheaper freelancers. Re-anchor on outcomes, risk, and reliability.',
    h1: 'Client is comparing you with other freelancers',
    shortExplanation:
      'This scenario is for competitive negotiations where the client references cheaper alternatives.',
    situationExample:
      'Client: "Another freelancer quoted half your price. Why should we pay more?"',
    whyClientsSayThis: [
      'They want proof your offer is not a commodity.',
      'They are using comparison as leverage to lower price.',
      'They may have had poor experiences with low-cost delivery before.',
    ],
    commonMistakes: [
      'Attacking competitors instead of positioning your value clearly.',
      'Reducing your offer to match price without changing scope.',
      'Ignoring the client\'s real decision criteria and procurement process.',
    ],
    promptContext:
      'Scenario: A client compares your quote against lower-cost freelancers. Goal: Generate a confident reply that differentiates on outcomes and execution reliability.',
    related: [
      'client-price-too-high',
      'client-asking-price-breakdown',
      'client-asks-free-test-work',
    ],
  },
  {
    slug: 'client-asking-price-breakdown',
    pageTitle: 'Client Asking for Price Breakdown: Freelance Reply Generator',
    metaDescription:
      'Respond professionally when clients ask for a detailed price breakdown. Explain value clearly while avoiding over-commitment or self-undercutting.',
    h1: 'Client asks for a detailed price breakdown',
    shortExplanation:
      'Use this to explain pricing components while still protecting your negotiation position.',
    situationExample:
      'Client: "Can you break down exactly what each part of your quote covers?"',
    whyClientsSayThis: [
      'They need internal approval and procurement documentation.',
      'They want transparency to assess perceived risk.',
      'They are trying to identify items to cut for budget reasons.',
    ],
    commonMistakes: [
      'Listing tasks without tying them to outcomes.',
      'Over-sharing internal process details that weaken your leverage.',
      'Providing itemized pricing that invites line-by-line discount pressure.',
    ],
    promptContext:
      'Scenario: A client requests a price breakdown. Goal: Generate a clear response that explains value, preserves pricing logic, and guides next negotiation steps.',
    related: [
      'client-asking-discount',
      'client-comparing-freelancers',
      'client-price-too-high',
    ],
  },
  {
    slug: 'client-disappears-after-quote',
    pageTitle: 'Client Disappears After Quote: Follow-up Message Generator',
    metaDescription:
      'Generate a professional follow-up message when a client goes silent after your proposal. Re-open the conversation without sounding pushy.',
    h1: 'Client disappears after you send the quote',
    shortExplanation:
      'This scenario helps you send strategic follow-ups that recover stalled deals.',
    situationExample:
      'You sent the proposal 5 days ago, and the client has not replied to any message.',
    whyClientsSayThis: [
      'They are busy and your quote is not currently top priority.',
      'They are evaluating multiple options in parallel.',
      'They have internal blockers and need a low-friction next step.',
    ],
    commonMistakes: [
      'Sending guilt-based follow-ups that hurt trust.',
      'Following up without giving a clear decision path.',
      'Waiting too long and letting momentum collapse.',
    ],
    promptContext:
      'Scenario: A client goes silent after receiving a quote. Goal: Generate a short follow-up message that is professional, low-pressure, and action-oriented.',
    related: [
      'client-delaying-payment',
      'client-price-too-high',
      'client-comparing-freelancers',
    ],
  },
  {
    slug: 'client-asks-free-test-work',
    pageTitle: 'Client Asks for Free Test Work: Freelance Negotiation Reply',
    metaDescription:
      'Write a firm but cooperative response when clients request unpaid trial work. Protect boundaries while offering safer alternatives.',
    h1: 'Client asks for free test work',
    shortExplanation:
      'Use this to keep boundaries clear when clients ask for unpaid trial deliverables.',
    situationExample:
      'Client: "Before we decide, can you do a quick sample for free?"',
    whyClientsSayThis: [
      'They want to reduce hiring risk before committing budget.',
      'They are used to vendors providing speculative work.',
      'They need evidence of quality and fit for internal stakeholders.',
    ],
    commonMistakes: [
      'Agreeing to unpaid production work without constraints.',
      'Rejecting harshly and ending the conversation abruptly.',
      'Offering unpaid tests that consume too much delivery time.',
    ],
    promptContext:
      'Scenario: A client requests free test work. Goal: Generate a respectful response that protects boundaries and proposes paid or limited alternatives.',
    related: [
      'client-comparing-freelancers',
      'client-wants-extra-work',
      'client-requests-many-revisions',
    ],
  },
  {
    slug: 'client-wants-extra-work',
    pageTitle: 'Client Wants Extra Work: Scope Expansion Reply Generator',
    metaDescription:
      'Respond to extra work requests without losing control of scope. Keep the relationship positive and define change terms clearly.',
    h1: 'Client wants extra work outside scope',
    shortExplanation:
      'This scenario helps you handle scope expansion requests while preserving delivery quality and margin.',
    situationExample:
      'Client: "Can you also add these extra tasks? It should be quick."',
    whyClientsSayThis: [
      'They underestimate effort for additional requests.',
      'They assume flexibility is included by default.',
      'They want maximum output from the current budget.',
    ],
    commonMistakes: [
      'Saying yes without documenting scope and timeline impact.',
      'Reacting defensively instead of proposing clear options.',
      'Failing to separate goodwill support from billable expansion.',
    ],
    promptContext:
      'Scenario: A client asks for extra work beyond agreed scope. Goal: Generate a reply that keeps collaboration positive and defines scope-change terms.',
    related: [
      'client-requests-many-revisions',
      'client-asks-rush-delivery',
      'client-asks-free-test-work',
    ],
  },
  {
    slug: 'client-delaying-payment',
    pageTitle: 'Client Delaying Payment: Professional Reminder Message Generator',
    metaDescription:
      'Generate a firm and professional payment reminder for overdue invoices. Maintain relationship quality while protecting cash flow.',
    h1: 'Client is delaying payment',
    shortExplanation:
      'Use this scenario to send payment reminders that are clear, polite, and enforceable.',
    situationExample:
      'Invoice is overdue and the client keeps saying, "Finance is processing it."',
    whyClientsSayThis: [
      'Their internal payment process is slow or disorganized.',
      'The project did not have a strict payment timeline from the start.',
      'They are testing how strict you are on payment boundaries.',
    ],
    commonMistakes: [
      'Being too vague about due dates and consequences.',
      'Sending emotional messages instead of actionable reminders.',
      'Continuing new work before overdue invoices are resolved.',
    ],
    promptContext:
      'Scenario: A client delays payment after delivery. Goal: Generate a concise reminder that is professional, specific about timeline, and relationship-safe.',
    related: [
      'client-disappears-after-quote',
      'client-wants-extra-work',
      'client-requests-many-revisions',
    ],
  },
  {
    slug: 'client-asks-rush-delivery',
    pageTitle: 'Client Asks for Rush Delivery: Freelance Response Generator',
    metaDescription:
      'Reply professionally when clients request accelerated timelines. Protect quality and pricing while offering feasible rush options.',
    h1: 'Client asks for rush delivery',
    shortExplanation:
      'This scenario helps you negotiate urgency requests without sacrificing quality or capacity planning.',
    situationExample:
      'Client: "Can you deliver this in half the time? We need it urgently."',
    whyClientsSayThis: [
      'They face internal deadlines and launch pressure.',
      'They assume timelines are flexible if they ask strongly enough.',
      'They may not understand the quality risk of compression.',
    ],
    commonMistakes: [
      'Agreeing to impossible timelines that hurt delivery quality.',
      'Refusing without offering feasible alternatives.',
      'Skipping rush terms for pricing, scope, and response windows.',
    ],
    promptContext:
      'Scenario: A client requests rush delivery. Goal: Generate a clear response that sets feasibility boundaries, protects quality, and proposes viable options.',
    related: [
      'client-asking-discount',
      'client-wants-extra-work',
      'client-price-too-high',
    ],
  },
  {
    slug: 'client-requests-many-revisions',
    pageTitle: 'Client Requests Too Many Revisions: Negotiation Reply Generator',
    metaDescription:
      'Handle repeated revision requests with a professional response that protects scope and keeps client communication constructive.',
    h1: 'Client keeps requesting many revisions',
    shortExplanation:
      'Use this scenario when revision cycles expand beyond the agreed process.',
    situationExample:
      'Client: "One more round of revisions, and maybe a few extra tweaks too."',
    whyClientsSayThis: [
      'Quality criteria were not aligned early enough.',
      'Feedback stakeholders keep changing expectations.',
      'They assume revisions are unlimited unless boundaries are enforced.',
    ],
    commonMistakes: [
      'Accepting endless revisions without reset conditions.',
      'Using rigid language that escalates tension with the client.',
      'Failing to define revision scope, timeline impact, and add-on pricing.',
    ],
    promptContext:
      'Scenario: A client repeatedly asks for revisions beyond normal rounds. Goal: Generate a tactful response that protects scope and suggests a structured next step.',
    related: [
      'client-wants-extra-work',
      'client-asks-free-test-work',
      'client-delaying-payment',
    ],
  },
];

export const scenarioPrompts = scenarioCatalog.reduce<
  Record<ScenarioSlug, string>
>((acc, scenario) => {
  acc[scenario.slug] = scenario.promptContext;
  return acc;
}, {} as Record<ScenarioSlug, string>);

const scenarioMap = new Map<ScenarioSlug, ScenarioDefinition>(
  scenarioCatalog.map((scenario) => [scenario.slug, scenario])
);

export function isScenarioSlug(value: string): value is ScenarioSlug {
  return scenarioMap.has(value as ScenarioSlug);
}

export function getScenarioBySlug(slug: string): ScenarioDefinition | null {
  if (!isScenarioSlug(slug)) {
    return null;
  }

  return scenarioMap.get(slug) || null;
}

export function getRelatedScenarios(slug: ScenarioSlug): ScenarioDefinition[] {
  const current = scenarioMap.get(slug);
  if (!current) {
    return [];
  }

  return current.related
    .map((itemSlug) => scenarioMap.get(itemSlug))
    .filter((item): item is ScenarioDefinition => Boolean(item));
}

export const NEGOTIATION_SYSTEM_PROMPT = [
  'You are a professional freelance negotiation coach.',
  'You write one client-facing reply that can be sent immediately.',
  'Tone: calm, confident, non-defensive, non-manipulative.',
  'Do not ask for unnecessary details.',
  'Do not over-explain; keep it practical and concise.',
  'Always protect value and keep the conversation moving toward a next step.',
].join('\n');
