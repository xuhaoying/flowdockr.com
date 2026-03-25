import { gte } from 'drizzle-orm';

import { db, generation, purchase } from '@/lib/db';
import {
  getScenarioAnalyticsSlugCounts,
  type CanonicalScenarioAnalyticsEventName,
} from '@/lib/analytics/scenarioEventLog';
import { parseStoredGenerationPayload } from '@/lib/generation/storedGeneration';
import {
  buildPricingClusterAuditReport,
  type PricingClusterAuditFlag,
  type PricingClusterAuditReport,
  type PricingClusterAuditRow,
} from '@/lib/pricing-cluster-audit';
import { getPricingScenarioBySlug } from '@/lib/pricing-cluster';

export type PricingClusterPerformanceDiagnostic =
  | 'discoverability_problem'
  | 'cta_problem'
  | 'generation_problem'
  | 'monetization_problem'
  | 'needs_mapping_upgrade'
  | 'high_potential'
  | 'insufficient_data';

export type PricingClusterPerformanceThresholds = {
  insufficientDataViewThreshold: number;
  discoverabilityViewThreshold: number;
  ctaViewThreshold: number;
  lowGeneratorClickRateThreshold: number;
  generationClickThreshold: number;
  lowGenerationSuccessRateThreshold: number;
  monetizationGenerationThreshold: number;
  lowCheckoutIntentRateThreshold: number;
  purchaseClickThreshold: number;
  lowPurchaseRateThreshold: number;
  highPotentialViewThreshold: number;
  highPotentialClickRateThreshold: number;
  highPotentialGenerationSuccessRateThreshold: number;
  highPotentialCheckoutIntentRateThreshold: number;
  highPotentialPurchaseRateThreshold: number;
};

export type PricingClusterPerformanceAvailability = {
  analyticsEvents: boolean;
  generationHistory: boolean;
  purchases: boolean;
};

export type PricingClusterAnalyticsSignalRow = {
  pricingSlug: string;
  views: number;
  generateClicks: number;
  generateSuccesses: number;
};

export type PricingClusterGenerationSignalRow = {
  pricingSlug: string;
  historySaves: number;
};

export type PricingClusterPurchaseSignalRow = {
  pricingSlug: string;
  checkoutClicks: number;
  purchaseSuccesses: number;
};

export type PricingClusterOperatingRow = {
  slug: string;
  title: string;
  seoTitle: string;
  family: string;
  canonicalRoute: string;
  generatorScenarioSlug: string;
  generatorMappingKind: 'dedicated' | 'reused';
  generatorFit: 'strong' | 'reused' | 'weak';
  auditFlags: PricingClusterAuditFlag[];
  views: number | null;
  generateClicks: number | null;
  generateSuccesses: number | null;
  historySaves: number | null;
  checkoutClicks: number | null;
  purchaseSuccesses: number | null;
  generatorClickRate: number | null;
  generationSuccessRate: number | null;
  checkoutIntentRate: number | null;
  purchaseRate: number | null;
  diagnostics: PricingClusterPerformanceDiagnostic[];
};

export type PricingClusterPerformanceReport = {
  generatedAt: string;
  filters: {
    days: number;
    limit: number;
  };
  thresholds: PricingClusterPerformanceThresholds;
  dataAvailability: PricingClusterPerformanceAvailability;
  dataSources: {
    views: string;
    generateClicks: string;
    generateSuccesses: string;
    historySaves: string;
    checkoutClicks: string;
    purchaseSuccesses: string;
  };
  limitations: string[];
  summary: {
    totalPages: number;
    pagesWithTraffic: number;
    pagesWithGeneratorClicks: number;
    pagesWithCheckoutIntent: number;
    pagesWithPurchaseSignals: number;
    highPotentialPages: string[];
    needsMappingUpgradePages: string[];
    topFamiliesByViews: PricingClusterFamilyPerformanceSummary[];
    topFamiliesByCheckoutIntent: PricingClusterFamilyPerformanceSummary[];
  };
  prioritizedActions: PricingClusterPrioritizedAction[];
  pages: PricingClusterOperatingRow[];
};

export type PricingClusterFamilyPerformanceSummary = {
  family: string;
  pages: number;
  views: number | null;
  generateClicks: number | null;
  generateSuccesses: number | null;
  checkoutClicks: number | null;
  purchaseSuccesses: number | null;
};

export type PricingClusterPrioritizedAction = {
  action:
    | 'improve_cta'
    | 'improve_generator_mapping'
    | 'improve_monetization'
    | 'expand_family';
  reason: string;
  slugs: string[];
};

export const DEFAULT_PRICING_CLUSTER_PERFORMANCE_THRESHOLDS: PricingClusterPerformanceThresholds =
  {
    insufficientDataViewThreshold: 10,
    discoverabilityViewThreshold: 25,
    ctaViewThreshold: 40,
    lowGeneratorClickRateThreshold: 0.08,
    generationClickThreshold: 8,
    lowGenerationSuccessRateThreshold: 0.6,
    monetizationGenerationThreshold: 5,
    lowCheckoutIntentRateThreshold: 0.15,
    purchaseClickThreshold: 3,
    lowPurchaseRateThreshold: 0.35,
    highPotentialViewThreshold: 30,
    highPotentialClickRateThreshold: 0.14,
    highPotentialGenerationSuccessRateThreshold: 0.75,
    highPotentialCheckoutIntentRateThreshold: 0.2,
    highPotentialPurchaseRateThreshold: 0.4,
  };

const DEFAULT_DATA_SOURCES = {
  views:
    'scenario_analytics_event rows mirrored from page_view_pricing_scenario as fd_scenario_view with pageType=pricing',
  generateClicks:
    'scenario_analytics_event rows mirrored from click_generate_from_pricing_scenario as fd_tool_start with pageType=pricing',
  generateSuccesses:
    'scenario_analytics_event rows mirrored from generate_success_from_pricing_scenario as fd_generation_success with pageType=pricing',
  historySaves:
    'derived from generation rows with pricing attribution and history-enabled support levels (pro/studio)',
  checkoutClicks:
    'derived from persisted purchase rows with pricing attribution metadata; represents checkout session starts that reached the server',
  purchaseSuccesses:
    'derived from persisted purchase rows with pricing attribution metadata and paid status with credits granted',
} as const;

const HISTORY_ENABLED_SUPPORT_LEVELS = new Set(['pro', 'studio']);

export function buildPricingClusterPerformanceReport(params: {
  days?: number;
  limit?: number;
  generatedAt?: string;
  auditReport?: PricingClusterAuditReport;
  thresholds?: Partial<PricingClusterPerformanceThresholds>;
  analyticsSignals?: PricingClusterAnalyticsSignalRow[];
  generationSignals?: PricingClusterGenerationSignalRow[];
  purchaseSignals?: PricingClusterPurchaseSignalRow[];
  dataAvailability?: Partial<PricingClusterPerformanceAvailability>;
}): PricingClusterPerformanceReport {
  const auditReport = params.auditReport || buildPricingClusterAuditReport();
  const thresholds = {
    ...DEFAULT_PRICING_CLUSTER_PERFORMANCE_THRESHOLDS,
    ...(params.thresholds || {}),
  };
  const dataAvailability: PricingClusterPerformanceAvailability = {
    analyticsEvents: params.dataAvailability?.analyticsEvents ?? true,
    generationHistory: params.dataAvailability?.generationHistory ?? true,
    purchases: params.dataAvailability?.purchases ?? true,
  };

  const analyticsBySlug = new Map(
    (params.analyticsSignals || []).map((row) => [row.pricingSlug, row])
  );
  const historyBySlug = new Map(
    (params.generationSignals || []).map((row) => [row.pricingSlug, row])
  );
  const purchasesBySlug = new Map(
    (params.purchaseSignals || []).map((row) => [row.pricingSlug, row])
  );

  const pages = auditReport.pages
    .map((auditRow) =>
      buildOperatingRow({
        auditRow,
        thresholds,
        dataAvailability,
        analytics: analyticsBySlug.get(auditRow.slug),
        history: historyBySlug.get(auditRow.slug),
        purchase: purchasesBySlug.get(auditRow.slug),
      })
    )
    .sort((left, right) => {
      const leftViews = left.views ?? -1;
      const rightViews = right.views ?? -1;
      if (rightViews !== leftViews) {
        return rightViews - leftViews;
      }

      const leftCheckoutClicks = left.checkoutClicks ?? -1;
      const rightCheckoutClicks = right.checkoutClicks ?? -1;
      if (rightCheckoutClicks !== leftCheckoutClicks) {
        return rightCheckoutClicks - leftCheckoutClicks;
      }

      return left.slug.localeCompare(right.slug);
    });

  const summary = {
    totalPages: pages.length,
    pagesWithTraffic: pages.filter((page) => (page.views || 0) > 0).length,
    pagesWithGeneratorClicks: pages.filter(
      (page) => (page.generateClicks || 0) > 0
    ).length,
    pagesWithCheckoutIntent: pages.filter(
      (page) => (page.checkoutClicks || 0) > 0
    ).length,
    pagesWithPurchaseSignals: pages.filter(
      (page) => (page.purchaseSuccesses || 0) > 0
    ).length,
    highPotentialPages: pages
      .filter((page) => page.diagnostics.includes('high_potential'))
      .map((page) => page.slug),
    needsMappingUpgradePages: pages
      .filter((page) => page.diagnostics.includes('needs_mapping_upgrade'))
      .map((page) => page.slug),
    topFamiliesByViews: buildTopFamilySummaries({
      pages,
      metric: 'views',
      sourceAvailable: dataAvailability.analyticsEvents,
    }),
    topFamiliesByCheckoutIntent: buildTopFamilySummaries({
      pages,
      metric: 'checkoutClicks',
      sourceAvailable: dataAvailability.purchases,
    }),
  };

  return {
    generatedAt: params.generatedAt || new Date().toISOString(),
    filters: {
      days: Math.max(1, params.days || 30),
      limit: Math.max(1, params.limit || 500),
    },
    thresholds,
    dataAvailability,
    dataSources: {
      ...DEFAULT_DATA_SOURCES,
    },
    limitations: buildLimitations(dataAvailability),
    summary,
    prioritizedActions: buildPrioritizedActions(pages),
    pages,
  };
}

export async function getPricingClusterPerformanceReport(params?: {
  days?: number;
  limit?: number;
  thresholds?: Partial<PricingClusterPerformanceThresholds>;
}): Promise<PricingClusterPerformanceReport> {
  const days = Math.max(1, params?.days || 30);
  const limit = Math.max(1, params?.limit || 500);
  const createdAfter = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [analyticsSource, generationSource, purchaseSource] = await Promise.all([
    loadPricingAnalyticsSignals({ days, limit }),
    loadPricingGenerationSignals({ createdAfter }),
    loadPricingPurchaseSignals({ createdAfter }),
  ]);

  return buildPricingClusterPerformanceReport({
    days,
    limit,
    thresholds: params?.thresholds,
    analyticsSignals: analyticsSource.rows,
    generationSignals: generationSource.rows,
    purchaseSignals: purchaseSource.rows,
    dataAvailability: {
      analyticsEvents: analyticsSource.available,
      generationHistory: generationSource.available,
      purchases: purchaseSource.available,
    },
  });
}

export function deriveRate(
  numerator: number | null | undefined,
  denominator: number | null | undefined
) {
  if (
    numerator === null ||
    numerator === undefined ||
    denominator === null ||
    denominator === undefined ||
    denominator <= 0
  ) {
    return null;
  }

  return numerator / denominator;
}

function buildOperatingRow(params: {
  auditRow: PricingClusterAuditRow;
  thresholds: PricingClusterPerformanceThresholds;
  dataAvailability: PricingClusterPerformanceAvailability;
  analytics?: PricingClusterAnalyticsSignalRow;
  history?: PricingClusterGenerationSignalRow;
  purchase?: PricingClusterPurchaseSignalRow;
}): PricingClusterOperatingRow {
  const { auditRow, dataAvailability, thresholds } = params;
  const views = dataAvailability.analyticsEvents ? params.analytics?.views || 0 : null;
  const generateClicks = dataAvailability.analyticsEvents
    ? params.analytics?.generateClicks || 0
    : null;
  const generateSuccesses = dataAvailability.analyticsEvents
    ? params.analytics?.generateSuccesses || 0
    : null;
  const historySaves = dataAvailability.generationHistory
    ? params.history?.historySaves || 0
    : null;
  const checkoutClicks = dataAvailability.purchases
    ? params.purchase?.checkoutClicks || 0
    : null;
  const purchaseSuccesses = dataAvailability.purchases
    ? params.purchase?.purchaseSuccesses || 0
    : null;

  const generatorClickRate = deriveRate(generateClicks, views);
  const generationSuccessRate = deriveRate(generateSuccesses, generateClicks);
  const checkoutIntentRate = deriveRate(checkoutClicks, generateSuccesses);
  const purchaseRate = deriveRate(purchaseSuccesses, checkoutClicks);
  const diagnostics = derivePricingClusterDiagnostics({
    auditRow,
    thresholds,
    dataAvailability,
    views,
    generateClicks,
    generateSuccesses,
    checkoutClicks,
    purchaseSuccesses,
    generatorClickRate,
    generationSuccessRate,
    checkoutIntentRate,
    purchaseRate,
  });

  return {
    slug: auditRow.slug,
    title: auditRow.title,
    seoTitle: auditRow.seoTitle,
    family: auditRow.family,
    canonicalRoute: auditRow.canonicalRoute,
    generatorScenarioSlug: auditRow.generatorScenarioSlug,
    generatorMappingKind: auditRow.generatorMappingKind,
    generatorFit: auditRow.generatorFit,
    auditFlags: [...auditRow.flags],
    views,
    generateClicks,
    generateSuccesses,
    historySaves,
    checkoutClicks,
    purchaseSuccesses,
    generatorClickRate,
    generationSuccessRate,
    checkoutIntentRate,
    purchaseRate,
    diagnostics,
  };
}

function derivePricingClusterDiagnostics(params: {
  auditRow: PricingClusterAuditRow;
  thresholds: PricingClusterPerformanceThresholds;
  dataAvailability: PricingClusterPerformanceAvailability;
  views: number | null;
  generateClicks: number | null;
  generateSuccesses: number | null;
  checkoutClicks: number | null;
  purchaseSuccesses: number | null;
  generatorClickRate: number | null;
  generationSuccessRate: number | null;
  checkoutIntentRate: number | null;
  purchaseRate: number | null;
}): PricingClusterPerformanceDiagnostic[] {
  const labels = new Set<PricingClusterPerformanceDiagnostic>();
  const {
    auditRow,
    thresholds,
    dataAvailability,
    views,
    generateClicks,
    generateSuccesses,
    checkoutClicks,
    purchaseSuccesses,
    generatorClickRate,
    generationSuccessRate,
    checkoutIntentRate,
    purchaseRate,
  } = params;

  const analyticsUnavailable = !dataAvailability.analyticsEvents;
  const purchaseUnavailable = !dataAvailability.purchases;
  const lowSignal =
    (views ?? 0) < thresholds.insufficientDataViewThreshold &&
    (generateClicks ?? 0) < thresholds.generationClickThreshold &&
    (generateSuccesses ?? 0) < thresholds.monetizationGenerationThreshold &&
    (checkoutClicks ?? 0) < thresholds.purchaseClickThreshold &&
    (purchaseSuccesses ?? 0) === 0;

  if ((analyticsUnavailable && purchaseUnavailable) || lowSignal) {
    labels.add('insufficient_data');
  }

  if (
    dataAvailability.analyticsEvents &&
    !labels.has('insufficient_data') &&
    (views ?? 0) < thresholds.discoverabilityViewThreshold &&
    (generateClicks ?? 0) <= 2 &&
    (purchaseSuccesses ?? 0) === 0
  ) {
    labels.add('discoverability_problem');
  }

  if (
    dataAvailability.analyticsEvents &&
    (views ?? 0) >= thresholds.ctaViewThreshold &&
    generatorClickRate !== null &&
    generatorClickRate < thresholds.lowGeneratorClickRateThreshold
  ) {
    labels.add('cta_problem');
  }

  if (
    dataAvailability.analyticsEvents &&
    (generateClicks ?? 0) >= thresholds.generationClickThreshold &&
    generationSuccessRate !== null &&
    generationSuccessRate < thresholds.lowGenerationSuccessRateThreshold
  ) {
    labels.add('generation_problem');
  }

  if (
    dataAvailability.analyticsEvents &&
    dataAvailability.purchases &&
    (generateSuccesses ?? 0) >= thresholds.monetizationGenerationThreshold &&
    checkoutIntentRate !== null &&
    checkoutIntentRate < thresholds.lowCheckoutIntentRateThreshold
  ) {
    labels.add('monetization_problem');
  }

  if (
    dataAvailability.purchases &&
    (checkoutClicks ?? 0) >= thresholds.purchaseClickThreshold &&
    purchaseRate !== null &&
    purchaseRate < thresholds.lowPurchaseRateThreshold
  ) {
    labels.add('monetization_problem');
  }

  if (
    auditRow.flags.includes('weak-generator-fit') &&
    (labels.has('generation_problem') ||
      labels.has('monetization_problem') ||
      ((generateClicks ?? 0) >= thresholds.generationClickThreshold &&
        (generateSuccesses ?? 0) === 0))
  ) {
    labels.add('needs_mapping_upgrade');
  }

  if (
    dataAvailability.analyticsEvents &&
    dataAvailability.purchases &&
    !labels.has('insufficient_data') &&
    (views ?? 0) >= thresholds.highPotentialViewThreshold &&
    generatorClickRate !== null &&
    generatorClickRate >= thresholds.highPotentialClickRateThreshold &&
    generationSuccessRate !== null &&
    generationSuccessRate >=
      thresholds.highPotentialGenerationSuccessRateThreshold &&
    checkoutIntentRate !== null &&
    checkoutIntentRate >= thresholds.highPotentialCheckoutIntentRateThreshold &&
    purchaseRate !== null &&
    purchaseRate >= thresholds.highPotentialPurchaseRateThreshold
  ) {
    labels.add('high_potential');
  }

  return [...labels];
}

function buildTopFamilySummaries(params: {
  pages: PricingClusterOperatingRow[];
  metric: 'views' | 'checkoutClicks';
  sourceAvailable: boolean;
}): PricingClusterFamilyPerformanceSummary[] {
  if (!params.sourceAvailable) {
    return [];
  }

  const familyMap = new Map<string, PricingClusterFamilyPerformanceSummary>();

  for (const page of params.pages) {
    const current = familyMap.get(page.family) || {
      family: page.family,
      pages: 0,
      views: 0,
      generateClicks: 0,
      generateSuccesses: 0,
      checkoutClicks: 0,
      purchaseSuccesses: 0,
    };

    current.pages += 1;
    current.views = (current.views || 0) + (page.views || 0);
    current.generateClicks =
      (current.generateClicks || 0) + (page.generateClicks || 0);
    current.generateSuccesses =
      (current.generateSuccesses || 0) + (page.generateSuccesses || 0);
    current.checkoutClicks =
      (current.checkoutClicks || 0) + (page.checkoutClicks || 0);
    current.purchaseSuccesses =
      (current.purchaseSuccesses || 0) + (page.purchaseSuccesses || 0);

    familyMap.set(page.family, current);
  }

  return [...familyMap.values()]
    .sort((left, right) => {
      const leftMetric = left[params.metric] || 0;
      const rightMetric = right[params.metric] || 0;
      if (rightMetric !== leftMetric) {
        return rightMetric - leftMetric;
      }

      return left.family.localeCompare(right.family);
    })
    .slice(0, 5);
}

function buildPrioritizedActions(
  pages: PricingClusterOperatingRow[]
): PricingClusterPrioritizedAction[] {
  const actions: PricingClusterPrioritizedAction[] = [];

  const ctaPages = pages
    .filter((page) => page.diagnostics.includes('cta_problem'))
    .sort((left, right) => (right.views || 0) - (left.views || 0))
    .slice(0, 5)
    .map((page) => page.slug);
  if (ctaPages.length > 0) {
    actions.push({
      action: 'improve_cta',
      reason: 'High pricing-page traffic is not translating into generate starts.',
      slugs: ctaPages,
    });
  }

  const mappingPages = pages
    .filter((page) => page.diagnostics.includes('needs_mapping_upgrade'))
    .sort(
      (left, right) =>
        (right.generateClicks || 0) - (left.generateClicks || 0) ||
        (right.views || 0) - (left.views || 0)
    )
    .slice(0, 5)
    .map((page) => page.slug);
  if (mappingPages.length > 0) {
    actions.push({
      action: 'improve_generator_mapping',
      reason:
        'Weak-fit or reused mappings are coinciding with soft post-click performance.',
      slugs: mappingPages,
    });
  }

  const monetizationPages = pages
    .filter((page) => page.diagnostics.includes('monetization_problem'))
    .sort(
      (left, right) =>
        (right.generateSuccesses || 0) - (left.generateSuccesses || 0)
    )
    .slice(0, 5)
    .map((page) => page.slug);
  if (monetizationPages.length > 0) {
    actions.push({
      action: 'improve_monetization',
      reason:
        'These pages are getting successful generations but weak commercial follow-through.',
      slugs: monetizationPages,
    });
  }

  const bestFamilies = aggregateFamilyHighPotentialPages(pages)
    .filter((family) => family.slugs.length > 0)
    .slice(0, 3);
  if (bestFamilies.length > 0) {
    actions.push({
      action: 'expand_family',
      reason:
        'These families already show strong page-level funnel behavior and are the safest expansion candidates.',
      slugs: bestFamilies.map((family) => family.family),
    });
  }

  return actions;
}

function aggregateFamilyHighPotentialPages(pages: PricingClusterOperatingRow[]) {
  const familyMap = new Map<string, { family: string; slugs: string[]; views: number }>();

  for (const page of pages) {
    if (!page.diagnostics.includes('high_potential')) {
      continue;
    }

    const current = familyMap.get(page.family) || {
      family: page.family,
      slugs: [],
      views: 0,
    };
    current.slugs.push(page.slug);
    current.views += page.views || 0;
    familyMap.set(page.family, current);
  }

  return [...familyMap.values()].sort(
    (left, right) => right.views - left.views || left.family.localeCompare(right.family)
  );
}

function buildLimitations(
  dataAvailability: PricingClusterPerformanceAvailability
) {
  const limitations = [
    'History saves are derived from stored generation rows with pricing attribution plus history-enabled support levels, not from a separate persisted save_history analytics table.',
    'Checkout clicks are derived from persisted purchase rows with pricing attribution metadata, so they represent checkout sessions created server-side rather than every client-side click attempt.',
    'Purchase successes are counted from purchase rows created inside the reporting window that later resolved to paid with credits granted.',
  ];

  if (!dataAvailability.analyticsEvents) {
    limitations.push(
      'Pricing view/generate/success analytics were unavailable when this report ran, so those fields are null rather than estimated.'
    );
  }

  if (!dataAvailability.generationHistory) {
    limitations.push(
      'Generation history rows were unavailable when this report ran, so historySaves is null rather than inferred.'
    );
  }

  if (!dataAvailability.purchases) {
    limitations.push(
      'Purchase rows were unavailable when this report ran, so checkout and purchase metrics are null rather than estimated.'
    );
  }

  return limitations;
}

async function loadPricingAnalyticsSignals(params: {
  days: number;
  limit: number;
}): Promise<{
  available: boolean;
  rows: PricingClusterAnalyticsSignalRow[];
}> {
  try {
    const analytics = await getScenarioAnalyticsSlugCounts({
      days: params.days,
      limit: params.limit,
      pageType: 'pricing',
    });

    return {
      available: true,
      rows: analytics.countsBySlug.map((row) => ({
        pricingSlug: row.scenarioSlug,
        views: row.fd_scenario_view,
        generateClicks: row.fd_tool_start,
        generateSuccesses: row.fd_generation_success,
      })),
    };
  } catch {
    return {
      available: false,
      rows: [],
    };
  }
}

async function loadPricingGenerationSignals(params: {
  createdAfter: Date;
}): Promise<{
  available: boolean;
  rows: PricingClusterGenerationSignalRow[];
}> {
  try {
    const rows = await db()
      .select({
        userId: generation.userId,
        supportLevel: generation.supportLevel,
        strategyJson: generation.strategyJson,
      })
      .from(generation)
      .where(gte(generation.createdAt, params.createdAfter));

    const bySlug = new Map<string, PricingClusterGenerationSignalRow>();

    for (const row of rows) {
      const payload = parseStoredGenerationPayload(row.strategyJson);
      const pricingSlug = getPricingScenarioBySlug(
        String(payload.generationLog?.pricingAttribution?.pricingSlug || '').trim()
      )?.slug;

      if (!pricingSlug) {
        continue;
      }

      const current = bySlug.get(pricingSlug) || {
        pricingSlug,
        historySaves: 0,
      };

      const normalizedSupportLevel = String(row.supportLevel || '').trim();
      if (row.userId && HISTORY_ENABLED_SUPPORT_LEVELS.has(normalizedSupportLevel)) {
        current.historySaves += 1;
      }

      bySlug.set(pricingSlug, current);
    }

    return {
      available: true,
      rows: [...bySlug.values()],
    };
  } catch {
    return {
      available: false,
      rows: [],
    };
  }
}

async function loadPricingPurchaseSignals(params: {
  createdAfter: Date;
}): Promise<{
  available: boolean;
  rows: PricingClusterPurchaseSignalRow[];
}> {
  try {
    const rows = await db()
      .select({
        status: purchase.status,
        creditsGranted: purchase.creditsGranted,
        metadata: purchase.metadata,
      })
      .from(purchase)
      .where(gte(purchase.createdAt, params.createdAfter));

    const bySlug = new Map<string, PricingClusterPurchaseSignalRow>();

    for (const row of rows) {
      const parsed = parsePurchaseMetadata(row.metadata);
      if (!parsed) {
        continue;
      }

      const current = bySlug.get(parsed.pricingSlug) || {
        pricingSlug: parsed.pricingSlug,
        checkoutClicks: 0,
        purchaseSuccesses: 0,
      };

      current.checkoutClicks += 1;
      if (isSuccessfulPurchase(row.status, row.creditsGranted)) {
        current.purchaseSuccesses += 1;
      }

      bySlug.set(parsed.pricingSlug, current);
    }

    return {
      available: true,
      rows: [...bySlug.values()],
    };
  } catch {
    return {
      available: false,
      rows: [],
    };
  }
}

function parsePurchaseMetadata(raw: string | null | undefined) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const pricingSlug = getPricingScenarioBySlug(
      String(parsed.pricingSlug || '').trim()
    )?.slug;

    if (!pricingSlug) {
      return null;
    }

    return {
      pricingSlug,
    };
  } catch {
    return null;
  }
}

function isSuccessfulPurchase(
  status: string | null | undefined,
  creditsGranted: number | null | undefined
) {
  return String(status || '').trim() === 'paid' && Number(creditsGranted || 0) > 0;
}
