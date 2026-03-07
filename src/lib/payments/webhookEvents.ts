import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

import { db, webhookEvent } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

export async function hasProcessedWebhookEvent(stripeEventId: string): Promise<boolean> {
  const [existing] = await db()
    .select({
      processed: webhookEvent.processed,
    })
    .from(webhookEvent)
    .where(eq(webhookEvent.stripeEventId, stripeEventId))
    .limit(1);

  return Boolean(existing?.processed);
}

export async function markWebhookEventProcessed(
  event: Stripe.Event,
  rawPayload: string
): Promise<void> {
  const safePayload =
    rawPayload.length > 20_000 ? `${rawPayload.slice(0, 20_000)}...` : rawPayload;

  await db()
    .insert(webhookEvent)
    .values({
      id: getUuid(),
      stripeEventId: event.id,
      type: event.type,
      processed: true,
      processedAt: new Date(),
      payload: safePayload,
    })
    .onConflictDoUpdate({
      target: webhookEvent.stripeEventId,
      set: {
        type: event.type,
        processed: true,
        processedAt: new Date(),
        payload: safePayload,
      },
    });
}
