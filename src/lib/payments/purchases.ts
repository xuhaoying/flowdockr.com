import { eq } from 'drizzle-orm';

import { db, purchase } from '@/lib/db';

export async function attachStripeSessionToPurchase(params: {
  purchaseId: string;
  stripeCheckoutSessionId: string;
  metadata: Record<string, unknown>;
}): Promise<void> {
  await db()
    .update(purchase)
    .set({
      stripeCheckoutSessionId: params.stripeCheckoutSessionId,
      metadata: JSON.stringify(params.metadata),
    })
    .where(eq(purchase.id, params.purchaseId));
}

export async function markPurchaseFailed(purchaseId: string): Promise<void> {
  await db()
    .update(purchase)
    .set({
      status: 'failed',
    })
    .where(eq(purchase.id, purchaseId));
}
