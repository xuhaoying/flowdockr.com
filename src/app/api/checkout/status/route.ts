import { NextRequest, NextResponse } from 'next/server';

import { getCheckoutStatus } from '@/lib/payments';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const sessionId = String(request.nextUrl.searchParams.get('sessionId') || '').trim();
  const purchaseId = String(request.nextUrl.searchParams.get('purchaseId') || '').trim();

  const status = await getCheckoutStatus({
    sessionId,
    purchaseId,
  });

  // Backward-compat: expose canonical contract while keeping previous fields where useful.
  return NextResponse.json({
    success: status.success,
    status: status.status || 'pending',
    creditsGranted: Boolean(status.creditsGranted),
    creditsAdded: Math.max(0, status.creditsAdded || 0),
    creditsRemaining: status.creditsRemaining,
    supportLevel: status.supportLevel,
    purchasedPlan: status.purchasedPlan,
    error: status.error,
  });
}
