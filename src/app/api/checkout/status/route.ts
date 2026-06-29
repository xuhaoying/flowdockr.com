import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getCheckoutStatus } from '@/lib/payments';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const sessionId = String(
    request.nextUrl.searchParams.get('sessionId') || ''
  ).trim();
  const purchaseId = String(
    request.nextUrl.searchParams.get('purchaseId') || ''
  ).trim();

  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return NextResponse.json(
      {
        success: false,
        status: 'pending',
        creditsGranted: false,
        creditsAdded: 0,
        error: 'UNAUTHORIZED',
      },
      { status: 401 }
    );
  }

  const status = await getCheckoutStatus({
    sessionId,
    purchaseId,
    userId: currentUser.id,
  });

  const responseStatus = status.error === 'FORBIDDEN' ? 403 : 200;

  // Backward-compat: expose canonical contract while keeping previous fields where useful.
  return NextResponse.json(
    {
      success: status.success,
      status: status.status || 'pending',
      creditsGranted: Boolean(status.creditsGranted),
      creditsAdded: Math.max(0, status.creditsAdded || 0),
      creditsRemaining: status.creditsRemaining,
      supportLevel: status.supportLevel,
      purchasedPlan: status.purchasedPlan,
      pricingAttribution: status.pricingAttribution,
      error: status.error,
    },
    { status: responseStatus }
  );
}
