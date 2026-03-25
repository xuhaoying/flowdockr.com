// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  verifyPricingClusterPerformanceCronRequest: vi.fn(),
  refreshPricingClusterPerformanceSnapshot: vi.fn(),
  recordPricingClusterPerformanceRefreshFailure: vi.fn(),
}));

vi.mock('@/lib/pricing-cluster-performance-snapshot', () => ({
  verifyPricingClusterPerformanceCronRequest:
    mocks.verifyPricingClusterPerformanceCronRequest,
  refreshPricingClusterPerformanceSnapshot:
    mocks.refreshPricingClusterPerformanceSnapshot,
  recordPricingClusterPerformanceRefreshFailure:
    mocks.recordPricingClusterPerformanceRefreshFailure,
}));

import { GET, POST } from './route';

describe('/api/internal/pricing-cluster-performance/refresh', () => {
  beforeEach(() => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReset();
    mocks.refreshPricingClusterPerformanceSnapshot.mockReset();
    mocks.recordPricingClusterPerformanceRefreshFailure.mockReset();
  });

  it('refreshes the scheduled snapshot for authorized cron requests', async () => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReturnValue({
      ok: true,
      status: 200,
      reason: null,
    });
    mocks.refreshPricingClusterPerformanceSnapshot.mockResolvedValue({
      report: {
        generatedAt: '2026-03-25T00:00:00.000Z',
        snapshotState: 'reachable_empty',
      },
      summaryMarkdown: '# Snapshot',
      refresh: {
        status: 'success',
      },
    });

    const response = await GET(
      new NextRequest(
        'http://localhost/api/internal/pricing-cluster-performance/refresh?days=7&limit=100'
      )
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(mocks.refreshPricingClusterPerformanceSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({
        days: 7,
        limit: 100,
        mode: 'scheduled',
      })
    );
    expect(payload.success).toBe(true);
  });

  it('records refresh failures and returns 500', async () => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReturnValue({
      ok: true,
      status: 200,
      reason: null,
    });
    mocks.refreshPricingClusterPerformanceSnapshot.mockRejectedValue(
      new Error('DB_WRITE_FAILED')
    );

    const response = await POST(
      new NextRequest(
        'http://localhost/api/internal/pricing-cluster-performance/refresh',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-cron-secret',
          },
        }
      )
    );
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(mocks.recordPricingClusterPerformanceRefreshFailure).toHaveBeenCalled();
    expect(payload).toMatchObject({
      success: false,
      error: 'PRICING_CLUSTER_PERFORMANCE_REFRESH_FAILED',
      reason: 'DB_WRITE_FAILED',
    });
  });
});
