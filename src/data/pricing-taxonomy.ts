import type {
  PricingScenarioFamilyDefinition,
  PricingScenarioSchema,
  PricingScenarioSlug,
} from '@/types/pricing-cluster';

export const pricingScenarioFamilies: PricingScenarioFamilyDefinition[] = [
  {
    id: 'price-pushback',
    title: 'Price pushback',
    description: 'Prospect says the quote feels high after proposal review but has not moved to explicit discount terms.',
  },
  {
    id: 'discount-pressure',
    title: 'Discount pressure',
    description: 'Prospect explicitly asks for lower pricing, often near commitment milestones.',
  },
  {
    id: 'budget-mismatch',
    title: 'Budget mismatch',
    description: 'Budget and quoted scope do not match and require restructuring rather than blind concessions.',
  },
  {
    id: 'competitor-comparison',
    title: 'Competitor comparison',
    description: 'Buyer compares your offer with a cheaper alternative to test pricing elasticity.',
  },
  {
    id: 'more-work-same-price',
    title: 'More work, same price',
    description: 'Client expands deliverables while expecting the original budget to hold.',
  },
  {
    id: 'free-work-boundary',
    title: 'Free work boundary',
    description: 'Prospect requests unpaid sample or trial work before commitment.',
  },
];

export const pricingScenarioSchemas: Record<PricingScenarioSlug, PricingScenarioSchema> = {
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
      strategyPathIds: ['hold_value_without_conceding', 'test_budget_is_real', 'reframe_scope_not_rate'],
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
      bannedPrimaryTopics: ['quote too high', 'another freelancer is cheaper', 'low budget project'],
      doNotCompeteWith: ['price-pushback-after-proposal', 'small-discount-before-closing'],
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
      strategyPathIds: ['hold_price_reaffirm_fit', 'trade_dont_concede', 'offer_smaller_version'],
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
      bannedPrimaryTopics: ['discount before signing', 'cheaper competitor', 'free sample'],
      doNotCompeteWith: ['price-pushback-after-proposal', 'can-you-do-it-cheaper'],
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
      strategyPathIds: ['reduce_scope_keep_quality', 'offer_tiered_options', 'decline_respectfully'],
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
      doNotCompeteWith: ['price-pushback-after-proposal', 'budget-lower-than-expected'],
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
      strategyPathIds: ['reframe_outcomes', 'clarify_scope_differences', 'bless_and_release'],
    },
  },

  'more-work-same-price': {
    page: {
      cluster: 'pricing',
      family: 'more-work-same-price',
      tier: 'tier2',
      pageRole: 'bridge',
      triggerStage: 'mid-project',
      pressureType: 'more-work-same-price',
      primaryIntent:
        'Defend scope boundary when client wants expanded deliverables under original budget.',
      primaryKeywords: ['more work same price'],
      supportKeywords: [
        'extra deliverables same budget',
        'more scope without more pay',
        'expanded scope same fee',
        'more revisions same price',
      ],
      bannedPrimaryTopics: ['low budget', 'competitor cheaper', 'proposal silence'],
      doNotCompeteWith: ['budget-lower-than-expected', 'price-pushback-after-proposal'],
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
      strategyPathIds: ['clarify_whats_included', 'requote_expanded_scope', 'offer_phased_delivery'],
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
      bannedPrimaryTopics: ['low budget', 'discount request', 'price objection'],
      doNotCompeteWith: ['budget-lower-than-expected', 'price-pushback-after-proposal'],
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
      strategyPathIds: ['offer_portfolio_proof', 'offer_paid_test', 'decline_and_qualify'],
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
      strategyPathIds: ['clarify_real_constraint', 'offer_smaller_version', 'hold_position'],
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
      bannedPrimaryTopics: ['too expensive after proposal', 'competitor comparison', 'unpaid trial'],
      doNotCompeteWith: ['discount-pressure-before-signing', 'price-pushback-after-proposal'],
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
      strategyPathIds: ['hold_line_politely', 'exchange_for_commitment', 'repackage_not_discount'],
    },
  },
};
