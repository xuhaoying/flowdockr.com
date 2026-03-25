import type {
  PricingScenarioFamilyDefinition,
  PricingScenarioSchema,
  PricingScenarioSlug,
} from '@/types/pricing-cluster';

export const pricingScenarioFamilies: PricingScenarioFamilyDefinition[] = [
  {
    id: 'price-pushback',
    title: 'Price pushback',
    description:
      'Prospect says the quote feels high after proposal review but has not moved to explicit discount terms.',
  },
  {
    id: 'discount-pressure',
    title: 'Discount pressure',
    description:
      'Prospect explicitly asks for lower pricing, often near commitment milestones.',
  },
  {
    id: 'budget-mismatch',
    title: 'Budget mismatch',
    description:
      'Budget and quoted scope do not match and require restructuring rather than blind concessions.',
  },
  {
    id: 'competitor-comparison',
    title: 'Competitor comparison',
    description:
      'Buyer compares your offer with a cheaper alternative to test pricing elasticity.',
  },
  {
    id: 'scope-boundary',
    title: 'Scope boundary',
    description:
      'Client expands deliverables, revisions, or extras beyond what was agreed and needs a calm scope boundary.',
  },
  {
    id: 'free-work-boundary',
    title: 'Free work boundary',
    description:
      'Prospect requests unpaid sample or trial work before commitment.',
  },
  {
    id: 'availability-boundary',
    title: 'Availability boundary',
    description:
      'Client pushes after-hours access, instant replies, or last-minute urgency that needs clear availability limits.',
  },
  {
    id: 'project-decline',
    title: 'Project decline',
    description:
      'You need to say no to a client or project cleanly without damaging the relationship or your positioning.',
  },
];

const corePricingScenarioSchemas: Partial<
  Record<PricingScenarioSlug, PricingScenarioSchema>
> = {
  'price-pushback-after-proposal': {
    page: {
      cluster: 'pricing',
      family: 'price-pushback',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'after-proposal',
      pressureType: 'price-pushback',
      primaryIntent:
        'Handle quote-too-high objection after proposal without discounting too early.',
      primaryKeywords: ['quote too high'],
      supportKeywords: [
        'price too high',
        'rate too high',
        'too expensive proposal',
        'how to respond to a price objection',
        'proposal too expensive',
      ],
      bannedPrimaryTopics: [
        'cheaper competitor',
        'free trial work',
        'unlimited revisions',
        'late payment',
      ],
      doNotCompeteWith: [
        'discount-pressure-before-signing',
        'budget-lower-than-expected',
        'cheaper-competitor-comparison',
      ],
      scopeIn: [
        'Proposal already sent and prospect says the quote feels high.',
        'Need to keep leverage without sounding rigid.',
      ],
      scopeOut: [
        'Explicit competitor comparison pressure.',
        'Final-stage small discount request before signing.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'lose-deal'],
      decisionGoals: ['hold-price', 'test-budget', 'reduce-scope'],
      strategyPathIds: [
        'hold_value_without_conceding',
        'test_budget_is_real',
        'reframe_scope_not_rate',
      ],
    },
  },

  'discount-pressure-before-signing': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'before-signing',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Respond to explicit discount ask before signing while protecting close-stage leverage.',
      primaryKeywords: ['ask for discount before signing'],
      supportKeywords: [
        'discount before closing',
        'lower price before moving forward',
        'can you lower your rate before we start',
        'final discount request',
      ],
      bannedPrimaryTopics: [
        'quote too high',
        'another freelancer is cheaper',
        'low budget project',
      ],
      doNotCompeteWith: [
        'price-pushback-after-proposal',
        'small-discount-before-closing',
      ],
      scopeIn: [
        'Deal is close to signing but client asks for discount explicitly.',
        'Need to preserve margin while keeping momentum.',
      ],
      scopeOut: [
        'Generic price objection without direct discount ask.',
        'Competitor quote comparison as primary pressure.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'low-margin-trap'],
      decisionGoals: ['hold-price', 'move-to-close', 'reduce-scope'],
      strategyPathIds: [
        'hold_price_reaffirm_fit',
        'trade_dont_concede',
        'offer_smaller_version',
      ],
    },
  },

  'budget-lower-than-expected': {
    page: {
      cluster: 'pricing',
      family: 'budget-mismatch',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-negotiation',
      pressureType: 'budget-mismatch',
      primaryIntent:
        'Handle genuinely lower budget without lowering rate for unchanged scope.',
      primaryKeywords: ['budget lower than quote'],
      supportKeywords: [
        'lower budget than expected',
        'limited budget project',
        'small budget freelance project',
        'how to reduce scope instead of price',
      ],
      bannedPrimaryTopics: [
        'discount before signing',
        'cheaper competitor',
        'free sample',
      ],
      doNotCompeteWith: [
        'price-pushback-after-proposal',
        'can-you-do-it-cheaper',
      ],
      scopeIn: [
        'Budget is explicitly below proposal and may be a real constraint.',
        'Need to restructure scope while preserving pricing logic.',
      ],
      scopeOut: [
        'Pure tactical haggling with no budget evidence.',
        'Competitor comparison is the main pressure.',
      ],
    },
    content: {
      realRisks: ['low-margin-trap', 'open-scope-creep', 'lose-deal'],
      decisionGoals: ['test-budget', 'reduce-scope', 'move-to-close'],
      strategyPathIds: [
        'reduce_scope_keep_quality',
        'offer_tiered_options',
        'decline_respectfully',
      ],
    },
  },

  'cheaper-competitor-comparison': {
    page: {
      cluster: 'pricing',
      family: 'competitor-comparison',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-negotiation',
      pressureType: 'competitor-comparison',
      primaryIntent:
        'Handle cheaper competitor comparison without entering a price war.',
      primaryKeywords: ['another freelancer is cheaper'],
      supportKeywords: [
        'competitor quoted less',
        'someone else offered a lower price',
        'cheaper option comparison',
        'lower quote from another provider',
      ],
      bannedPrimaryTopics: ['too expensive', 'can you discount', 'low budget'],
      doNotCompeteWith: [
        'price-pushback-after-proposal',
        'budget-lower-than-expected',
      ],
      scopeIn: [
        'Buyer uses another quote as direct comparison pressure.',
        'Need to reframe around fit, scope, and outcomes.',
      ],
      scopeOut: [
        'Budget-only mismatch without competitor reference.',
        'Generic quote-too-high objection without external comparison.',
      ],
    },
    content: {
      realRisks: ['damage-positioning', 'low-margin-trap', 'lose-deal'],
      decisionGoals: ['hold-price', 'move-to-close', 'exit-politely'],
      strategyPathIds: [
        'reframe_outcomes',
        'clarify_scope_differences',
        'bless_and_release',
      ],
    },
  },

  'more-work-same-price': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier2',
      pageRole: 'bridge',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Defend scope boundary when client wants expanded deliverables under original budget.',
      primaryKeywords: ['more work same price'],
      supportKeywords: [
        'extra deliverables same budget',
        'more scope without more pay',
        'expanded scope same fee',
        'more revisions same price',
      ],
      bannedPrimaryTopics: [
        'low budget',
        'competitor cheaper',
        'proposal silence',
      ],
      doNotCompeteWith: [
        'budget-lower-than-expected',
        'price-pushback-after-proposal',
        'client-asking-for-extra-work',
        'client-requesting-additional-revisions',
      ],
      scopeIn: [
        'Client requests additional tasks/revisions under current quote.',
        'Need to avoid silent scope creep while preserving relationship.',
      ],
      scopeOut: [
        'Pure budget mismatch at proposal stage.',
        'Competitor price comparison pressure.',
      ],
    },
    content: {
      realRisks: ['open-scope-creep', 'low-margin-trap', 'damage-positioning'],
      decisionGoals: ['set-boundary', 'reduce-scope', 'move-to-close'],
      strategyPathIds: [
        'clarify_whats_included',
        'requote_expanded_scope',
        'offer_phased_delivery',
      ],
    },
  },

  'free-trial-work-request': {
    page: {
      cluster: 'pricing',
      family: 'free-work-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'before-signing',
      pressureType: 'free-work-boundary',
      primaryIntent:
        'Handle unpaid sample or trial requests while preserving professionalism and boundaries.',
      primaryKeywords: ['free trial work request'],
      supportKeywords: [
        'unpaid sample work',
        'unpaid test project',
        'spec work request',
        'can you do a sample first',
      ],
      bannedPrimaryTopics: [
        'low budget',
        'discount request',
        'price objection',
      ],
      doNotCompeteWith: [
        'budget-lower-than-expected',
        'price-pushback-after-proposal',
      ],
      scopeIn: [
        'Prospect asks for unpaid custom sample before commitment.',
        'Need to maintain boundary without hostile tone.',
      ],
      scopeOut: [
        'Direct discount request as primary pressure.',
        'Competitor price comparison as primary pressure.',
      ],
    },
    content: {
      realRisks: ['damage-positioning', 'low-margin-trap', 'open-scope-creep'],
      decisionGoals: ['set-boundary', 'move-to-close', 'exit-politely'],
      strategyPathIds: [
        'offer_portfolio_proof',
        'offer_paid_test',
        'decline_and_qualify',
      ],
    },
  },

  'can-you-do-it-cheaper': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier3',
      pageRole: 'entry',
      triggerStage: 'mid-negotiation',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Handle high-frequency “can you do it cheaper” language and route to the right pillar page.',
      primaryKeywords: ['can you do it cheaper'],
      supportKeywords: [
        'can you make it cheaper',
        'do you offer a lower price',
        'lower-cost option',
        'reduce price request',
      ],
      bannedPrimaryTopics: [
        'quote too high after proposal',
        'cheaper competitor comparison',
        'unpaid trial',
      ],
      doNotCompeteWith: [
        'price-pushback-after-proposal',
        'discount-pressure-before-signing',
        'budget-lower-than-expected',
      ],
      scopeIn: [
        'Short, direct cheaper request with ambiguous underlying pressure.',
        'Needs rapid triage to the right decision page.',
      ],
      scopeOut: [
        'Detailed post-proposal price objection analysis.',
        'Close-stage final discount negotiation.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning'],
      decisionGoals: ['test-budget', 'reduce-scope', 'hold-price'],
      strategyPathIds: [
        'clarify_real_constraint',
        'offer_smaller_version',
        'hold_position',
      ],
    },
  },

  'small-discount-before-closing': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'closing-stage',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Handle final small discount ask before signature without weakening anchor for future work.',
      primaryKeywords: ['small discount before signing'],
      supportKeywords: [
        'final small discount request',
        'one last discount before close',
        'little discount to move forward',
        'can you do a little better',
      ],
      bannedPrimaryTopics: [
        'too expensive after proposal',
        'competitor comparison',
        'unpaid trial',
      ],
      doNotCompeteWith: [
        'discount-pressure-before-signing',
        'price-pushback-after-proposal',
      ],
      scopeIn: [
        'Deal is near signature and asks for one final small concession.',
        'Need close-ready language that stays warm without softening anchor.',
      ],
      scopeOut: [
        'Broad early-stage discount negotiation.',
        'General quote-too-high objection handling.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'low-margin-trap'],
      decisionGoals: ['move-to-close', 'hold-price', 'set-boundary'],
      strategyPathIds: [
        'hold_line_politely',
        'exchange_for_commitment',
        'repackage_not_discount',
      ],
    },
  },
};

const boundaryScopeControlSchemas: Partial<
  Record<PricingScenarioSlug, PricingScenarioSchema>
> = {
  'client-asking-for-extra-work': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Handle extra-work requests without silently expanding scope or eroding the original agreement.',
      primaryKeywords: ['how to respond to client asking for extra work'],
      supportKeywords: [
        'client asks for extra work what to say',
        'reply to extra work request',
        'client asking for additional work',
        'how to respond to extra work outside scope',
      ],
      bannedPrimaryTopics: [
        'discount before signing',
        'outside work hours',
        'rejecting project',
      ],
      doNotCompeteWith: [
        'more-work-same-price',
        'say-no-to-scope-creep-politely',
        'more-work-than-agreed',
      ],
      scopeIn: [
        'Client asks for added work after scope is already defined.',
        'Need language that protects boundaries without sounding irritated.',
      ],
      scopeOut: [
        'Pure pricing negotiation before scope is agreed.',
        'Unlimited-revision policy discussion without an active extra request.',
      ],
    },
    content: {
      realRisks: ['open-scope-creep', 'low-margin-trap', 'boundary-erosion'],
      decisionGoals: ['set-boundary', 'reduce-scope', 'move-to-close'],
      strategyPathIds: [
        'name_added_scope',
        'quote_the_addition',
        'phase_it_cleanly',
      ],
    },
  },

  'say-no-to-scope-creep-politely': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Say no to scope creep politely while keeping the client relationship workable.',
      primaryKeywords: ['how to say no to scope creep politely'],
      supportKeywords: [
        'polite scope creep response',
        'how to push back on scope creep',
        'scope creep boundary reply',
        'say no to extra requests politely',
      ],
      bannedPrimaryTopics: [
        'low budget client',
        'after-hours client messages',
        'declining a project',
      ],
      doNotCompeteWith: [
        'client-asking-for-extra-work',
        'refuse-extra-work-without-losing-client',
        'more-work-same-price',
      ],
      scopeIn: [
        'You want polite, firm language for repeated extra asks.',
        'Relationship matters, but the boundary must stay visible.',
      ],
      scopeOut: [
        'Pure revision-policy setup before the project starts.',
        'General price pushback with no scope change.',
      ],
    },
    content: {
      realRisks: ['boundary-erosion', 'open-scope-creep', 'lose-deal'],
      decisionGoals: ['set-boundary', 'move-to-close', 'reduce-scope'],
      strategyPathIds: [
        'acknowledge_then_boundary',
        'reset_scope_neutrally',
        'offer_options_not_apologies',
      ],
    },
  },

  'more-work-than-agreed': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier3',
      pageRole: 'entry',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Handle direct “more work than agreed” wording and route it into a clean scope-boundary response.',
      primaryKeywords: ['client asking for more work than agreed what to say'],
      supportKeywords: [
        'more work than agreed reply',
        'client wants more than contract says',
        'what to say when client adds more work',
        'extra deliverables not agreed',
      ],
      bannedPrimaryTopics: [
        'discount pressure',
        'urgent client response',
        'declining a client',
      ],
      doNotCompeteWith: [
        'client-asking-for-extra-work',
        'more-work-same-price',
        'say-no-to-scope-creep-politely',
      ],
      scopeIn: [
        'Searcher is using direct wording about work exceeding the agreement.',
        'Need a high-clarity landing page that names the mismatch quickly.',
      ],
      scopeOut: [
        'Revision-specific scope pressure.',
        'Budget-only mismatch before work starts.',
      ],
    },
    content: {
      realRisks: ['open-scope-creep', 'low-margin-trap', 'boundary-erosion'],
      decisionGoals: ['set-boundary', 'reduce-scope', 'move-to-close'],
      strategyPathIds: [
        'point_back_to_agreement',
        'separate_new_request',
        'route_to_change_order',
      ],
    },
  },

  'client-requesting-additional-revisions': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Handle additional revision requests without implying unlimited revisions are included.',
      primaryKeywords: ['how to handle client requesting additional revisions'],
      supportKeywords: [
        'client asking for more revisions',
        'additional revisions what to say',
        'how to respond to extra revision rounds',
        'revision request outside scope',
      ],
      bannedPrimaryTopics: [
        'discount before signing',
        'low budget client',
        'outside work hours',
      ],
      doNotCompeteWith: [
        'more-work-same-price',
        'client-asking-for-extra-work',
      ],
      scopeIn: [
        'Client wants more revision rounds than expected or agreed.',
        'Need to protect timeline and approval discipline.',
      ],
      scopeOut: [
        'Pure feature expansion with no revision pressure.',
        'Contract-stage unlimited-revision policy setup as the main issue.',
      ],
    },
    content: {
      realRisks: ['open-scope-creep', 'boundary-erosion', 'low-margin-trap'],
      decisionGoals: ['set-boundary', 'reduce-scope', 'move-to-close'],
      strategyPathIds: [
        'clarify_revision_limit',
        'offer_paid_extra_round',
        'reset_decision_deadline',
      ],
    },
  },

  'refuse-extra-work-without-losing-client': {
    page: {
      cluster: 'pricing',
      family: 'scope-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'scope-boundary',
      primaryIntent:
        'Refuse extra work without sounding cold or creating avoidable relationship damage.',
      primaryKeywords: ['how to refuse extra work without losing client'],
      supportKeywords: [
        'refuse extra work politely',
        'say no to extra work without losing client',
        'decline extra request professionally',
        'how to reject scope increase nicely',
      ],
      bannedPrimaryTopics: [
        'underpaid project decline',
        'urgent request',
        'discount request',
      ],
      doNotCompeteWith: [
        'say-no-to-scope-creep-politely',
        'client-asking-for-extra-work',
      ],
      scopeIn: [
        'Concern is tone and relationship safety, not only scope mechanics.',
        'Need reply language that stays warm while holding the line.',
      ],
      scopeOut: [
        'Generic revision-policy setup.',
        'Saying no to the entire project or client.',
      ],
    },
    content: {
      realRisks: ['lose-deal', 'boundary-erosion', 'open-scope-creep'],
      decisionGoals: ['set-boundary', 'move-to-close', 'exit-politely'],
      strategyPathIds: [
        'lead_with_yes_to_goal',
        'say_no_to_unpaid_scope',
        'offer_clean_alternative',
      ],
    },
  },

  'client-asking-for-discount': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-negotiation',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Handle a direct client discount ask without defaulting to a concession or generic negotiation advice.',
      primaryKeywords: ['how to respond to client asking for discount'],
      supportKeywords: [
        'client asks for discount what to say',
        'reply to discount request',
        'how to answer discount ask',
        'client wants lower price response',
      ],
      bannedPrimaryTopics: [
        'cheaper competitor',
        'outside work hours',
        'declining project',
      ],
      doNotCompeteWith: [
        'discount-pressure-before-signing',
        'can-you-do-it-cheaper',
        'client-negotiating-price',
      ],
      scopeIn: [
        'Broad direct discount ask without a narrow closing-stage frame.',
        'Need a real landing page for “asking for discount” intent.',
      ],
      scopeOut: [
        'Very late-stage small final discount request.',
        'True budget mismatch where scope redesign is the main move.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'low-margin-trap'],
      decisionGoals: ['hold-price', 'test-budget', 'reduce-scope'],
      strategyPathIds: [
        'hold_without_flinching',
        'ask_what_is_driving_it',
        'trade_scope_not_margin',
      ],
    },
  },

  'say-no-to-low-budget-client': {
    page: {
      cluster: 'pricing',
      family: 'budget-mismatch',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-negotiation',
      pressureType: 'budget-mismatch',
      primaryIntent:
        'Say no to a low-budget client politely when the gap is too wide to solve with a realistic scope change.',
      primaryKeywords: ['how to say no to low budget client'],
      supportKeywords: [
        'decline low budget client politely',
        'low budget client what to say',
        'how to reject low budget project',
        'client budget too low response',
      ],
      bannedPrimaryTopics: [
        'after-hours client',
        'scope creep',
        'cheaper competitor',
      ],
      doNotCompeteWith: [
        'budget-lower-than-expected',
        'decline-underpaid-project-politely',
        'client-asking-for-discount',
      ],
      scopeIn: [
        'Budget is not just slightly low. It is materially below viable range.',
        'Need a graceful decline or a clear no-with-logic.',
      ],
      scopeOut: [
        'Budget still workable with a leaner scope.',
        'Direct competitor comparison as primary pressure.',
      ],
    },
    content: {
      realRisks: ['low-margin-trap', 'bad-fit-lock-in', 'lose-deal'],
      decisionGoals: ['exit-politely', 'reduce-scope', 'test-budget'],
      strategyPathIds: [
        'test_if_budget_is_fixed',
        'decline_without_apology',
        'leave_door_open_selectively',
      ],
    },
  },

  'client-negotiating-price': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier3',
      pageRole: 'entry',
      triggerStage: 'mid-negotiation',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Handle broad “client negotiating price” intent and route it to the right discount or budget path.',
      primaryKeywords: ['client negotiating price what to say'],
      supportKeywords: [
        'client negotiating price reply',
        'how to answer price negotiation',
        'what to say when client negotiates price',
        'price negotiation response',
      ],
      bannedPrimaryTopics: [
        'after-hours boundary',
        'project decline',
        'free trial work',
      ],
      doNotCompeteWith: [
        'client-asking-for-discount',
        'can-you-do-it-cheaper',
        'price-pushback-after-proposal',
      ],
      scopeIn: [
        'Searcher uses broad negotiation wording without a tighter stage signal.',
        'Need diagnosis before choosing between hold, scope, or exit.',
      ],
      scopeOut: [
        'Quote-too-high objection after a sent proposal.',
        'Very specific low-budget rejection path.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'low-margin-trap'],
      decisionGoals: ['hold-price', 'test-budget', 'move-to-close'],
      strategyPathIds: [
        'classify_the_pressure',
        'hold_your_anchor',
        'switch_to_structured_options',
      ],
    },
  },

  'decline-underpaid-project-politely': {
    page: {
      cluster: 'pricing',
      family: 'budget-mismatch',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-negotiation',
      pressureType: 'budget-mismatch',
      primaryIntent:
        'Decline an underpaid project politely when accepting it would create weak delivery economics and resentment.',
      primaryKeywords: ['how to decline underpaid project politely'],
      supportKeywords: [
        'underpaid project what to say',
        'decline project for low pay',
        'how to reject underpaid freelance work',
        'low paying project politely decline',
      ],
      bannedPrimaryTopics: [
        'outside work hours',
        'extra revisions',
        'competitor comparison',
      ],
      doNotCompeteWith: [
        'say-no-to-low-budget-client',
        'budget-lower-than-expected',
      ],
      scopeIn: [
        'Main decision is whether to walk away from underpaid work cleanly.',
        'Need tone that stays professional without apologizing for standards.',
      ],
      scopeOut: [
        'Budget can still work with meaningful scope reduction.',
        'General late-stage discount request.',
      ],
    },
    content: {
      realRisks: ['low-margin-trap', 'bad-fit-lock-in', 'damage-positioning'],
      decisionGoals: ['exit-politely', 'set-boundary', 'test-budget'],
      strategyPathIds: [
        'state_fit_problem_clearly',
        'decline_without_resentment',
        'offer_referral_or_future_path',
      ],
    },
  },

  'stand-firm-on-pricing': {
    page: {
      cluster: 'pricing',
      family: 'discount-pressure',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-negotiation',
      pressureType: 'discount-pressure',
      primaryIntent:
        'Stand firm on pricing with language that sounds calm and deliberate rather than defensive or rigid.',
      primaryKeywords: ['how to stand firm on pricing freelance'],
      supportKeywords: [
        'stand firm on pricing what to say',
        'hold your rate freelance',
        'how to hold price with client',
        'how to stay firm on rate',
      ],
      bannedPrimaryTopics: [
        'rejecting project due workload',
        'outside hours boundary',
        'scope creep',
      ],
      doNotCompeteWith: [
        'client-negotiating-price',
        'discount-pressure-before-signing',
        'price-pushback-after-proposal',
      ],
      scopeIn: [
        'Need positioning language for holding price under pressure.',
        'Concern is how to sound firm without sounding combative.',
      ],
      scopeOut: [
        'Detailed budget mismatch restructuring.',
        'Competitor-comparison reframing as the main issue.',
      ],
    },
    content: {
      realRisks: ['lose-leverage', 'damage-positioning', 'low-margin-trap'],
      decisionGoals: ['hold-price', 'set-boundary', 'move-to-close'],
      strategyPathIds: [
        'state_price_with_confidence',
        'link_price_to_scope',
        'offer_smaller_yes_not_cheaper_yes',
      ],
    },
  },

  'client-messaging-outside-work-hours': {
    page: {
      cluster: 'pricing',
      family: 'availability-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'availability-boundary',
      primaryIntent:
        'Respond to after-hours client messages without training the relationship around 24/7 availability.',
      primaryKeywords: ['client messaging outside work hours what to say'],
      supportKeywords: [
        'client texting after hours what to say',
        'after hours client message response',
        'how to respond to client outside business hours',
        'client messages at night what to say',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'scope creep',
        'declining project',
      ],
      doNotCompeteWith: [
        'client-expects-immediate-response',
        'tell-client-you-are-unavailable',
      ],
      scopeIn: [
        'Client is contacting you outside normal working hours.',
        'Need a boundary that does not escalate or shame the client.',
      ],
      scopeOut: [
        'One-off urgent delivery request with deadline tradeoffs.',
        'General demanding-client relationship reset.',
      ],
    },
    content: {
      realRisks: ['boundary-erosion', 'burnout-risk', 'lose-deal'],
      decisionGoals: ['set-boundary', 'protect-capacity', 'move-to-close'],
      strategyPathIds: [
        'reply_next_business_window',
        'set_response_expectation',
        'separate_urgent_channel_from_normal',
      ],
    },
  },

  'set-boundaries-with-demanding-client': {
    page: {
      cluster: 'pricing',
      family: 'availability-boundary',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-project',
      pressureType: 'availability-boundary',
      primaryIntent:
        'Set boundaries with a demanding client in a way that protects your time, tone, and working structure.',
      primaryKeywords: ['how to set boundaries with demanding client'],
      supportKeywords: [
        'demanding client boundaries',
        'what to say to demanding client',
        'set boundaries with difficult client',
        'client expects too much what to say',
      ],
      bannedPrimaryTopics: [
        'discount negotiation',
        'underpaid project',
        'free trial work',
      ],
      doNotCompeteWith: [
        'client-messaging-outside-work-hours',
        'client-expects-immediate-response',
        'tell-client-you-are-unavailable',
      ],
      scopeIn: [
        'Relationship pressure is broader than one message or one deadline.',
        'Need a canonical boundary page for demanding-client intent.',
      ],
      scopeOut: [
        'Purely urgent delivery request with no ongoing pattern.',
        'Saying no to the entire project or client.',
      ],
    },
    content: {
      realRisks: ['boundary-erosion', 'burnout-risk', 'bad-fit-lock-in'],
      decisionGoals: ['set-boundary', 'protect-capacity', 'move-to-close'],
      strategyPathIds: [
        'name_the_working_model',
        'reset_response_rules',
        'create_consequences_without_threats',
      ],
    },
  },

  'tell-client-you-are-unavailable': {
    page: {
      cluster: 'pricing',
      family: 'availability-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'availability-boundary',
      primaryIntent:
        'Tell a client you are unavailable without sounding flaky, guilty, or over-explanatory.',
      primaryKeywords: ['how to tell client you are unavailable'],
      supportKeywords: [
        'tell client unavailable professionally',
        'what to say when you are unavailable to client',
        'client unavailable response',
        'how to say not available to client',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'scope creep',
        'decline whole project',
      ],
      doNotCompeteWith: [
        'client-messaging-outside-work-hours',
        'set-boundaries-with-demanding-client',
      ],
      scopeIn: [
        'Need language for temporary or time-bound unavailability.',
        'Goal is clarity and trust, not a long excuse.',
      ],
      scopeOut: [
        'Project-wide decline due to workload.',
        'After-hours boundary pattern as the main issue.',
      ],
    },
    content: {
      realRisks: ['boundary-erosion', 'burnout-risk', 'lose-deal'],
      decisionGoals: ['set-boundary', 'protect-capacity', 'move-to-close'],
      strategyPathIds: [
        'state_availability_cleanly',
        'give_next_response_window',
        'offer_alternate_path_if_needed',
      ],
    },
  },

  'urgent-request-last-minute': {
    page: {
      cluster: 'pricing',
      family: 'availability-boundary',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-project',
      pressureType: 'availability-boundary',
      primaryIntent:
        'Respond to a last-minute urgent request without auto-accepting rush conditions or free priority access.',
      primaryKeywords: ['how to respond to urgent request last minute'],
      supportKeywords: [
        'last minute urgent client request reply',
        'urgent request what to say client',
        'how to respond to last minute client request',
        'client urgent request response',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'outside-hours-only boundary',
        'declining client entirely',
      ],
      doNotCompeteWith: [
        'client-expects-immediate-response',
        'client-messaging-outside-work-hours',
        'more-work-same-price',
      ],
      scopeIn: [
        'Request is urgent and late, often with hidden timeline or scope tradeoffs.',
        'Need language that separates urgency from automatic obligation.',
      ],
      scopeOut: [
        'Longer-term demanding-client pattern with no one acute request.',
        'Simple availability notice without delivery pressure.',
      ],
    },
    content: {
      realRisks: ['burnout-risk', 'boundary-erosion', 'open-scope-creep'],
      decisionGoals: ['set-boundary', 'protect-capacity', 'move-to-close'],
      strategyPathIds: [
        'acknowledge_urgency_not_assumption',
        'offer_realistic_window',
        'trade_scope_speed_or_cost',
      ],
    },
  },

  'client-expects-immediate-response': {
    page: {
      cluster: 'pricing',
      family: 'availability-boundary',
      tier: 'tier3',
      pageRole: 'entry',
      triggerStage: 'mid-project',
      pressureType: 'availability-boundary',
      primaryIntent:
        'Handle direct “expects immediate response” intent and route it into a durable availability boundary.',
      primaryKeywords: ['client expects immediate response what to say'],
      supportKeywords: [
        'client expects instant reply',
        'client wants immediate response what to say',
        'how to handle client expecting immediate response',
        'client expects fast replies',
      ],
      bannedPrimaryTopics: [
        'low budget client',
        'scope creep',
        'declining project',
      ],
      doNotCompeteWith: [
        'client-messaging-outside-work-hours',
        'set-boundaries-with-demanding-client',
      ],
      scopeIn: [
        'Searcher describes the expectation problem directly.',
        'Need a landing page that clarifies reply-time boundaries fast.',
      ],
      scopeOut: [
        'One urgent last-minute ask with deadline tradeoffs.',
        'Whole-project decline or offboarding.',
      ],
    },
    content: {
      realRisks: ['boundary-erosion', 'burnout-risk', 'bad-fit-lock-in'],
      decisionGoals: ['set-boundary', 'protect-capacity', 'move-to-close'],
      strategyPathIds: [
        'set_reply_timeframe',
        'stop_rewarding_panic_loop',
        'offer_clear_escalation_rule',
      ],
    },
  },

  'say-no-to-client-professionally': {
    page: {
      cluster: 'pricing',
      family: 'project-decline',
      tier: 'tier1',
      pageRole: 'pillar',
      triggerStage: 'mid-negotiation',
      pressureType: 'project-decline',
      primaryIntent:
        'Say no to a client professionally when fit, budget, timing, or terms make the engagement a bad decision.',
      primaryKeywords: ['how to say no to a client professionally'],
      supportKeywords: [
        'say no to client politely',
        'professional way to say no to client',
        'how to turn down a client',
        'reject client professionally',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'scope creep',
        'after-hours messaging',
      ],
      doNotCompeteWith: [
        'decline-project-politely',
        'reject-client-without-burning-bridge',
        'turn-down-freelance-work-nicely',
      ],
      scopeIn: [
        'Need a broad canonical page for professionally saying no to clients.',
        'Focus is preserving tone and positioning while declining.',
      ],
      scopeOut: [
        'Project is still viable if only scope changes.',
        'Single after-hours or urgency boundary with no full decline.',
      ],
    },
    content: {
      realRisks: ['bad-fit-lock-in', 'damage-positioning', 'lose-deal'],
      decisionGoals: ['exit-politely', 'set-boundary', 'protect-capacity'],
      strategyPathIds: [
        'lead_with_fit_not_excuse',
        'decline_cleanly',
        'leave_bridge_if_valuable',
      ],
    },
  },

  'decline-project-politely': {
    page: {
      cluster: 'pricing',
      family: 'project-decline',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-negotiation',
      pressureType: 'project-decline',
      primaryIntent:
        'Decline a project politely with language that closes the door cleanly without creating unnecessary friction.',
      primaryKeywords: ['how to decline a project politely'],
      supportKeywords: [
        'decline project professionally',
        'what to say when declining a project',
        'politely decline freelance project',
        'how to turn down a project',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'outside work hours',
        'extra revisions',
      ],
      doNotCompeteWith: [
        'say-no-to-client-professionally',
        'turn-down-freelance-work-nicely',
      ],
      scopeIn: [
        'Main problem is declining the work, not renegotiating it.',
        'Need concise wording that sounds decisive but respectful.',
      ],
      scopeOut: [
        'Declining specifically because the project is underpaid.',
        'Temporary unavailability rather than a full no.',
      ],
    },
    content: {
      realRisks: ['bad-fit-lock-in', 'lose-deal', 'damage-positioning'],
      decisionGoals: ['exit-politely', 'protect-capacity', 'set-boundary'],
      strategyPathIds: [
        'decline_fast_and_clean',
        'thank_then_close',
        'avoid_over_explaining',
      ],
    },
  },

  'reject-client-without-burning-bridge': {
    page: {
      cluster: 'pricing',
      family: 'project-decline',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'mid-negotiation',
      pressureType: 'project-decline',
      primaryIntent:
        'Reject a client without burning the bridge when fit is wrong but future referrals or reputation still matter.',
      primaryKeywords: ['how to reject a client without burning bridge'],
      supportKeywords: [
        'reject client without burning bridge',
        'say no to client keep relationship',
        'turn down client nicely',
        'decline client without damaging relationship',
      ],
      bannedPrimaryTopics: [
        'extra work boundary',
        'after-hours messaging',
        'discount before signing',
      ],
      doNotCompeteWith: [
        'say-no-to-client-professionally',
        'decline-project-politely',
      ],
      scopeIn: [
        'Relationship-safe tone is the main concern.',
        'Need to keep the reply graceful without reopening negotiation.',
      ],
      scopeOut: [
        'Pure low-budget mismatch with scope alternatives still possible.',
        'Temporary scheduling conflict only.',
      ],
    },
    content: {
      realRisks: ['lose-deal', 'damage-positioning', 'bad-fit-lock-in'],
      decisionGoals: ['exit-politely', 'set-boundary', 'protect-capacity'],
      strategyPathIds: [
        'affirm_the_fit_gap',
        'decline_without_criticizing',
        'leave_positive_close',
      ],
    },
  },

  'turn-down-freelance-work-nicely': {
    page: {
      cluster: 'pricing',
      family: 'project-decline',
      tier: 'tier3',
      pageRole: 'entry',
      triggerStage: 'mid-negotiation',
      pressureType: 'project-decline',
      primaryIntent:
        'Handle broad “turn down freelance work nicely” intent with a clean, professional decline path.',
      primaryKeywords: ['how to turn down freelance work nicely'],
      supportKeywords: [
        'turn down freelance work politely',
        'how to say no to freelance work',
        'decline freelance project nicely',
        'turn down project nicely',
      ],
      bannedPrimaryTopics: [
        'low-budget-only decline',
        'outside work hours',
        'scope creep',
      ],
      doNotCompeteWith: [
        'say-no-to-client-professionally',
        'decline-project-politely',
      ],
      scopeIn: [
        'Searcher uses broad freelancer wording and wants a graceful no.',
        'Need an intent-matched page that routes into stronger decline strategies.',
      ],
      scopeOut: [
        'Project is acceptable but just needs boundary resets.',
        'Dedicated workload or underpayment decline reasons.',
      ],
    },
    content: {
      realRisks: ['bad-fit-lock-in', 'damage-positioning', 'lose-deal'],
      decisionGoals: ['exit-politely', 'protect-capacity', 'set-boundary'],
      strategyPathIds: [
        'short_gracious_decline',
        'explain_only_if_helpful',
        'leave_future_option_selectively',
      ],
    },
  },

  'refuse-project-due-to-workload': {
    page: {
      cluster: 'pricing',
      family: 'project-decline',
      tier: 'tier2',
      pageRole: 'support',
      triggerStage: 'before-signing',
      pressureType: 'project-decline',
      primaryIntent:
        'Refuse a project due to workload in a way that protects your capacity without sounding chaotic or unreliable.',
      primaryKeywords: ['how to refuse a project due to workload'],
      supportKeywords: [
        'decline project due to workload',
        'too busy to take project what to say',
        'how to say no to project because of workload',
        'turn down project due to capacity',
      ],
      bannedPrimaryTopics: [
        'discount request',
        'outside work hours',
        'revision rounds',
      ],
      doNotCompeteWith: [
        'decline-project-politely',
        'turn-down-freelance-work-nicely',
        'tell-client-you-are-unavailable',
      ],
      scopeIn: [
        'Need a specific workload/capacity-based decline.',
        'Goal is to sound responsible rather than overwhelmed.',
      ],
      scopeOut: [
        'Temporary unavailability with continued project fit.',
        'General no-thanks intent with no capacity reason.',
      ],
    },
    content: {
      realRisks: ['burnout-risk', 'bad-fit-lock-in', 'damage-positioning'],
      decisionGoals: ['protect-capacity', 'exit-politely', 'set-boundary'],
      strategyPathIds: [
        'name_capacity_constraint',
        'decline_before_overpromising',
        'offer_future_reconnect_if_true',
      ],
    },
  },
};

export const pricingScenarioSchemas: Record<
  PricingScenarioSlug,
  PricingScenarioSchema
> = {
  ...corePricingScenarioSchemas,
  ...boundaryScopeControlSchemas,
} as Record<PricingScenarioSlug, PricingScenarioSchema>;
