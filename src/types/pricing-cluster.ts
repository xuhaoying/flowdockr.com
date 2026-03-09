import type { ScenarioSlug } from '@/data/scenarios';

export type PricingScenarioSlug =
  | 'price-pushback-after-proposal'
  | 'discount-pressure-before-signing'
  | 'budget-lower-than-expected'
  | 'cheaper-competitor-comparison'
  | 'more-work-same-price'
  | 'free-trial-work-request'
  | 'can-you-do-it-cheaper'
  | 'small-discount-before-closing';

export type PricingScenarioTier = 'tier1' | 'tier2' | 'tier3';

export type PricingPageRole = 'pillar' | 'support' | 'entry';

export type PricingTriggerStage =
  | 'after-proposal'
  | 'before-signing'
  | 'mid-negotiation'
  | 'mid-project'
  | 'closing-stage';

export type PricingPressureType =
  | 'price-pushback'
  | 'discount-pressure'
  | 'budget-mismatch'
  | 'competitor-comparison'
  | 'more-work-same-price'
  | 'free-work-boundary';

export type PricingRealRisk =
  | 'lose-leverage'
  | 'damage-positioning'
  | 'open-scope-creep'
  | 'low-margin-trap'
  | 'lose-deal'
  | 'payment-risk';

export type PricingDecisionGoal =
  | 'hold-price'
  | 'test-budget'
  | 'reduce-scope'
  | 'move-to-close'
  | 'set-boundary'
  | 'exit-politely';

export type PricingScenarioFamily =
  | 'price-pushback'
  | 'discount-pressure'
  | 'budget-mismatch'
  | 'competitor-comparison'
  | 'more-work-same-price'
  | 'free-work-boundary';

export type PricingScenarioSchema = {
  cluster: 'pricing';
  family: PricingScenarioFamily;
  tier: PricingScenarioTier;
  pageRole: PricingPageRole;
  triggerStage: PricingTriggerStage;
  pressureType: PricingPressureType;
  primaryIntent: string;
  primaryKeywords: string[];
  supportKeywords: string[];
  bannedPrimaryTopics: string[];
  doNotCompeteWith: PricingScenarioSlug[];
  realRisks: PricingRealRisk[];
  decisionGoals: PricingDecisionGoal[];
  strategyPathIds: string[];
};

export type PricingResponsePath = {
  id: 'A' | 'B' | 'C';
  title: string;
  whenToUse: string;
  risk: string;
  exampleWording: string;
};

export type PricingCopyExample = {
  tone: 'Concise' | 'Warm' | 'Firm';
  text: string;
};

export type PricingFaqItem = {
  q: string;
  a: string;
};

export type PricingGuideLink = {
  href: string;
  label: string;
};

export type PricingScenario = {
  tier: PricingScenarioTier;
  featured?: boolean;
  slug: PricingScenarioSlug;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywordVariants: string[];
  heroSubtitle: string;
  shortDescription: string;
  situationSnapshot: string[];
  whatsReallyHappening?: string[];
  realGoals: string[];
  responsePaths: PricingResponsePath[];
  copyReadyExamples: PricingCopyExample[];
  faq: PricingFaqItem[];
  nextDecisionSlugs: PricingScenarioSlug[];
  guideLinks?: PricingGuideLink[];
  generatorScenarioSlug: ScenarioSlug;
};

export type PricingScenarioWithSchema = PricingScenario & {
  schema: PricingScenarioSchema;
};

export type PricingScenarioFamilyDefinition = {
  id: PricingScenarioFamily;
  title: string;
  description: string;
};
