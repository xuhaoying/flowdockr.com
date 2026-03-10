import { pricingScenarioPages } from '@/lib/content/pricingScenarios';
import type { ScenarioPageData } from '@/types/content';

export function getScenarioBySlug(slug: string): ScenarioPageData | null {
  const scenario = pricingScenarioPages.find((item) => item.slug === slug);
  return scenario ?? null;
}

export function getAllScenarios(): ScenarioPageData[] {
  return pricingScenarioPages;
}

export function getFeaturedScenarios(): ScenarioPageData[] {
  return pricingScenarioPages.filter((item) => item.pageRole === 'pillar');
}

const generatorScenarioSlugByPricingSlug: Record<string, string> = {
  'price-pushback-after-proposal': 'lowball-offer',
  'discount-pressure-before-signing': 'client-asks-discount',
  'budget-lower-than-expected': 'budget-limited',
  'cheaper-competitor-comparison': 'cheaper-freelancer',
  'more-work-same-price': 'more-work-same-budget',
  'free-trial-work-request': 'free-sample-work',
  'can-you-do-it-cheaper': 'client-asks-discount',
  'small-discount-before-closing': 'client-asks-discount',
};

export function getDefaultGeneratorScenarioSlug(pricingSlug: string): string {
  return generatorScenarioSlugByPricingSlug[pricingSlug] || 'lowball-offer';
}
