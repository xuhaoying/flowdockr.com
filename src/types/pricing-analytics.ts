import type {
  PricingPageRole,
  PricingScenarioFamily,
  PricingScenarioSlug,
} from '@/types/pricing-cluster';
import type { ScenarioSlug } from '@/types/scenario';

export const pricingAnalyticsSourceSurfaces = [
  'pricing_page',
  'tool_page',
  'pricing_hub',
] as const;

export type PricingAnalyticsSourceSurface =
  (typeof pricingAnalyticsSourceSurfaces)[number];

export type PricingScenarioAttributionSeed = {
  pricingSlug: PricingScenarioSlug;
  sourceSurface: PricingAnalyticsSourceSurface;
  locale: string;
};

export type PricingScenarioAttributionSeedInput = {
  pricingSlug: string;
  sourceSurface: PricingAnalyticsSourceSurface;
  locale: string;
};

export type PricingScenarioAttribution = PricingScenarioAttributionSeedInput & {
  pricingFamily: PricingScenarioFamily;
  generatorScenarioSlug: ScenarioSlug;
  generatorMappingKind: 'dedicated' | 'reused';
  pageRole: PricingPageRole;
  canonicalRoute: string;
  isDedicatedGeneratorMapping: boolean;
};
