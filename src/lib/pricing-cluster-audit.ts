import sitemap from '@/app/sitemap';
import { getPricingHub } from '@/lib/content/getPricingHub';
import { pricingScenarioPages } from '@/lib/content/pricingScenarios';
import { dedicatedPricingGeneratorScenarioSlugs } from '@/lib/pricing-generator-scenarios';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';
import {
  getPricingScenariosByFamily,
  pricingFamilies,
  pricingScenarios,
} from '@/lib/pricing-cluster';

type GeneratorMappingKind = 'dedicated' | 'reused';
type GeneratorFit = 'strong' | 'reused' | 'weak';

export type PricingClusterAuditFlag =
  | 'weak-generator-fit'
  | 'missing-hub-exposure'
  | 'low-related-link-density'
  | 'keyword-overlap-risk';

export type PricingClusterAuditRow = {
  slug: string;
  title: string;
  seoTitle: string;
  family: string;
  primaryKeywords: string[];
  canonicalRoute: string;
  includedInScenarioDiscovery: boolean;
  includedInSitemap: boolean;
  surfacedOnHubFeatured: boolean;
  surfacedInHubLibrary: boolean;
  relatedSlugs: string[];
  relatedLinkCount: number;
  generatorScenarioSlug: string;
  generatorScenarioTitle: string | null;
  generatorMappingKind: GeneratorMappingKind;
  generatorFit: GeneratorFit;
  hasScenarioViewEvent: boolean;
  hasGeneratorClickAttribution: boolean;
  hasGenerationSuccessAttribution: boolean;
  hasHistoryAttribution: boolean;
  hasCheckoutAttribution: boolean;
  keywordOverlapWith: string[];
  flags: PricingClusterAuditFlag[];
};

export type PricingClusterAuditReport = {
  generatedAt: string;
  summary: {
    totalPages: number;
    dedicatedGeneratorMappings: number;
    reusedGeneratorMappings: number;
    weakGeneratorFitPages: number;
    missingHubExposurePages: number;
    keywordOverlapRiskPages: number;
    lowRelatedLinkDensityPages: number;
    scenarioViewInstrumentedPages: number;
    generatorClickAttributedPages: number;
    generationSuccessAttributedPages: number;
    historyAttributedPages: number;
    checkoutAttributedPages: number;
  };
  pages: PricingClusterAuditRow[];
};

const genericReusedGeneratorSlugs = new Set([
  'set-boundaries-politely',
  'discount-request',
  'quote-too-high',
  'budget-limited',
  'do-it-for-less',
]);
const instrumentationReadiness = {
  hasScenarioViewEvent: true,
  hasGeneratorClickAttribution: true,
  hasGenerationSuccessAttribution: true,
  hasHistoryAttribution: true,
  hasCheckoutAttribution: true,
} as const;

function normalizePath(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    try {
      return normalizePath(new URL(path).pathname);
    } catch {
      return path;
    }
  }

  if (!path.startsWith('/')) {
    return `/${path}`;
  }

  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export function buildPricingClusterAuditReport(): PricingClusterAuditReport {
  const hub = getPricingHub();
  const scenarioDiscoverySlugs = new Set(pricingScenarioPages.map((item) => item.slug));
  const sitemapUrls = new Set(
    sitemap().map((entry) => normalizePath(String(entry.url || '')))
  );
  const hubFeaturedPaths = new Set(
    hub.featuredScenarios.map((path) => normalizePath(path))
  );
  const hubLibrarySlugs = new Set(
    pricingFamilies.flatMap((family) =>
      getPricingScenariosByFamily(family.id).map((scenario) => scenario.slug)
    )
  );
  const dedicatedGeneratorSlugSet = new Set(dedicatedPricingGeneratorScenarioSlugs);
  const keywordOwners = buildKeywordOwnerMap();

  const pages = pricingScenarios.map((scenario) => {
    const page = pricingScenarioPages.find((item) => item.slug === scenario.slug);
    const generatorScenario = getGeneratorScenarioBySlug(
      scenario.generatorScenarioSlug
    );
    const generatorMappingKind: GeneratorMappingKind =
      dedicatedGeneratorSlugSet.has(scenario.generatorScenarioSlug)
        ? 'dedicated'
        : 'reused';
    const keywordOverlapWith = getKeywordOverlapWith({
      slug: scenario.slug,
      keywords: page?.primaryKeywords || [],
      keywordOwners,
    });
    const surfacedInHubLibrary = hubLibrarySlugs.has(scenario.slug);
    const surfacedOnHubFeatured = hubFeaturedPaths.has(
      normalizePath(`/pricing/${scenario.slug}/`)
    );
    const relatedSlugs = [...scenario.nextDecisionSlugs];
    const relatedLinkCount = relatedSlugs.length;
    const flags: PricingClusterAuditFlag[] = [];

    if (
      !generatorScenario ||
      (generatorMappingKind === 'reused' &&
        genericReusedGeneratorSlugs.has(scenario.generatorScenarioSlug))
    ) {
      flags.push('weak-generator-fit');
    }

    if (!surfacedInHubLibrary && !surfacedOnHubFeatured) {
      flags.push('missing-hub-exposure');
    }

    if (relatedLinkCount < 3) {
      flags.push('low-related-link-density');
    }

    if (keywordOverlapWith.length > 0) {
      flags.push('keyword-overlap-risk');
    }

    const generatorFit: GeneratorFit = !generatorScenario
      ? 'weak'
      : generatorMappingKind === 'dedicated'
        ? 'strong'
        : flags.includes('weak-generator-fit')
          ? 'weak'
          : 'reused';

    return {
      slug: scenario.slug,
      title: scenario.title,
      seoTitle: scenario.seoTitle,
      family: scenario.schema.page.family,
      primaryKeywords: page?.primaryKeywords || [scenario.primaryKeyword],
      canonicalRoute: page?.url || `/pricing/${scenario.slug}/`,
      includedInScenarioDiscovery: scenarioDiscoverySlugs.has(scenario.slug),
      includedInSitemap: sitemapUrls.has(normalizePath(`/pricing/${scenario.slug}/`)),
      surfacedOnHubFeatured,
      surfacedInHubLibrary,
      relatedSlugs,
      relatedLinkCount,
      generatorScenarioSlug: scenario.generatorScenarioSlug,
      generatorScenarioTitle: generatorScenario?.title || null,
      generatorMappingKind,
      generatorFit,
      hasScenarioViewEvent: instrumentationReadiness.hasScenarioViewEvent,
      hasGeneratorClickAttribution:
        instrumentationReadiness.hasGeneratorClickAttribution,
      hasGenerationSuccessAttribution:
        instrumentationReadiness.hasGenerationSuccessAttribution,
      hasHistoryAttribution: instrumentationReadiness.hasHistoryAttribution,
      hasCheckoutAttribution: instrumentationReadiness.hasCheckoutAttribution,
      keywordOverlapWith,
      flags,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: pages.length,
      dedicatedGeneratorMappings: pages.filter(
        (page) => page.generatorMappingKind === 'dedicated'
      ).length,
      reusedGeneratorMappings: pages.filter(
        (page) => page.generatorMappingKind === 'reused'
      ).length,
      weakGeneratorFitPages: pages.filter((page) =>
        page.flags.includes('weak-generator-fit')
      ).length,
      missingHubExposurePages: pages.filter((page) =>
        page.flags.includes('missing-hub-exposure')
      ).length,
      keywordOverlapRiskPages: pages.filter((page) =>
        page.flags.includes('keyword-overlap-risk')
      ).length,
      lowRelatedLinkDensityPages: pages.filter((page) =>
        page.flags.includes('low-related-link-density')
      ).length,
      scenarioViewInstrumentedPages: pages.filter(
        (page) => page.hasScenarioViewEvent
      ).length,
      generatorClickAttributedPages: pages.filter(
        (page) => page.hasGeneratorClickAttribution
      ).length,
      generationSuccessAttributedPages: pages.filter(
        (page) => page.hasGenerationSuccessAttribution
      ).length,
      historyAttributedPages: pages.filter((page) => page.hasHistoryAttribution)
        .length,
      checkoutAttributedPages: pages.filter(
        (page) => page.hasCheckoutAttribution
      ).length,
    },
    pages,
  };
}

function buildKeywordOwnerMap(): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();

  for (const scenario of pricingScenarioPages) {
    for (const keyword of scenario.primaryKeywords) {
      const normalized = keyword.trim().toLowerCase();
      if (!normalized) {
        continue;
      }

      const owners = map.get(normalized) || new Set<string>();
      owners.add(scenario.slug);
      map.set(normalized, owners);
    }
  }

  return map;
}

function getKeywordOverlapWith(params: {
  slug: string;
  keywords: string[];
  keywordOwners: Map<string, Set<string>>;
}): string[] {
  const overlaps = new Set<string>();

  for (const keyword of params.keywords) {
    const owners = params.keywordOwners.get(keyword.trim().toLowerCase());
    if (!owners) {
      continue;
    }

    for (const owner of owners) {
      if (owner !== params.slug) {
        overlaps.add(owner);
      }
    }
  }

  return [...overlaps].sort();
}
