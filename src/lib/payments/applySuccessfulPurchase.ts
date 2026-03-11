import { and, eq } from 'drizzle-orm';

import { creditPacks } from '@/config/creditPacks';
import { applyPackPurchaseToBillingTx } from '@/lib/billing';
import {
  anonymousLinkSession,
  creditTransaction,
  db,
  purchase,
  user,
} from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

type ApplySuccessfulPurchaseParams = {
  stripeEventId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  stripeEventType?: string;
  purchaseIdHint?: string;
  customerEmail?: string;
  metadata?: Record<string, string | undefined>;
};

type ApplySuccessfulPurchaseResult = {
  applied: boolean;
  userId: string;
  creditsAdded: number;
  creditsRemaining: number;
  purchaseId: string;
};

export async function applySuccessfulPurchase(
  params: ApplySuccessfulPurchaseParams
): Promise<ApplySuccessfulPurchaseResult> {
  const {
    stripeEventId,
    stripeCheckoutSessionId,
    stripePaymentIntentId,
    stripeCustomerId,
    stripeEventType = 'checkout.session.completed',
    purchaseIdHint = '',
    customerEmail = '',
    metadata = {},
  } = params;

  return db().transaction(async (tx: any) => {
    const targetPurchase = await findPurchase(tx, {
      purchaseIdHint,
      stripeCheckoutSessionId,
    });
    if (!targetPurchase) {
      throw new Error('PURCHASE_NOT_FOUND');
    }

    const pack = creditPacks.find((item) => item.code === targetPurchase.packageId);
    if (!pack) {
      throw new Error(`INVALID_PACK:${targetPurchase.packageId}`);
    }

    if (targetPurchase.creditsGranted > 0 || targetPurchase.status === 'paid') {
      const resolvedUserId = targetPurchase.userId || '';
      const creditsRemaining = resolvedUserId
        ? await getUserBalance(tx, resolvedUserId)
        : 0;

      await tx
        .update(purchase)
        .set({
          status: 'paid',
          stripeCheckoutSessionId,
          stripePaymentIntentId:
            stripePaymentIntentId || targetPurchase.stripePaymentIntentId,
          stripeCustomerId: stripeCustomerId || targetPurchase.stripeCustomerId,
          metadata: buildMergedMetadata(targetPurchase.metadata, {
            stripeEventId,
            stripeEventType,
          }),
        })
        .where(eq(purchase.id, targetPurchase.id));

      return {
        applied: false,
        userId: resolvedUserId,
        creditsAdded: 0,
        creditsRemaining,
        purchaseId: targetPurchase.id,
      };
    }

    const resolvedUser = await resolvePurchaseUser(tx, {
      purchaseUserId: targetPurchase.userId,
      purchaseEmail: targetPurchase.email,
      customerEmail,
    });

    const [lockedUser] = await tx
      .select({
        id: user.id,
        email: user.email,
        creditsBalance: user.creditsBalance,
        stripeCustomerId: user.stripeCustomerId,
      })
      .from(user)
      .where(eq(user.id, resolvedUser.id))
      .limit(1)
      .for('update');

    if (!lockedUser) {
      throw new Error('PURCHASE_USER_NOT_FOUND');
    }

    const nextBalance = (lockedUser.creditsBalance || 0) + pack.credits;
    await tx
      .update(user)
      .set({
        creditsBalance: nextBalance,
        stripeCustomerId: lockedUser.stripeCustomerId || stripeCustomerId || null,
      })
      .where(eq(user.id, lockedUser.id));

    await tx.insert(creditTransaction).values({
      id: getUuid(),
      userId: lockedUser.id,
      type: 'credit_purchase',
      amount: pack.credits,
      balanceAfter: nextBalance,
      reason: `Stripe Checkout purchase ${pack.code}`,
      purchaseId: targetPurchase.id,
      metadata: JSON.stringify({
        stripeEventId,
        stripeEventType,
        stripeCheckoutSessionId,
        stripePaymentIntentId: stripePaymentIntentId || '',
        packCode: pack.code,
        credits: pack.credits,
        supportLevel: pack.supportLevel,
        support_level: pack.supportLevel,
        planName: pack.name,
        plan_name: pack.name,
        credits_amount: pack.credits,
      }),
    });

    const billingProfile = await applyPackPurchaseToBillingTx(tx, {
      userId: lockedUser.id,
      purchasedPlan: pack.code,
      supportLevel: pack.supportLevel,
      creditsAdded: pack.credits,
      creditsRemaining: nextBalance,
    });

    const mergedMetadata = parseRecord(targetPurchase.metadata);
    const anonymousSessionId = String(
      metadata.anonymousSessionId || mergedMetadata.anonymousSessionId || ''
    ).trim();
    const returnTo = String(metadata.returnTo || mergedMetadata.returnTo || '').trim();
    const normalizedEmail = normalizeEmail(
      targetPurchase.email || customerEmail || lockedUser.email
    );

    await tx
      .update(purchase)
      .set({
        userId: lockedUser.id,
        email: normalizedEmail || lockedUser.email,
        stripeCheckoutSessionId,
        stripePaymentIntentId:
          stripePaymentIntentId || targetPurchase.stripePaymentIntentId,
        stripeCustomerId: stripeCustomerId || targetPurchase.stripeCustomerId,
        creditsGranted: pack.credits,
        status: 'paid',
        metadata: buildMergedMetadata(targetPurchase.metadata, {
          stripeEventId,
          stripeEventType,
          returnTo,
          anonymousSessionId,
          packCode: pack.code,
          credits: pack.credits,
          planName: pack.name,
          plan_name: pack.name,
          supportLevel: billingProfile.supportLevel,
          support_level: billingProfile.supportLevel,
          credits_amount: pack.credits,
        }),
      })
      .where(eq(purchase.id, targetPurchase.id));

    if (anonymousSessionId) {
      const [existingLink] = await tx
        .select({ id: anonymousLinkSession.id })
        .from(anonymousLinkSession)
        .where(
          and(
            eq(anonymousLinkSession.userId, lockedUser.id),
            eq(anonymousLinkSession.anonymousSessionId, anonymousSessionId)
          )
        )
        .limit(1);

      if (!existingLink) {
        await tx.insert(anonymousLinkSession).values({
          id: getUuid(),
          userId: lockedUser.id,
          anonymousSessionId,
        });
      }
    }

    return {
      applied: true,
      userId: lockedUser.id,
      creditsAdded: pack.credits,
      creditsRemaining: nextBalance,
      purchaseId: targetPurchase.id,
    };
  });
}

async function findPurchase(
  tx: any,
  params: { purchaseIdHint: string; stripeCheckoutSessionId: string }
) {
  const { purchaseIdHint, stripeCheckoutSessionId } = params;
  if (purchaseIdHint) {
    const [byId] = await tx
      .select({
        id: purchase.id,
        userId: purchase.userId,
        stripeCheckoutSessionId: purchase.stripeCheckoutSessionId,
        stripePaymentIntentId: purchase.stripePaymentIntentId,
        stripeCustomerId: purchase.stripeCustomerId,
        email: purchase.email,
        packageId: purchase.packageId,
        creditsGranted: purchase.creditsGranted,
        status: purchase.status,
        metadata: purchase.metadata,
      })
      .from(purchase)
      .where(eq(purchase.id, purchaseIdHint))
      .limit(1)
      .for('update');

    if (byId) {
      return byId;
    }
  }

  const [bySession] = await tx
    .select({
      id: purchase.id,
      userId: purchase.userId,
      stripeCheckoutSessionId: purchase.stripeCheckoutSessionId,
      stripePaymentIntentId: purchase.stripePaymentIntentId,
      stripeCustomerId: purchase.stripeCustomerId,
      email: purchase.email,
      packageId: purchase.packageId,
      creditsGranted: purchase.creditsGranted,
      status: purchase.status,
      metadata: purchase.metadata,
    })
    .from(purchase)
    .where(eq(purchase.stripeCheckoutSessionId, stripeCheckoutSessionId))
    .limit(1)
    .for('update');

  return bySession || null;
}

async function resolvePurchaseUser(
  tx: any,
  params: {
    purchaseUserId: string | null;
    purchaseEmail: string;
    customerEmail: string;
  }
) {
  const { purchaseUserId, purchaseEmail, customerEmail } = params;

  if (purchaseUserId) {
    const [existingById] = await tx
      .select({ id: user.id, email: user.email })
      .from(user)
      .where(eq(user.id, purchaseUserId))
      .limit(1);
    if (existingById) {
      return existingById;
    }
  }

  const email = normalizeEmail(purchaseEmail || customerEmail);
  if (!email) {
    throw new Error('PURCHASE_EMAIL_MISSING');
  }

  const [existingByEmail] = await tx
    .select({ id: user.id, email: user.email })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingByEmail) {
    return existingByEmail;
  }

  const fallbackName = (email.split('@')[0] || 'Flowdockr User').slice(0, 80);

  await tx
    .insert(user)
    .values({
      id: getUuid(),
      name: fallbackName || 'Flowdockr User',
      email,
      emailVerified: false,
      creditsBalance: 0,
      magicLinkEnabled: true,
    })
    .onConflictDoNothing({
      target: user.email,
    });

  const [createdOrExisting] = await tx
    .select({ id: user.id, email: user.email })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (!createdOrExisting) {
    throw new Error('PURCHASE_USER_RESOLVE_FAILED');
  }

  return createdOrExisting;
}

async function getUserBalance(tx: any, userId: string): Promise<number> {
  const [row] = await tx
    .select({
      creditsBalance: user.creditsBalance,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return Math.max(0, row?.creditsBalance || 0);
}

function normalizeEmail(value: string | undefined | null): string {
  return String(value || '').trim().toLowerCase();
}

function parseRecord(value: string | null | undefined): Record<string, string> {
  if (!value) {
    return {};
  }
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

function buildMergedMetadata(
  existing: string | null | undefined,
  patch: Record<string, unknown>
): string {
  return JSON.stringify({
    ...parseRecord(existing),
    ...patch,
  });
}
