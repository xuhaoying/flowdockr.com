export const scenarioArchetypeValues = [
  'pricing_objection',
  'price_comparison',
  'pricing_probe',
  'scope_control',
  'payment_protection',
  'expectation_management',
  'follow_up',
  'contract_terms',
] as const;

export const negotiationStageValues = [
  'early_inquiry',
  'quote_pushback',
  'active_negotiation',
  'post_quote',
  'contract_terms',
  'pre_kickoff',
  'in_project',
] as const;

export const scenarioSourceTypeValues = [
  'reddit',
  'forum',
  'synthesized',
  'community_discussion',
  'article',
] as const;

export const scenarioStatusValues = ['draft', 'ready', 'published'] as const;
export const scenarioPriorityValues = ['p0', 'p1', 'p2'] as const;

export type ScenarioArchetype = (typeof scenarioArchetypeValues)[number];
export type NegotiationStage = (typeof negotiationStageValues)[number];
export type ScenarioSourceType = (typeof scenarioSourceTypeValues)[number];
export type ScenarioStatus = (typeof scenarioStatusValues)[number];
export type ScenarioPriority = (typeof scenarioPriorityValues)[number];

export type CanonicalScenario = {
  id: string;
  title: string;
  slug: string;
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  archetype: ScenarioArchetype;
  negotiationStage: NegotiationStage;
  primaryClientMessage: string;
  clientMessageVariants: string[];
  userSituation: string;
  userGoal?: string;
  searchIntentPrimary: string;
  searchIntentSecondary?: string;
  strategyPrimary: string;
  strategySecondary?: string;
  toolPromptIntent: string;
  relatedScenarioSlugs?: string[];
  isPriority?: boolean;
  sourceType: ScenarioSourceType;
  sourceNote: string;
  status: ScenarioStatus;
  priority: ScenarioPriority;
  isSeed: boolean;
};

export type ScenarioRelatedLink = {
  slug: string;
  title: string;
  description: string;
};
