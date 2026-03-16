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
  'price-pushback-after-proposal': 'quote-too-high',
  'discount-pressure-before-signing': 'discount-request',
  'budget-lower-than-expected': 'budget-limited',
  'cheaper-competitor-comparison': 'cheaper-freelancer',
  'more-work-same-price': 'extra-work-outside-scope',
  'free-trial-work-request': 'extra-work-outside-scope',
  'can-you-do-it-cheaper': 'do-it-for-less',
  'small-discount-before-closing': 'discount-request',
};

export function getDefaultGeneratorScenarioSlug(pricingSlug: string): string {
  return generatorScenarioSlugByPricingSlug[pricingSlug] || 'quote-too-high';
}
