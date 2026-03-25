import { NextRequest, NextResponse } from 'next/server';

import {
  getStoredPricingClusterPerformanceSnapshot,
  verifyPricingClusterPerformanceCronRequest,
} from '@/lib/pricing-cluster-performance-snapshot';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

  const snapshot = await getStoredPricingClusterPerformanceSnapshot();
  if (!snapshot.report) {
    return NextResponse.json(
      {
        success: false,
        error: 'SNAPSHOT_NOT_FOUND',
        refresh: snapshot.refresh,
      },
      { status: 404 }
    );
  }

  const format = String(request.nextUrl.searchParams.get('format') || 'json').trim();
  if (format === 'summary') {
    return new NextResponse(snapshot.summaryMarkdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  }

  return NextResponse.json({
    success: true,
    report: snapshot.report,
    summaryMarkdown: snapshot.summaryMarkdown,
    refresh: snapshot.refresh,
    storageBackend: 'config',
  });
}
