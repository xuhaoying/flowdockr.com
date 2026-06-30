import { syncBillingStateCreditsTx } from '@/lib/billing';
import { creditTransaction, db, user } from '@/lib/db';
import { eq } from 'drizzle-orm';

import { getUuid } from '@/shared/lib/hash';

type TxLike =
  ReturnType<typeof db> extends { transaction: infer _T } ? any : any;

export async function grantCreditsTx(
  tx: TxLike,
  params: {
    userId: string;
    credits: number;
    reason: string;
    type?: string;
    purchaseId?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<number> {
  if (params.credits <= 0) {
    throw new Error('credits must be greater than zero');
  }

  const [lockedUser] = await tx
    .select({
      id: user.id,
      creditsBalance: user.creditsBalance,
    })
    .from(user)
    .where(eq(user.id, params.userId))
    .limit(1)
    .for('update');

  if (!lockedUser) {
    throw new Error('USER_NOT_FOUND');
  }

  const nextBalance = (lockedUser.creditsBalance || 0) + params.credits;

  await tx
    .update(user)
    .set({
      creditsBalance: nextBalance,
    })
    .where(eq(user.id, params.userId));

  await tx.insert(creditTransaction).values({
    id: getUuid(),
    userId: params.userId,
    type: params.type || 'manual_credit_grant',
    amount: params.credits,
    balanceAfter: nextBalance,
    reason: params.reason,
    purchaseId: params.purchaseId,
    metadata: JSON.stringify(params.metadata || {}),
  });

  await syncBillingStateCreditsTx(tx, params.userId, nextBalance);

  return nextBalance;
}

export async function grantCredits(params: {
  userId: string;
  credits: number;
  reason: string;
  type?: string;
  purchaseId?: string;
  metadata?: Record<string, unknown>;
}): Promise<number> {
  return db().transaction((tx: TxLike) => grantCreditsTx(tx, params));
}
