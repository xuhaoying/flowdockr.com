import { grantCreditsTx } from '@/lib/credits';
import { credit, db, scenarioPackRedemption } from '@/lib/db';

import { getSnowId, getUuid } from '@/shared/lib/hash';
import {
  CreditStatus,
  CreditTransactionScene,
  CreditTransactionType,
} from '@/shared/models/credit';
import { findUserById } from '@/shared/models/user';

export async function redeemScenarioPackPurchase(params: {
  stripeCheckoutSessionId: string;
  userId: string;
  packId: string;
  credits: number;
  source: 'scenario_pack_confirm' | 'stripe_webhook';
}) {
  const dbUser = await findUserById(params.userId);
  if (!dbUser) {
    throw new Error('SCENARIO_PACK_USER_NOT_FOUND');
  }

  const creditId = getUuid();

  await db().transaction(async (tx: any) => {
    const [redemption] = await tx
      .insert(scenarioPackRedemption)
      .values({
        id: getUuid(),
        stripeCheckoutSessionId: params.stripeCheckoutSessionId,
        userId: dbUser.id,
        packId: params.packId,
        creditsGranted: params.credits,
        creditId,
      })
      .onConflictDoNothing({
        target: scenarioPackRedemption.stripeCheckoutSessionId,
      })
      .returning({ id: scenarioPackRedemption.id });

    if (!redemption) {
      return;
    }

    await tx.insert(credit).values({
      id: creditId,
      userId: dbUser.id,
      userEmail: dbUser.email || '',
      orderNo: params.stripeCheckoutSessionId,
      subscriptionNo: '',
      transactionNo: getSnowId(),
      transactionType: CreditTransactionType.GRANT,
      transactionScene: CreditTransactionScene.PAYMENT,
      credits: params.credits,
      remainingCredits: params.credits,
      description: `scenario reply credits pack: ${params.packId}`,
      expiresAt: null,
      status: CreditStatus.ACTIVE,
      metadata: JSON.stringify({
        source: params.source,
        stripeCheckoutSessionId: params.stripeCheckoutSessionId,
        packId: params.packId,
      }),
    });

    await grantCreditsTx(tx, {
      userId: dbUser.id,
      credits: params.credits,
      type: 'scenario_pack_purchase',
      reason: `Scenario reply credits pack: ${params.packId}`,
      metadata: {
        source: params.source,
        stripeCheckoutSessionId: params.stripeCheckoutSessionId,
        packId: params.packId,
        legacyCreditId: creditId,
      },
    });
  });
}
