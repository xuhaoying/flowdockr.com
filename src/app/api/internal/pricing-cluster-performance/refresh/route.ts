import { NextRequest, NextResponse } from 'next/server';

import {
  recordPricingClusterPerformanceRefreshFailure,
  refreshPricingClusterPerformanceSnapshot,
  verifyPricingClusterPerformanceCronRequest,
} from '@/lib/pricing-cluster-performance-snapshot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parsePositiveInt(raw: string | null, fallback: number) {
  const value = Number(raw || fallback);
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }

  return Math.floor(value);
}

async function handleRefresh(
  request: NextRequest,
  mode: 'manual' | 'scheduled'
) {
  const auth = verifyPricingClusterPerformanceCronRequest(request);
  if (!auth.ok) {
    return NextResponse.json(
      {
        success: false,
        error: auth.reason,
      },
      { status: auth.status }
    );
  }

  const days = parsePositiveInt(request.nextUrl.searchParams.get('days'), 30);
  const limit = parsePositiveInt(request.nextUrl.searchParams.get('limit'), 500);
  const attemptedAt = new Date().toISOString();

  try {
    const snapshot = await refreshPricingClusterPerformanceSnapshot({
      days,
      limit,
      mode,
      now: attemptedAt,
    });

    console.info(
      '[pricing-cluster-performance.refresh]',
      JSON.stringify({
        event: 'refresh_succeeded',
        mode,
        generatedAt: snapshot.report?.generatedAt,
        snapshotState: snapshot.report?.snapshotState,
      })
    );

    return NextResponse.json({
      success: true,
      report: snapshot.report,
      summaryMarkdown: snapshot.summaryMarkdown,
      refresh: snapshot.refresh,
      storageBackend: 'config',
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.message ? error.message : 'UNKNOWN_ERROR';

    console.error(
      '[pricing-cluster-performance.refresh]',
      JSON.stringify({
        event: 'refresh_failed',
        mode,
        attemptedAt,
        reason,
      })
    );

    try {
      await recordPricingClusterPerformanceRefreshFailure({
        attemptedAt,
        mode,
        reason,
      });
    } catch (statusError) {
      console.error(
        '[pricing-cluster-performance.refresh]',
        JSON.stringify({
          event: 'refresh_failure_status_persist_failed',
          mode,
          attemptedAt,
          reason:
            statusError instanceof Error && statusError.message
              ? statusError.message
              : 'UNKNOWN_ERROR',
        })
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'PRICING_CLUSTER_PERFORMANCE_REFRESH_FAILED',
        reason,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRefresh(request, 'scheduled');
}

export async function POST(request: NextRequest) {
  return handleRefresh(request, 'manual');
}
