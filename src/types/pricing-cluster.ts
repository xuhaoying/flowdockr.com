import type { ScenarioSlug } from '@/data/scenarios';

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
  tier: 'tier1' | 'tier2';
  featured?: boolean;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywordVariants: string[];
  heroSubtitle: string;
  shortDescription: string;
  situationSnapshot: string[];
  realGoals: string[];
  responsePaths: PricingResponsePath[];
  copyReadyExamples: PricingCopyExample[];
  faq: PricingFaqItem[];
  nextDecisionSlugs: string[];
  guideLinks?: PricingGuideLink[];
  generatorScenarioSlug: ScenarioSlug;
};
