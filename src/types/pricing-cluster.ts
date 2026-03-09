import type { ScenarioSlug } from '@/data/scenarios';
import type {
  ExampleReplies,
  ScenarioFaqItem as StructuredFaqItem,
  ScenarioNextDecisionLink,
  ScenarioToolCta,
  StrategyPath,
} from '@/types/content';

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

export type PricingPageRole = 'pillar' | 'support' | 'entry' | 'bridge';

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

export type PricingIntentType =
  | 'price_objection'
  | 'discount_pressure'
  | 'budget_mismatch'
  | 'competitor_comparison'
  | 'scope_for_price'
  | 'free_work_boundary';

export type PricingScenarioSchema = {
  page: {
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
    scopeIn: string[];
    scopeOut: string[];
  };
  content: {
    realRisks: PricingRealRisk[];
    decisionGoals: PricingDecisionGoal[];
    strategyPathIds: string[];
  };
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
  toolCta?: string;
};

export type PricingScenarioWithSchema = PricingScenario & {
  schema: PricingScenarioSchema;
};

export type PricingScenarioBlueprintTier = 1 | 2 | 3;

export type PricingScenarioBlueprintPath = {
  id: StrategyPath['id'];
  title: StrategyPath['title'];
  whenToUse: StrategyPath['whenToUse'];
  keyPoints: StrategyPath['keyPoints'];
};

export type PricingScenarioBlueprint = {
  slug: PricingScenarioSlug;
  cluster: 'pricing';
  tier: PricingScenarioBlueprintTier;
  pageRole: PricingPageRole;
  intentType: PricingIntentType;
  primaryIntent: string;
  primaryKeywords: string[];
  supportKeywords: string[];
  doNotCompeteWith: PricingScenarioSlug[];
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  situationSummary: string;
  coreFear: string[];
  strategyPaths: PricingScenarioBlueprintPath[];
  exampleReplies: ExampleReplies;
  faq: StructuredFaqItem[];
  nextDecisionLinks: ScenarioNextDecisionLink[];
  toolCta: ScenarioToolCta;
  hubParent: '/pricing/';
  futureBridgeTo: string[];
  notes: string;
};

export type PricingScenarioFamilyDefinition = {
  id: PricingScenarioFamily;
  title: string;
  description: string;
};
