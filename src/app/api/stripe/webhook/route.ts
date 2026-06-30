import { NextRequest, NextResponse } from 'next/server';
import { db, purchase } from '@/lib/db';
import {
  applySuccessfulPurchase,
  hasProcessedWebhookEvent,
  markWebhookEventProcessed,
} from '@/lib/payments';
import { redeemScenarioPackPurchase } from '@/lib/payments/redeemScenarioPack';
import { verifyWebhookSignature } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

import { getScenarioPackById } from '@/shared/lib/scenario-quota';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await verifyWebhookSignature(rawBody, signature);
  } catch {
    return new NextResponse('Invalid signature', { status: 400 });
  }

  const alreadyProcessed = await hasProcessedWebhookEvent(event.id);
  if (alreadyProcessed) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === 'paid') {
          await applyPaidCheckoutSession(event, session);
        } else {
          await markCheckoutSessionStatus(session, 'pending');
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        await applyPaidCheckoutSession(event, session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await markCheckoutSessionStatus(session, 'failed');
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await markCheckoutSessionStatus(session, 'canceled');
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await markPaymentIntentStatus(paymentIntent.id, 'failed');
        break;
      }

      default:
        break;
    }

    await markWebhookEventProcessed(event, rawBody);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[stripe.webhook] processing failed', {
      eventId: event.id,
      type: event.type,
      error: error instanceof Error ? error.message : 'UNKNOWN',
    });
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}

async function applyPaidCheckoutSession(
  event: Stripe.Event,
  session: Stripe.Checkout.Session
) {
  if (session.metadata?.flowdockr_pack === 'scenario_reply') {
    await redeemScenarioPackFromSession(session);
    return;
  }

  await applySuccessfulPurchase({
    stripeEventId: event.id,
    stripeEventType: event.type,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : undefined,
    stripeCustomerId:
      typeof session.customer === 'string' ? session.customer : undefined,
    purchaseIdHint: String(
      session.metadata?.purchaseId || session.client_reference_id || ''
    ).trim(),
    customerEmail:
      session.customer_details?.email || session.customer_email || undefined,
    metadata: session.metadata || {},
  });
}

async function redeemScenarioPackFromSession(session: Stripe.Checkout.Session) {
  const userId = String(session.metadata?.user_id || '').trim();
  const packId = String(session.metadata?.pack_id || '').trim();
  const pack = getScenarioPackById(packId);

  if (!userId || !pack) {
    throw new Error('INVALID_SCENARIO_PACK_SESSION');
  }

  await redeemScenarioPackPurchase({
    stripeCheckoutSessionId: session.id,
    userId,
    packId: pack.id,
    credits: pack.replies,
    source: 'stripe_webhook',
  });
}

async function markCheckoutSessionStatus(
  session: Stripe.Checkout.Session,
  nextStatus: 'pending' | 'failed' | 'canceled'
) {
  const purchaseIdHint = String(
    session.metadata?.purchaseId || session.client_reference_id || ''
  ).trim();
  const stripePaymentIntentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : null;
  const stripeCustomerId =
    typeof session.customer === 'string' ? session.customer : null;

  await db().transaction(async (tx: any) => {
    const [targetPurchase] = purchaseIdHint
      ? await tx
          .select({
            id: purchase.id,
            status: purchase.status,
            creditsGranted: purchase.creditsGranted,
            stripePaymentIntentId: purchase.stripePaymentIntentId,
            stripeCustomerId: purchase.stripeCustomerId,
          })
          .from(purchase)
          .where(eq(purchase.id, purchaseIdHint))
          .limit(1)
          .for('update')
      : await tx
          .select({
            id: purchase.id,
            status: purchase.status,
            creditsGranted: purchase.creditsGranted,
            stripePaymentIntentId: purchase.stripePaymentIntentId,
            stripeCustomerId: purchase.stripeCustomerId,
          })
          .from(purchase)
          .where(eq(purchase.stripeCheckoutSessionId, session.id))
          .limit(1)
          .for('update');

    if (!targetPurchase) {
      return;
    }

    if (targetPurchase.status === 'paid' || targetPurchase.creditsGranted > 0) {
      return;
    }

    await tx
      .update(purchase)
      .set({
        status: nextStatus,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId:
          stripePaymentIntentId || targetPurchase.stripePaymentIntentId,
        stripeCustomerId: stripeCustomerId || targetPurchase.stripeCustomerId,
      })
      .where(eq(purchase.id, targetPurchase.id));
  });
}

async function markPaymentIntentStatus(
  paymentIntentId: string,
  nextStatus: 'failed' | 'canceled'
) {
  if (!paymentIntentId) {
    return;
  }

  await db().transaction(async (tx: any) => {
    const [targetPurchase] = await tx
      .select({
        id: purchase.id,
        status: purchase.status,
        creditsGranted: purchase.creditsGranted,
      })
      .from(purchase)
      .where(eq(purchase.stripePaymentIntentId, paymentIntentId))
      .limit(1)
      .for('update');

    if (!targetPurchase) {
      return;
    }

    if (targetPurchase.status === 'paid' || targetPurchase.creditsGranted > 0) {
      return;
    }

    await tx
      .update(purchase)
      .set({
        status: nextStatus,
      })
      .where(eq(purchase.id, targetPurchase.id));
  });
}
