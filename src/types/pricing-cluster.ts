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

export type PricingScenario = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  shortDescription: string;
  situationSnapshot: string[];
  realGoals: string[];
  responsePaths: PricingResponsePath[];
  copyReadyExamples: PricingCopyExample[];
  faq: PricingFaqItem[];
  nextDecisionSlugs: string[];
  generatorScenarioSlug: ScenarioSlug;
};
