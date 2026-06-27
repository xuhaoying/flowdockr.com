import { db, purchase } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getPurchaseBySessionId(sessionId: string) {
  const [record] = await db()
    .select()
    .from(purchase)
    .where(eq(purchase.stripeCheckoutSessionId, sessionId))
    .limit(1);

  return record || null;
}
