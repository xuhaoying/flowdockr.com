import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db, anonymousLinkSession, creditTransaction, purchase, user } from '@/lib/db';
import { getCreditPackageById } from '@/lib/credits';
import { sendMagicLink } from '@/lib/magic-link';
import { getStripeClient, getStripeWebhookSecret } from '@/lib/stripe';
import { getUuid } from '@/shared/lib/hash';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  try {
    const stripe = await getStripeClient();
    const webhookSecret = await getStripeWebhookSecret();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await db()
        .update(purchase)
        .set({ status: 'payment_failed' })
        .where(eq(purchase.stripePaymentIntentId, paymentIntent.id));
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      await db()
        .update(purchase)
        .set({ status: 'expired' })
        .where(eq(purchase.stripeCheckoutSessionId, session.id));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handler failed.';
    return new NextResponse(message, { status: 400 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const existingPurchase = await findPurchaseBySessionId(session.id);
  if (existingPurchase) {
    return;
  }

  const email = (session.customer_details?.email || session.customer_email || '')
    .trim()
    .toLowerCase();
  if (!email) {
    throw new Error('Missing customer email in checkout session.');
  }

  const packageId = String(session.metadata?.packageId || '').trim();
  const pack = getCreditPackageById(packageId);
  if (!pack) {
    throw new Error('Invalid package metadata.');
  }

  const userIdFromMetadata = String(session.client_reference_id || '').trim();
  const anonymousSessionId = String(session.metadata?.anonymousSessionId || '').trim();
  const scenarioSlug = String(session.metadata?.scenarioSlug || '').trim();
  const returnTo = String(session.metadata?.returnTo || '').trim();
  const stripeCustomerId =
    typeof session.customer === 'string' ? session.customer : null;
  const stripePaymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : null;

  let account: { id: string; email: string } | null = null;

  try {
    account = await db().transaction(async (tx: any) => {
      const existing = await tx
        .select({
          id: purchase.id,
        })
        .from(purchase)
        .where(eq(purchase.stripeCheckoutSessionId, session.id))
        .limit(1);

      if (existing.length > 0) {
        return null;
      }

      const userById =
        userIdFromMetadata
          ? await tx
              .select()
              .from(user)
              .where(eq(user.id, userIdFromMetadata))
              .limit(1)
          : [];
      const userByEmail = await tx
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

      let foundUser = userById[0] || userByEmail[0] || null;
      if (!foundUser) {
        const fallbackName = email.split('@')[0] || 'Flowdockr User';
        await tx
          .insert(user)
          .values({
            id: getUuid(),
            name: fallbackName.slice(0, 80),
            email,
            emailVerified: false,
            creditsBalance: 0,
            magicLinkEnabled: true,
          })
          .onConflictDoNothing({
            target: user.email,
          });

        const [createdOrExisting] = await tx
          .select()
          .from(user)
          .where(eq(user.email, email))
          .limit(1);

        foundUser = createdOrExisting || null;
      }

      if (!foundUser) {
        throw new Error('Failed to resolve user for checkout.');
      }

      const currentBalance = foundUser.creditsBalance || 0;
      const newBalance = currentBalance + pack.credits;

      await tx
        .update(user)
        .set({
          creditsBalance: newBalance,
          stripeCustomerId: foundUser.stripeCustomerId || stripeCustomerId,
        })
        .where(eq(user.id, foundUser.id));

      const [createdPurchase] = await tx
        .insert(purchase)
        .values({
          id: getUuid(),
          userId: foundUser.id,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId,
          stripeCustomerId,
          email,
          packageId: pack.id,
          creditsGranted: pack.credits,
          amountUsdCents: pack.priceUsdCents,
          currency: 'usd',
          status: 'paid',
          metadata: JSON.stringify({
            packageId: pack.id,
            scenarioSlug,
            returnTo,
            anonymousSessionId,
            stripeSessionMetadata: session.metadata || {},
          }),
        })
        .returning();

      await tx.insert(creditTransaction).values({
        id: getUuid(),
        userId: foundUser.id,
        type: 'credit_purchase',
        amount: pack.credits,
        balanceAfter: newBalance,
        reason: `Purchased ${pack.name}`,
        purchaseId: createdPurchase.id,
        metadata: JSON.stringify({
          packageId: pack.id,
          stripeCheckoutSessionId: session.id,
        }),
      });

      if (anonymousSessionId) {
        const [existingLink] = await tx
          .select({ id: anonymousLinkSession.id })
          .from(anonymousLinkSession)
          .where(
            and(
              eq(anonymousLinkSession.userId, foundUser.id),
              eq(anonymousLinkSession.anonymousSessionId, anonymousSessionId)
            )
          )
          .limit(1);

        if (!existingLink) {
          await tx.insert(anonymousLinkSession).values({
            id: getUuid(),
            userId: foundUser.id,
            anonymousSessionId,
          });
        }
      }

      return {
        id: foundUser.id,
        email: foundUser.email,
      };
    });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';
    if (
      message.includes('duplicate key') ||
      message.includes('stripe_checkout_session_id')
    ) {
      return;
    }

    throw error;
  }

  if (!account?.email) {
    return;
  }

  try {
    await sendMagicLink(account.email, returnTo || undefined);
  } catch (error) {
    console.error('Failed to send magic link after checkout:', error);
  }
}

async function findPurchaseBySessionId(sessionId: string) {
  const [existingPurchase] = await db()
    .select({
      id: purchase.id,
    })
    .from(purchase)
    .where(eq(purchase.stripeCheckoutSessionId, sessionId))
    .limit(1);

  return existingPurchase || null;
}
