import { and, eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

import { getAnonymousSessionIdFromRequest } from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { anonymousLinkSession, db } from '@/lib/db';
import {
  attachStripeSessionToPurchase,
  createCheckoutSession as createStripeCheckoutSession,
  markPurchaseFailed,
  createPendingPurchase,
  getCreditPack,
} from '@/lib/payments';
import { checkoutSchema } from '@/lib/validators';
import { getUuid } from '@/shared/lib/hash';

export type CreateCheckoutSessionResult =
  | {
      success: true;
      ok: true;
      checkoutUrl: string;
      purchaseId: string;
      sessionId: string;
    }
  | {
      success: false;
      ok: false;
      message: string;
      status: number;
      error:
        | 'INVALID_INPUT'
        | 'UNAUTHORIZED'
        | 'INVALID_PACK'
        | 'CHECKOUT_SESSION_CREATE_FAILED';
    };

export async function createCheckoutSession(
  request: NextRequest
): Promise<CreateCheckoutSessionResult> {
  const body = (await request.json()) as unknown;
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return {
      success: false,
      ok: false,
      message: parsed.error.issues[0]?.message || 'Invalid checkout input.',
      status: 400,
      error: 'INVALID_INPUT',
    };
  }

  const currentUser = await getCurrentUser();
  if (!currentUser?.id || !currentUser.email) {
    return {
      success: false,
      ok: false,
      message: 'Sign in to purchase credits.',
      status: 401,
      error: 'UNAUTHORIZED',
    };
  }

  const input = parsed.data;
  const pack = getCreditPack(input.packageId);
  if (!pack) {
    return {
      success: false,
      ok: false,
      message: 'Invalid credit pack.',
      status: 400,
      error: 'INVALID_PACK',
    };
  }

  const anonymousSessionId =
    input.anonymousSessionId || getAnonymousSessionIdFromRequest(request) || '';
  const returnTo = sanitizeReturnPath(input.returnTo, request);
  const scenarioSlug = input.scenarioSlug || '';

  const email = currentUser.email.trim().toLowerCase();
  const pendingPurchase = await createPendingPurchase({
    userId: currentUser.id,
    email,
    packCode: pack.code,
    credits: pack.credits,
    amountCents: pack.priceCents,
    currency: pack.currency,
    returnTo,
    scenarioSlug,
    anonymousSessionId,
  });

  try {
    const session = await createStripeCheckoutSession({
      userId: currentUser.id,
      userEmail: email,
      purchaseId: pendingPurchase.id,
      pack,
      appOrigin: request.nextUrl.origin,
      returnTo,
      scenarioSlug,
      anonymousSessionId,
    });

    await attachStripeSessionToPurchase({
      purchaseId: pendingPurchase.id,
      stripeCheckoutSessionId: session.sessionId,
      metadata: {
        purchaseId: pendingPurchase.id,
        packageId: pack.code,
        scenarioSlug,
        returnTo,
        anonymousSessionId,
        credits: pack.credits,
        sessionId: session.sessionId,
        source: 'flowdockr_checkout',
      },
    });

    if (anonymousSessionId) {
      const [existingLink] = await db()
        .select({ id: anonymousLinkSession.id })
        .from(anonymousLinkSession)
        .where(
          and(
            eq(anonymousLinkSession.userId, currentUser.id),
            eq(anonymousLinkSession.anonymousSessionId, anonymousSessionId)
          )
        )
        .limit(1);

      if (!existingLink) {
        await db().insert(anonymousLinkSession).values({
          id: getUuid(),
          userId: currentUser.id,
          anonymousSessionId,
        });
      }
    }

    return {
      success: true,
      ok: true,
      checkoutUrl: session.checkoutUrl,
      purchaseId: pendingPurchase.id,
      sessionId: session.sessionId,
    };
  } catch (error) {
    await markPurchaseFailed(pendingPurchase.id);

    return {
      success: false,
      ok: false,
      message:
        error instanceof Error ? error.message : 'Failed to create checkout session.',
      status: 500,
      error: 'CHECKOUT_SESSION_CREATE_FAILED',
    };
  }
}

function sanitizeReturnPath(value: string | undefined, request: NextRequest): string {
  if (!value) {
    return '/pricing';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '/pricing';
  }

  try {
    const parsed = new URL(trimmed, request.nextUrl.origin);
    if (parsed.origin !== request.nextUrl.origin) {
      return '/pricing';
    }

    return `${parsed.pathname}${parsed.search}` || '/pricing';
  } catch {
    return '/pricing';
  }
}
