import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockState = vi.hoisted(() => {
  const configs: Record<string, string> = {};

  return {
    configs,
    saveConfigs: vi.fn(async (entries: Record<string, string>) => {
      Object.assign(configs, entries);
      return [];
    }),
    getConfigs: vi.fn(async () => ({ ...configs })),
  };
});

vi.mock('@/shared/models/config', () => ({
  saveConfigs: mockState.saveConfigs,
  getConfigs: mockState.getConfigs,
}));

vi.mock('@/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/config')>();

  return {
    ...actual,
    envConfigs: {
      ...actual.envConfigs,
      cron_secret: 'test-cron-secret',
      database_url: '',
      database_provider: 'postgresql',
    },
  };
});

import {
  PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY,
  PRICING_CLUSTER_PERFORMANCE_REPORT_CONFIG_KEY,
  PRICING_CLUSTER_PERFORMANCE_SUMMARY_CONFIG_KEY,
  getStoredPricingClusterPerformanceSnapshot,
  recordPricingClusterPerformanceRefreshFailure,
  refreshPricingClusterPerformanceSnapshot,
  verifyPricingClusterPerformanceCronRequest,
} from './pricing-cluster-performance-snapshot';

describe('pricing cluster performance snapshot storage', () => {
  beforeEach(() => {
    Object.keys(mockState.configs).forEach((key) => {
      delete mockState.configs[key];
    });
    mockState.saveConfigs.mockClear();
    mockState.getConfigs.mockClear();
  });

  it('persists a scheduled snapshot into config storage', async () => {
    const snapshot = await refreshPricingClusterPerformanceSnapshot({
      days: 7,
      limit: 100,
      mode: 'scheduled',
      now: '2026-03-25T00:00:00.000Z',
    });

    expect(mockState.saveConfigs).toHaveBeenCalledTimes(1);
    expect(mockState.configs[PRICING_CLUSTER_PERFORMANCE_REPORT_CONFIG_KEY]).toBeTruthy();
    expect(mockState.configs[PRICING_CLUSTER_PERFORMANCE_SUMMARY_CONFIG_KEY]).toContain(
      '# Pricing Cluster Performance Snapshot'
    );
    expect(
      mockState.configs[PRICING_CLUSTER_PERFORMANCE_REFRESH_STATUS_CONFIG_KEY]
    ).toContain('"status":"success"');
    expect(snapshot.report.refresh).toMatchObject({
      mode: 'scheduled',
      status: 'success',
      storageBackend: 'config',
      lastRefreshAttemptAt: '2026-03-25T00:00:00.000Z',
    });
    expect(snapshot.report.refresh.lastSuccessfulRefreshAt).toBeTruthy();
  });

  it('merges the latest failure status onto the last successful snapshot', async () => {
    const firstSnapshot = await refreshPricingClusterPerformanceSnapshot({
      mode: 'scheduled',
      now: '2026-03-25T00:00:00.000Z',
    });

    await recordPricingClusterPerformanceRefreshFailure({
      mode: 'scheduled',
      attemptedAt: '2026-03-25T06:00:00.000Z',
      reason: 'DATABASE_TIMEOUT',
    });

    const stored = await getStoredPricingClusterPerformanceSnapshot();

    expect(stored.report?.refresh).toMatchObject({
      mode: 'scheduled',
      status: 'failure',
      storageBackend: 'config',
      lastRefreshAttemptAt: '2026-03-25T06:00:00.000Z',
      lastSuccessfulRefreshAt: firstSnapshot.report.refresh.lastSuccessfulRefreshAt,
      lastFailureAt: '2026-03-25T06:00:00.000Z',
      refreshFailureReason: 'DATABASE_TIMEOUT',
    });
    expect(stored.summaryMarkdown).toContain('Pricing Cluster Performance Snapshot');
  });

  it('verifies bearer auth using the cron secret', () => {
    const authorized = verifyPricingClusterPerformanceCronRequest(
      new Request('http://localhost/api/internal/pricing-cluster-performance', {
        headers: {
          Authorization: 'Bearer test-cron-secret',
        },
      })
    );
    const unauthorized = verifyPricingClusterPerformanceCronRequest(
      new Request('http://localhost/api/internal/pricing-cluster-performance')
    );

    expect(authorized).toMatchObject({
      ok: true,
      reason: null,
    });
    expect(unauthorized).toMatchObject({
      ok: false,
      status: 401,
      reason: 'UNAUTHORIZED',
    });
  });
});
