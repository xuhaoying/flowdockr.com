import { pricingScenarioBlueprints } from '@/lib/pricing-cluster';

export function getAllScenarioSlugs(): string[] {
  return pricingScenarioBlueprints.map((item) => item.slug);
}
