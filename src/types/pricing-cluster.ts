import type { ScenarioSlug } from '@/data/scenarios';
import type {
  ExampleReplies,
  FAQItem,
  NextDecisionLink,
  StrategyPath,
  ToolCTA,
} from '@/types/content';

export type PricingScenarioSlug =
  | 'price-pushback-after-proposal'
  | 'discount-pressure-before-signing'
  | 'budget-lower-than-expected'
  | 'cheaper-competitor-comparison'
  | 'more-work-same-price'
  | 'free-trial-work-request'
  | 'can-you-do-it-cheaper'
  | 'small-discount-before-closing'
  | 'client-asking-for-extra-work'
  | 'say-no-to-scope-creep-politely'
  | 'more-work-than-agreed'
  | 'client-requesting-additional-revisions'
  | 'refuse-extra-work-without-losing-client'
  | 'client-asking-for-discount'
  | 'say-no-to-low-budget-client'
  | 'client-negotiating-price'
  | 'decline-underpaid-project-politely'
  | 'stand-firm-on-pricing'
  | 'client-messaging-outside-work-hours'
  | 'set-boundaries-with-demanding-client'
  | 'tell-client-you-are-unavailable'
  | 'urgent-request-last-minute'
  | 'client-expects-immediate-response'
  | 'say-no-to-client-professionally'
  | 'decline-project-politely'
  | 'reject-client-without-burning-bridge'
  | 'turn-down-freelance-work-nicely'
  | 'refuse-project-due-to-workload';

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
  | 'scope-boundary'
  | 'free-work-boundary'
  | 'availability-boundary'
  | 'project-decline';

export type PricingRealRisk =
  | 'lose-leverage'
  | 'damage-positioning'
  | 'open-scope-creep'
  | 'low-margin-trap'
  | 'lose-deal'
  | 'payment-risk'
  | 'boundary-erosion'
  | 'burnout-risk'
  | 'bad-fit-lock-in';

export type PricingDecisionGoal =
  | 'hold-price'
  | 'test-budget'
  | 'reduce-scope'
  | 'move-to-close'
  | 'set-boundary'
  | 'exit-politely'
  | 'protect-capacity';

export type PricingScenarioFamily =
  | 'price-pushback'
  | 'discount-pressure'
  | 'budget-mismatch'
  | 'competitor-comparison'
  | 'scope-boundary'
  | 'free-work-boundary'
  | 'availability-boundary'
  | 'project-decline';

export type PricingIntentType =
  | 'price_objection'
  | 'discount_pressure'
  | 'budget_mismatch'
  | 'competitor_comparison'
  | 'scope_boundary'
  | 'free_work_boundary'
  | 'availability_boundary'
  | 'project_decline';

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
  commonClientMessages?: string[];
  commonMistakes?: string[];
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
  faq: FAQItem[];
  nextDecisionLinks: NextDecisionLink[];
  toolCta: ToolCTA;
  hubParent: '/pricing/';
  futureBridgeTo: string[];
  notes: string;
};

export type PricingScenarioFamilyDefinition = {
  id: PricingScenarioFamily;
  title: string;
  description: string;
};
