import { syncBillingStateCreditsTx } from '@/lib/billing';
import { creditTransaction, db, user } from '@/lib/db';
import { eq } from 'drizzle-orm';

import { getUuid } from '@/shared/lib/hash';

export async function consumeCredit(params: {
  userId: string;
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  amount?: number;
  reason?: string;
}): Promise<number> {
  const { userId, scenarioSlug, sourcePage } = params;
  const amount = Math.max(1, Math.floor(params.amount || 1));

  return db().transaction(async (tx: any) => {
    const [lockedUser] = await tx
      .select({
        id: user.id,
        creditsBalance: user.creditsBalance,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1)
      .for('update');

    if (!lockedUser || lockedUser.creditsBalance < amount) {
      throw new Error('NO_CREDITS');
    }

    const nextCredits = lockedUser.creditsBalance - amount;

    const updateResult = await tx
      .update(user)
      .set({
        creditsBalance: nextCredits,
      })
      .where(eq(user.id, userId))
      .returning({ id: user.id });

    if (updateResult.length === 0) {
      throw new Error('NO_CREDITS');
    }

    await tx.insert(creditTransaction).values({
      id: getUuid(),
      userId,
      type: 'generation_charge',
      amount: -amount,
      balanceAfter: nextCredits,
      reason: params.reason || 'Negotiation reply generation',
      metadata: JSON.stringify({
        scenarioSlug,
        source: sourcePage,
        amount,
      }),
    });

    await syncBillingStateCreditsTx(tx, userId, nextCredits);

    return nextCredits;
  });
}
