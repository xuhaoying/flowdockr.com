import { eq } from 'drizzle-orm';

import { getUserBillingProfile } from '@/lib/billing';
import { db, purchase, user } from '@/lib/db';
import type { CheckoutStatusResponse, PurchaseStatus } from '@/types/payments';

function normalizePurchaseStatus(status: string): PurchaseStatus {
  if (status === 'paid') {
    return 'paid';
  }
  if (status === 'refunded') {
    return 'refunded';
  }
  if (status === 'canceled' || status === 'cancelled' || status === 'expired') {
    return 'canceled';
  }
  if (status === 'failed' || status === 'payment_failed') {
    return 'failed';
  }
  return 'pending';
}

export async function getCheckoutStatus(params: {
  sessionId?: string;
  purchaseId?: string;
}): Promise<CheckoutStatusResponse> {
  const sessionId = String(params.sessionId || '').trim();
  const purchaseId = String(params.purchaseId || '').trim();

  if (!sessionId && !purchaseId) {
    return {
      success: false,
      error: 'INVALID_INPUT',
    };
  }

  const [record] = sessionId
    ? await db()
        .select({
          id: purchase.id,
          userId: purchase.userId,
          status: purchase.status,
          creditsGranted: purchase.creditsGranted,
        })
        .from(purchase)
        .where(eq(purchase.stripeCheckoutSessionId, sessionId))
        .limit(1)
    : await db()
        .select({
          id: purchase.id,
          userId: purchase.userId,
          status: purchase.status,
          creditsGranted: purchase.creditsGranted,
        })
        .from(purchase)
        .where(eq(purchase.id, purchaseId))
        .limit(1);

  if (!record) {
    return {
      success: true,
      status: 'pending',
      creditsGranted: false,
      creditsAdded: 0,
    };
  }

  const normalizedStatus = normalizePurchaseStatus(record.status);
  const creditsGranted = record.creditsGranted > 0;
  const creditsAdded = Math.max(0, record.creditsGranted || 0);

  let creditsRemaining: number | undefined;
  let supportLevel: CheckoutStatusResponse['supportLevel'];
  let purchasedPlan: string | undefined;
  if (record.userId) {
    const [balance] = await db()
      .select({
        creditsBalance: user.creditsBalance,
      })
      .from(user)
      .where(eq(user.id, record.userId))
      .limit(1);

    creditsRemaining = Math.max(0, balance?.creditsBalance || 0);

    const billingProfile = await getUserBillingProfile(record.userId);
    supportLevel = billingProfile.supportLevel;
    purchasedPlan = billingProfile.purchasedPlan;
  }

  return {
    success: true,
    status: normalizedStatus,
    creditsGranted,
    creditsAdded,
    creditsRemaining,
    supportLevel,
    purchasedPlan,
  };
}
