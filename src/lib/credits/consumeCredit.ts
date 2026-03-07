import { eq } from 'drizzle-orm';

import { db, creditTransaction, user } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

export async function consumeCredit(params: {
  userId: string;
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
}): Promise<number> {
  const { userId, scenarioSlug, sourcePage } = params;

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

    if (!lockedUser || lockedUser.creditsBalance <= 0) {
      throw new Error('NO_CREDITS');
    }

    const nextCredits = lockedUser.creditsBalance - 1;

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
      amount: -1,
      balanceAfter: nextCredits,
      reason: 'Negotiation reply generation',
      metadata: JSON.stringify({
        scenarioSlug,
        source: sourcePage,
      }),
    });

    return nextCredits;
  });
}
