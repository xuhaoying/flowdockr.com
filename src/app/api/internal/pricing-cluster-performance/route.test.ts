// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  verifyPricingClusterPerformanceCronRequest: vi.fn(),
  getStoredPricingClusterPerformanceSnapshot: vi.fn(),
}));

vi.mock('@/lib/pricing-cluster-performance-snapshot', () => ({
  verifyPricingClusterPerformanceCronRequest:
    mocks.verifyPricingClusterPerformanceCronRequest,
  getStoredPricingClusterPerformanceSnapshot:
    mocks.getStoredPricingClusterPerformanceSnapshot,
}));

import { GET } from './route';

describe('/api/internal/pricing-cluster-performance', () => {
  beforeEach(() => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReset();
    mocks.getStoredPricingClusterPerformanceSnapshot.mockReset();
  });

  it('returns stored json snapshot for authorized requests', async () => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReturnValue({
      ok: true,
      status: 200,
      reason: null,
    });
    mocks.getStoredPricingClusterPerformanceSnapshot.mockResolvedValue({
      report: {
        generatedAt: '2026-03-25T00:00:00.000Z',
        refresh: { status: 'success' },
      },
      summaryMarkdown: '# Snapshot',
      refresh: {
        status: 'success',
      },
    });

    const response = await GET(
      new NextRequest('http://localhost/api/internal/pricing-cluster-performance')
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      success: true,
      storageBackend: 'config',
    });
    expect(payload.summaryMarkdown).toContain('# Snapshot');
  });

  it('returns markdown summary when requested', async () => {
    mocks.verifyPricingClusterPerformanceCronRequest.mockReturnValue({
      ok: true,
      status: 200,
      reason: null,
    });
    mocks.getStoredPricingClusterPerformanceSnapshot.mockResolvedValue({
      report: {
        generatedAt: '2026-03-25T00:00:00.000Z',
        refresh: { status: 'success' },
      },
      summaryMarkdown: '# Snapshot',
      refresh: {
        status: 'success',
      },
    });

    const response = await GET(
      new NextRequest(
        'http://localhost/api/internal/pricing-cluster-performance?format=summary'
      )
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(await response.text()).toContain('# Snapshot');
  });
});
