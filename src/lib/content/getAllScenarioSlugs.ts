import { pricingScenarioPages } from '@/lib/content/pricingScenarios';

export function getAllScenarioSlugs(): string[] {
  return pricingScenarioPages.map((item) => item.slug);
}
