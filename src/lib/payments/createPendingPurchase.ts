import { db, purchase } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

export async function createPendingPurchase(params: {
  userId: string;
  email: string;
  packCode: string;
  credits: number;
  amountCents: number;
  currency: string;
  returnTo?: string;
  scenarioSlug?: string;
  anonymousSessionId?: string;
}): Promise<{ id: string }> {
  const {
    userId,
    email,
    packCode,
    credits,
    amountCents,
    currency,
    returnTo = '',
    scenarioSlug = '',
    anonymousSessionId = '',
  } = params;

  const purchaseId = getUuid();
  const provisionalSessionId = `pending_${purchaseId}`;

  await db().insert(purchase).values({
    id: purchaseId,
    userId,
    stripeCheckoutSessionId: provisionalSessionId,
    stripePaymentIntentId: null,
    stripeCustomerId: null,
    email,
    packageId: packCode,
    creditsGranted: 0,
    amountUsdCents: amountCents,
    currency,
    status: 'pending',
    metadata: JSON.stringify({
      purchaseId,
      packageId: packCode,
      credits,
      scenarioSlug,
      returnTo,
      anonymousSessionId,
      source: 'flowdockr_checkout',
    }),
  });

  return { id: purchaseId };
}
