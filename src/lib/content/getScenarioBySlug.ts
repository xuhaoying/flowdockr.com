import { pricingScenarioPages } from '@/lib/content/pricingScenarios';
import { getPricingScenarioBySlug } from '@/lib/pricing-cluster';
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

export function getDefaultGeneratorScenarioSlug(pricingSlug: string): string {
  return (
    getPricingScenarioBySlug(pricingSlug)?.generatorScenarioSlug ||
    'quote-too-high'
  );
}
