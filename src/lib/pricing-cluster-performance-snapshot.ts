import { envConfigs } from '@/config';
import {
  applyPricingClusterPerformanceRefreshMetadata,
  buildPricingClusterPerformanceRefreshMetadata,
  buildPricingClusterPerformanceSnapshotMarkdown,
  getPricingClusterPerformanceReport,
  type PricingClusterPerformanceRefreshMetadata,
  type PricingClusterPerformanceRefreshMode,
  type PricingClusterPerformanceReport,
} from '@/lib/pricing-cluster-performance';
import { getConfigs, saveConfigs } from '@/shared/models/config';

export const PRICING_CLUSTER_PERFORMANCE_REPORT_CONFIG_KEY =
  'pricing_cluster_performance_snapshot_report_json';
export const PRICING_CLUSTER_PERFORMANCE_SUMMARY_CONFIG_KEY =
  'pricing_cluster_performance_snapshot_summary_md';
export const PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY =
  'pricing_cluster_performance_snapshot_refresh_status_json';

export type StoredPricingClusterPerformanceSnapshot = {
  report: PricingClusterPerformanceReport | null;
  summaryMarkdown: string;
  refresh: PricingClusterPerformanceRefreshMetadata | null;
};

export function getPricingClusterPerformanceCronSecret() {
  return String(envConfigs.cron_secret || '').trim();
}

export function verifyPricingClusterPerformanceCronRequest(request: Request) {
  const cronSecret = getPricingClusterPerformanceCronSecret();

  if (!cronSecret) {
    return {
      ok: false,
      status: 503,
      reason: 'CRON_SECRET_MISSING',
    } as const;
  }

  const authorization = String(request.headers.get('authorization') || '').trim();
  if (authorization !== `Bearer ${cronSecret}`) {
    return {
      ok: false,
      status: 401,
      reason: 'UNAUTHORIZED',
    } as const;
  }

  return {
    ok: true,
    status: 200,
    reason: null,
  } as const;
}

export async function refreshPricingClusterPerformanceSnapshot(params?: {
  days?: number;
  limit?: number;
  mode?: PricingClusterPerformanceRefreshMode;
  now?: string;
}) {
  const now = params?.now || new Date().toISOString();
  const baseReport = await getPricingClusterPerformanceReport({
    days: params?.days,
    limit: params?.limit,
    refresh: {
      mode: params?.mode || 'scheduled',
      status: 'success',
      storageBackend: 'config',
      lastRefreshAttemptAt: now,
    },
  });
  const report = applyPricingClusterPerformanceRefreshMetadata(
    baseReport,
    {
      mode: params?.mode || 'scheduled',
      status: 'success',
      storageBackend: 'config',
      lastRefreshAttemptAt: now,
      lastSuccessfulRefreshAt: baseReport.generatedAt,
      lastFailureAt: null,
      refreshFailureReason: null,
    },
    now
  );
  const summaryMarkdown = buildPricingClusterPerformanceSnapshotMarkdown(report);

  await saveConfigs({
    [PRICING_CLUSTER_PERFORMANCE_REPORT_CONFIG_KEY]: JSON.stringify(report),
    [PRICING_CLUSTER_PERFORMANCE_SUMMARY_CONFIG_KEY]: summaryMarkdown,
    [PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY]: JSON.stringify(
      report.refresh
    ),
  });

  return {
    report,
    summaryMarkdown,
    refresh: report.refresh,
  } satisfies StoredPricingClusterPerformanceSnapshot;
}

export async function recordPricingClusterPerformanceRefreshFailure(params: {
  reason: string;
  mode?: PricingClusterPerformanceRefreshMode;
  attemptedAt?: string;
}) {
  const attemptedAt = params.attemptedAt || new Date().toISOString();
  const storedSnapshot = await getStoredPricingClusterPerformanceSnapshot().catch(
    () => ({
      report: null,
      summaryMarkdown: '',
      refresh: null,
    })
  );
  const refresh = buildPricingClusterPerformanceRefreshMetadata({
    generatedAt:
      storedSnapshot.report?.generatedAt ||
      storedSnapshot.refresh?.lastSuccessfulRefreshAt ||
      attemptedAt,
    refresh: {
      mode: params.mode || 'scheduled',
      status: 'failure',
      storageBackend: 'config',
      lastRefreshAttemptAt: attemptedAt,
      lastSuccessfulRefreshAt:
        storedSnapshot.refresh?.lastSuccessfulRefreshAt ||
        storedSnapshot.report?.refresh.lastSuccessfulRefreshAt ||
        storedSnapshot.report?.generatedAt ||
        null,
      lastFailureAt: attemptedAt,
      refreshFailureReason: params.reason || 'UNKNOWN',
      refreshIntervalHours:
        storedSnapshot.refresh?.refreshIntervalHours ||
        storedSnapshot.report?.refresh.refreshIntervalHours,
    },
    now: attemptedAt,
  });

  await saveConfigs({
    [PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY]: JSON.stringify(
      refresh
    ),
  });

  return refresh;
}

export async function getStoredPricingClusterPerformanceSnapshot() {
  const configs = await getConfigs();
  const parsedReport = parseStoredPricingClusterPerformanceReport(
    configs[PRICING_CLUSTER_PERFORMANCE_REPORT_CONFIG_KEY]
  );
  const parsedRefresh = parseStoredPricingClusterPerformanceRefreshMetadata(
    configs[PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY]
  );
  const summaryMarkdown = String(
    configs[PRICING_CLUSTER_PERFORMANCE_SUMMARY_CONFIG_KEY] || ''
  );
  const report = parsedReport
    ? applyPricingClusterPerformanceRefreshMetadata(
        parsedReport,
        parsedRefresh || {},
        new Date().toISOString()
      )
    : null;

  return {
    report,
    summaryMarkdown:
      summaryMarkdown || (report ? buildPricingClusterPerformanceSnapshotMarkdown(report) : ''),
    refresh: report?.refresh || parsedRefresh,
  } satisfies StoredPricingClusterPerformanceSnapshot;
}

export function parseStoredPricingClusterPerformanceReport(
  raw: string | null | undefined
) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PricingClusterPerformanceReport;
    if (!parsed || typeof parsed !== 'object' || !parsed.generatedAt) {
      return null;
    }

    return {
      ...parsed,
      refresh: buildPricingClusterPerformanceRefreshMetadata({
        generatedAt: parsed.generatedAt,
        refresh: parsed.refresh,
      }),
    } satisfies PricingClusterPerformanceReport;
  } catch {
    return null;
  }
}

export function parseStoredPricingClusterPerformanceRefreshMetadata(
  raw: string | null | undefined
) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PricingClusterPerformanceRefreshMetadata>;
    const generatedAt =
      String(parsed.lastSuccessfulRefreshAt || parsed.lastRefreshAttemptAt || '').trim() ||
      new Date().toISOString();

    return buildPricingClusterPerformanceRefreshMetadata({
      generatedAt,
      refresh: parsed,
      now: new Date().toISOString(),
    });
  } catch {
    return null;
  }
}
