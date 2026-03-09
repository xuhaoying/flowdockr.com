import { getPricingBlueprintBySlug } from '@/lib/pricing-cluster';
import type { ScenarioPageData } from '@/types/content';

export function getScenarioBySlug(slug: string): ScenarioPageData | null {
  const scenario = getPricingBlueprintBySlug(slug);
  return scenario ?? null;
}
