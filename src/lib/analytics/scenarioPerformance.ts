import { scenarioPages } from '@/content/scenario-pages';
import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import type { CanonicalScenario } from '@/types/scenario-catalog';

import { getScenarioAnalyticsSlugCounts } from './scenarioEventLog';

export type ScenarioAnalyticsCountsRow = {
  scenarioSlug: string;
  fd_scenario_view: number;
  fd_tool_start: number;
  fd_generation_success: number;
  total: number;
};

export type ScenarioSearchConsoleRowInput = {
  slug?: string | null;
  page?: string | null;
  url?: string | null;
  indexed?: string | boolean | number | null;
  index_status?: string | null;
  impressions?: string | number | null;
  clicks?: string | number | null;
  ctr?: string | number | null;
  position?: string | number | null;
};

export type ScenarioPerformanceThresholds = {
  ctrImpressionThreshold: number;
  lowCtrThreshold: number;
  conversionViewThreshold: number;
  lowToolStartRateThreshold: number;
};

export type ScenarioPerformanceRow = {
  scenarioSlug: string;
  title: string;
  isPriority: boolean;
  views: number;
  toolStartCount: number;
  generationSuccessCount: number;
  scenarioToToolStartRate: number | null;
  toolStartToGenerationSuccessRate: number | null;
  indexed: boolean | null;
  indexStatus: string | null;
  impressions: number | null;
  clicks: number | null;
  ctr: number | null;
  position: number | null;
  needsTitleMetaRewrite: boolean;
  needsConversionReview: boolean;
};

export const DEFAULT_SCENARIO_PERFORMANCE_THRESHOLDS: ScenarioPerformanceThresholds =
  {
    ctrImpressionThreshold: 100,
    lowCtrThreshold: 0.02,
    conversionViewThreshold: 50,
    lowToolStartRateThreshold: 0.1,
  };

type AggregatedSearchConsoleRow = {
  scenarioSlug: string;
  indexed: boolean | null;
  indexStatus: string | null;
  impressions: number | null;
  clicks: number | null;
  ctr: number | null;
  position: number | null;
};

export function buildScenarioPerformanceRows(params: {
  scenarioPages?: CanonicalScenario[];
  analyticsCounts: ScenarioAnalyticsCountsRow[];
  searchConsoleRows?: ScenarioSearchConsoleRowInput[];
  thresholds?: Partial<ScenarioPerformanceThresholds>;
}) {
  const scenarioPagesInput = params.scenarioPages || scenarioPages;
  const thresholds = {
    ...DEFAULT_SCENARIO_PERFORMANCE_THRESHOLDS,
    ...(params.thresholds || {}),
  };

  const countsMap = new Map(
    params.analyticsCounts.map((row) => [row.scenarioSlug, row])
  );
  const searchConsoleMap = buildSearchConsoleMetricsBySlug(
    params.searchConsoleRows || []
  );

  const rows: ScenarioPerformanceRow[] = scenarioPagesInput.map((scenario) => {
    const counts = countsMap.get(scenario.slug);
    const searchMetrics = searchConsoleMap.get(scenario.slug);
    const views = counts?.fd_scenario_view || 0;
    const toolStartCount = counts?.fd_tool_start || 0;
    const generationSuccessCount = counts?.fd_generation_success || 0;
    const scenarioToToolStartRate = deriveRate(toolStartCount, views);
    const toolStartToGenerationSuccessRate = deriveRate(
      generationSuccessCount,
      toolStartCount
    );
    const impressions = searchMetrics?.impressions ?? null;
    const ctr = searchMetrics?.ctr ?? null;

    return {
      scenarioSlug: scenario.slug,
      title: scenario.title,
      isPriority: Boolean(scenario.isPriority),
      views,
      toolStartCount,
      generationSuccessCount,
      scenarioToToolStartRate,
      toolStartToGenerationSuccessRate,
      indexed: searchMetrics?.indexed ?? null,
      indexStatus: searchMetrics?.indexStatus ?? null,
      impressions,
      clicks: searchMetrics?.clicks ?? null,
      ctr,
      position: searchMetrics?.position ?? null,
      needsTitleMetaRewrite:
        impressions !== null &&
        impressions >= thresholds.ctrImpressionThreshold &&
        ctr !== null &&
        ctr < thresholds.lowCtrThreshold,
      needsConversionReview:
        views >= thresholds.conversionViewThreshold &&
        scenarioToToolStartRate !== null &&
        scenarioToToolStartRate < thresholds.lowToolStartRateThreshold,
    };
  });

  const priorityRows = rows.filter((row) => row.isPriority);

  return {
    thresholds,
    rows,
    priorityRows,
  };
}

export async function getScenarioPerformanceReport(params?: {
  days?: number;
  limit?: number;
  thresholds?: Partial<ScenarioPerformanceThresholds>;
  searchConsoleRows?: ScenarioSearchConsoleRowInput[];
}) {
  const analytics = await getScenarioAnalyticsSlugCounts({
    days: params?.days,
    limit: params?.limit || 500,
  });

  const report = buildScenarioPerformanceRows({
    analyticsCounts: analytics.countsBySlug,
    searchConsoleRows: params?.searchConsoleRows,
    thresholds: params?.thresholds,
  });

  return {
    days: analytics.days,
    limit: analytics.limit,
    thresholds: report.thresholds,
    rows: report.rows,
    priorityRows: report.priorityRows,
  };
}

export function deriveRate(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return null;
  }

  return numerator / denominator;
}

export function normalizeScenarioSlugFromSearchConsoleRow(
  row: ScenarioSearchConsoleRowInput
) {
  const directSlug = String(row.slug || '').trim();
  if (directSlug && getScenarioPageBySlug(directSlug)) {
    return directSlug;
  }

  const rawPath = String(row.page || row.url || '').trim();
  if (!rawPath) {
    return '';
  }

  try {
    const path = rawPath.startsWith('http')
      ? new URL(rawPath).pathname
      : rawPath;
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 2 && parts[0] === 'scenario') {
      return getScenarioPageBySlug(parts[1]) ? parts[1] : '';
    }

    if (parts.length === 3 && parts[1] === 'scenario') {
      return getScenarioPageBySlug(parts[2]) ? parts[2] : '';
    }
  } catch {
    return '';
  }

  return '';
}

function buildSearchConsoleMetricsBySlug(rows: ScenarioSearchConsoleRowInput[]) {
  const aggregated = new Map<string, AggregatedSearchConsoleAccumulator>();

  for (const row of rows) {
    const scenarioSlug = normalizeScenarioSlugFromSearchConsoleRow(row);
    if (!scenarioSlug) {
      continue;
    }

    const impressions = toNumberOrNull(row.impressions);
    const clicks = toNumberOrNull(row.clicks);
    const ctr = normalizeCtr(row.ctr);
    const position = toNumberOrNull(row.position);
    const indexed = parseIndexed(row.indexed);
    const indexStatus = normalizeText(row.index_status);

    const current = aggregated.get(scenarioSlug) || {
      scenarioSlug,
      impressions: 0,
      clicks: 0,
      fallbackCtrTotal: 0,
      fallbackCtrCount: 0,
      weightedPositionTotal: 0,
      weightedPositionImpressions: 0,
      fallbackPositionTotal: 0,
      fallbackPositionCount: 0,
      indexed: null,
      indexStatus: null,
    };

    if (impressions !== null) {
      current.impressions += impressions;
    }

    if (clicks !== null) {
      current.clicks += clicks;
    }

    if (ctr !== null) {
      current.fallbackCtrTotal += ctr;
      current.fallbackCtrCount += 1;
    }

    if (position !== null) {
      if (impressions !== null && impressions > 0) {
        current.weightedPositionTotal += position * impressions;
        current.weightedPositionImpressions += impressions;
      } else {
        current.fallbackPositionTotal += position;
        current.fallbackPositionCount += 1;
      }
    }

    if (indexed !== null) {
      current.indexed = indexed;
    } else if (current.indexed === null && impressions !== null && impressions > 0) {
      current.indexed = true;
    }

    if (indexStatus) {
      current.indexStatus = indexStatus;
    }

    aggregated.set(scenarioSlug, current);
  }

  const finalized = new Map<string, AggregatedSearchConsoleRow>();

  for (const [scenarioSlug, row] of aggregated.entries()) {
    const impressions = row.impressions > 0 ? row.impressions : null;
    const clicks = row.clicks > 0 ? row.clicks : impressions === null ? null : 0;
    const ctr =
      impressions && impressions > 0
        ? row.clicks / impressions
        : row.fallbackCtrCount > 0
          ? row.fallbackCtrTotal / row.fallbackCtrCount
          : null;
    const position =
      row.weightedPositionImpressions > 0
        ? row.weightedPositionTotal / row.weightedPositionImpressions
        : row.fallbackPositionCount > 0
          ? row.fallbackPositionTotal / row.fallbackPositionCount
          : null;

    finalized.set(scenarioSlug, {
      scenarioSlug,
      indexed: row.indexed,
      indexStatus: row.indexStatus,
      impressions,
      clicks,
      ctr,
      position,
    });
  }

  return finalized;
}

type AggregatedSearchConsoleAccumulator = {
  scenarioSlug: string;
  impressions: number;
  clicks: number;
  fallbackCtrTotal: number;
  fallbackCtrCount: number;
  weightedPositionTotal: number;
  weightedPositionImpressions: number;
  fallbackPositionTotal: number;
  fallbackPositionCount: number;
  indexed: boolean | null;
  indexStatus: string | null;
};

function toNumberOrNull(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const normalized = Number(String(value).replace(/,/g, '').trim());
  return Number.isFinite(normalized) ? normalized : null;
}

function normalizeCtr(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const raw = String(value).trim();
  if (!raw) {
    return null;
  }

  if (raw.endsWith('%')) {
    const parsedPercent = Number(raw.slice(0, -1).trim());
    return Number.isFinite(parsedPercent) ? parsedPercent / 100 : null;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (parsed > 1 && parsed <= 100) {
    return parsed / 100;
  }

  return parsed;
}

function parseIndexed(value: string | boolean | number | null | undefined) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value > 0;
  }

  const normalized = value.trim().toLowerCase();

  if (['true', 'yes', 'indexed', 'submitted and indexed'].includes(normalized)) {
    return true;
  }

  if (
    [
      'false',
      'no',
      'not indexed',
      'excluded',
      'crawled - currently not indexed',
      'discovered - currently not indexed',
    ].includes(normalized)
  ) {
    return false;
  }

  return null;
}

function normalizeText(value: string | null | undefined) {
  const normalized = String(value || '').trim();
  return normalized || null;
}
