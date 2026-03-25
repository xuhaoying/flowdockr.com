import { getPricingBlueprintBySlug, getPricingScenarioBySlug } from '@/lib/pricing-cluster';
import { isDedicatedPricingGeneratorScenarioSlug } from '@/lib/pricing-generator-scenarios';
import type {
  PricingAnalyticsSourceSurface,
  PricingScenarioAttribution,
  PricingScenarioAttributionSeedInput,
  PricingScenarioAttributionSeed,
} from '@/types/pricing-analytics';
import { pricingAnalyticsSourceSurfaces } from '@/types/pricing-analytics';

type PricingAnalyticsPrimitive = string | boolean;

export function buildPricingScenarioAttribution(
  seed:
    | PricingScenarioAttributionSeed
    | PricingScenarioAttributionSeedInput
    | null
    | undefined
): PricingScenarioAttribution | null {
  if (!seed) {
    return null;
  }

  const scenario = getPricingScenarioBySlug(seed.pricingSlug);
  const blueprint = getPricingBlueprintBySlug(seed.pricingSlug);

  if (!scenario || !blueprint) {
    return null;
  }

  const isDedicatedGeneratorMapping = isDedicatedPricingGeneratorScenarioSlug(
    scenario.generatorScenarioSlug
  );

  return {
    ...seed,
    pricingFamily: scenario.schema.page.family,
    generatorScenarioSlug: scenario.generatorScenarioSlug,
    generatorMappingKind: isDedicatedGeneratorMapping
      ? 'dedicated'
      : 'reused',
    pageRole: blueprint.pageRole,
    canonicalRoute: blueprint.url,
    isDedicatedGeneratorMapping,
  };
}

export function buildPricingScenarioAnalyticsParams(
  attribution: PricingScenarioAttribution | null | undefined
): Record<string, PricingAnalyticsPrimitive> {
  if (!attribution) {
    return {};
  }

  return {
    pricing_slug: attribution.pricingSlug,
    pricing_family: attribution.pricingFamily,
    generator_scenario_slug: attribution.generatorScenarioSlug,
    generator_mapping_kind: attribution.generatorMappingKind,
    page_role: attribution.pageRole,
    locale: attribution.locale,
    canonical_route: attribution.canonicalRoute,
    source_surface: attribution.sourceSurface,
    dedicated_generator_mapping: attribution.isDedicatedGeneratorMapping,
    page_type: 'pricing',
  };
}

export function buildPricingAttributionMetadataRecord(
  attribution: PricingScenarioAttribution | null | undefined
): Record<string, string> {
  if (!attribution) {
    return {};
  }

  return {
    pricingSlug: attribution.pricingSlug,
    pricingFamily: attribution.pricingFamily,
    generatorScenarioSlug: attribution.generatorScenarioSlug,
    generatorMappingKind: attribution.generatorMappingKind,
    pageRole: attribution.pageRole,
    canonicalRoute: attribution.canonicalRoute,
    sourceSurface: attribution.sourceSurface,
    locale: attribution.locale,
    dedicatedGeneratorMapping: String(attribution.isDedicatedGeneratorMapping),
  };
}

export function getPricingScenarioSlugFromPath(path: string) {
  const trimmed = String(path || '').trim();
  if (!trimmed) {
    return '';
  }

  try {
    const pathname = trimmed.startsWith('http')
      ? new URL(trimmed).pathname
      : trimmed.split('?')[0]?.split('#')[0]?.trim() || '';
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 2) {
      const slug = segments[0] === 'pricing' ? segments[1] : '';
      return getPricingScenarioBySlug(slug)?.slug || '';
    }

    if (segments.length === 3) {
      const slug = segments[1] === 'pricing' ? segments[2] : '';
      return getPricingScenarioBySlug(slug)?.slug || '';
    }
  } catch {
    return '';
  }

  return '';
}

export function isPricingAnalyticsSourceSurface(
  value: string
): value is PricingAnalyticsSourceSurface {
  return pricingAnalyticsSourceSurfaces.includes(
    value as PricingAnalyticsSourceSurface
  );
}
