import { eq, sql } from 'drizzle-orm';

import {
  getFeatureEntitlements,
  getHigherSupportLevel,
} from '@/config/creditPacks';
import {
  db,
  featureEntitlement,
  purchase,
  user,
  userBillingState,
} from '@/lib/db';
import type {
  BillingProfile,
  BillingSupportLevel,
  CreditPackCode,
  FeatureEntitlements,
} from '@/types/billing';

type TxLike = ReturnType<typeof db> | any;

const DEFAULT_SUPPORT_LEVEL: BillingSupportLevel = 'free';
const DEFAULT_PURCHASED_PLAN = 'free_trial';

export function getDefaultBillingProfile(): BillingProfile {
  return {
    creditsRemaining: 0,
    creditsTotal: 0,
    supportLevel: DEFAULT_SUPPORT_LEVEL,
    purchasedPlan: DEFAULT_PURCHASED_PLAN,
    entitlements: getFeatureEntitlements(DEFAULT_SUPPORT_LEVEL),
  };
}

export async function getUserBillingProfile(userId: string): Promise<BillingProfile> {
  const normalizedUserId = String(userId || '').trim();
  if (!normalizedUserId) {
    return getDefaultBillingProfile();
  }

  return db().transaction(async (tx: TxLike) => ensureUserBillingProfileTx(tx, normalizedUserId));
}

export async function ensureUserBillingProfileTx(
  tx: TxLike,
  userId: string
): Promise<BillingProfile> {
  const normalizedUserId = String(userId || '').trim();
  if (!normalizedUserId) {
    return getDefaultBillingProfile();
  }

  const [stateRow] = await tx
    .select({
      creditsRemaining: userBillingState.creditsRemaining,
      creditsTotal: userBillingState.creditsTotal,
      supportLevel: userBillingState.supportLevel,
      purchasedPlan: userBillingState.purchasedPlan,
    })
    .from(userBillingState)
    .where(eq(userBillingState.userId, normalizedUserId))
    .limit(1);

  if (!stateRow) {
    const inferredState = await inferLegacyBillingState(tx, normalizedUserId);
    await upsertUserBillingStateTx(tx, {
      userId: normalizedUserId,
      creditsRemaining: inferredState.creditsRemaining,
      creditsTotal: inferredState.creditsTotal,
      supportLevel: inferredState.supportLevel,
      purchasedPlan: inferredState.purchasedPlan,
    });
    await upsertFeatureEntitlementsTx(tx, normalizedUserId, inferredState.supportLevel);

    return {
      ...inferredState,
      entitlements: getFeatureEntitlements(inferredState.supportLevel),
    };
  }

  const supportLevel = normalizeSupportLevel(stateRow.supportLevel);
  const creditsRemaining = Math.max(0, Number(stateRow.creditsRemaining || 0));
  const creditsTotal = Math.max(creditsRemaining, Number(stateRow.creditsTotal || 0));
  const purchasedPlan = String(stateRow.purchasedPlan || DEFAULT_PURCHASED_PLAN);
  const entitlements = await ensureFeatureEntitlementsTx(
    tx,
    normalizedUserId,
    supportLevel
  );

  if (creditsTotal !== Number(stateRow.creditsTotal || 0)) {
    await upsertUserBillingStateTx(tx, {
      userId: normalizedUserId,
      creditsRemaining,
      creditsTotal,
      supportLevel,
      purchasedPlan,
    });
  }

  return {
    creditsRemaining,
    creditsTotal,
    supportLevel,
    purchasedPlan,
    entitlements,
  };
}

export async function syncBillingStateCreditsTx(
  tx: TxLike,
  userId: string,
  creditsRemaining: number
): Promise<BillingProfile> {
  const profile = await ensureUserBillingProfileTx(tx, userId);
  const nextCreditsRemaining = Math.max(0, creditsRemaining);
  const nextCreditsTotal = Math.max(profile.creditsTotal, nextCreditsRemaining);

  await upsertUserBillingStateTx(tx, {
    userId,
    creditsRemaining: nextCreditsRemaining,
    creditsTotal: nextCreditsTotal,
    supportLevel: profile.supportLevel,
    purchasedPlan: profile.purchasedPlan,
  });

  return {
    ...profile,
    creditsRemaining: nextCreditsRemaining,
    creditsTotal: nextCreditsTotal,
  };
}

export async function applyPackPurchaseToBillingTx(
  tx: TxLike,
  params: {
    userId: string;
    purchasedPlan: CreditPackCode;
    supportLevel: Exclude<BillingSupportLevel, 'free'>;
    creditsAdded: number;
    creditsRemaining: number;
  }
): Promise<BillingProfile> {
  const { userId, purchasedPlan, supportLevel, creditsAdded, creditsRemaining } = params;
  const [existingState] = await tx
    .select({
      creditsRemaining: userBillingState.creditsRemaining,
      creditsTotal: userBillingState.creditsTotal,
      supportLevel: userBillingState.supportLevel,
      purchasedPlan: userBillingState.purchasedPlan,
    })
    .from(userBillingState)
    .where(eq(userBillingState.userId, userId))
    .limit(1);

  const previousBalance = Math.max(0, creditsRemaining - Math.max(0, creditsAdded));
  const [purchaseSummary] = existingState
    ? [{ totalCreditsGranted: Number(existingState.creditsTotal || 0) }]
    : await tx
        .select({
          totalCreditsGranted: sql<number>`coalesce(sum(${purchase.creditsGranted}), 0)`,
        })
        .from(purchase)
        .where(eq(purchase.userId, userId));

  const current: BillingProfile = existingState
    ? {
        creditsRemaining: Math.max(0, Number(existingState.creditsRemaining || 0)),
        creditsTotal: Math.max(0, Number(existingState.creditsTotal || 0)),
        supportLevel: normalizeSupportLevel(existingState.supportLevel),
        purchasedPlan: String(existingState.purchasedPlan || DEFAULT_PURCHASED_PLAN),
        entitlements: getFeatureEntitlements(
          normalizeSupportLevel(existingState.supportLevel)
        ),
      }
    : {
        creditsRemaining: previousBalance,
        creditsTotal: Math.max(
          previousBalance,
          Number(purchaseSummary?.totalCreditsGranted || 0)
        ),
        supportLevel:
          previousBalance > 0 || Number(purchaseSummary?.totalCreditsGranted || 0) > 0
            ? 'pro'
            : 'free',
        purchasedPlan:
          previousBalance > 0 || Number(purchaseSummary?.totalCreditsGranted || 0) > 0
            ? 'legacy_paid'
            : DEFAULT_PURCHASED_PLAN,
        entitlements: getFeatureEntitlements(
          previousBalance > 0 || Number(purchaseSummary?.totalCreditsGranted || 0) > 0
            ? 'pro'
            : 'free'
        ),
      };

  const effectiveSupportLevel = getHigherSupportLevel(current.supportLevel, supportLevel);
  const effectivePurchasedPlan =
    effectiveSupportLevel === supportLevel ? purchasedPlan : current.purchasedPlan;
  const nextCreditsRemaining = Math.max(0, creditsRemaining);
  const nextCreditsTotal = Math.max(
    nextCreditsRemaining,
    current.creditsTotal + Math.max(0, creditsAdded)
  );

  await upsertUserBillingStateTx(tx, {
    userId,
    creditsRemaining: nextCreditsRemaining,
    creditsTotal: nextCreditsTotal,
    supportLevel: effectiveSupportLevel,
    purchasedPlan: effectivePurchasedPlan,
  });

  const entitlements = await upsertFeatureEntitlementsTx(
    tx,
    userId,
    effectiveSupportLevel
  );

  return {
    creditsRemaining: nextCreditsRemaining,
    creditsTotal: nextCreditsTotal,
    supportLevel: effectiveSupportLevel,
    purchasedPlan: effectivePurchasedPlan,
    entitlements,
  };
}

async function inferLegacyBillingState(
  tx: TxLike,
  userId: string
): Promise<Omit<BillingProfile, 'entitlements'>> {
  const [userRow] = await tx
    .select({
      creditsBalance: user.creditsBalance,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  const [purchaseSummary] = await tx
    .select({
      totalCreditsGranted: sql<number>`coalesce(sum(${purchase.creditsGranted}), 0)`,
    })
    .from(purchase)
    .where(eq(purchase.userId, userId));

  const creditsRemaining = Math.max(0, Number(userRow?.creditsBalance || 0));
  const creditsGranted = Math.max(0, Number(purchaseSummary?.totalCreditsGranted || 0));
  const hasLegacyPaidAccess = creditsRemaining > 0 || creditsGranted > 0;

  const supportLevel: BillingSupportLevel = hasLegacyPaidAccess ? 'pro' : 'free';
  const purchasedPlan = hasLegacyPaidAccess ? 'legacy_paid' : DEFAULT_PURCHASED_PLAN;

  return {
    creditsRemaining,
    creditsTotal: Math.max(creditsRemaining, creditsGranted),
    supportLevel,
    purchasedPlan,
  };
}

async function ensureFeatureEntitlementsTx(
  tx: TxLike,
  userId: string,
  supportLevel: BillingSupportLevel
): Promise<FeatureEntitlements> {
  const [row] = await tx
    .select({
      multiVersionEnabled: featureEntitlement.multiVersionEnabled,
      strategyExplanationEnabled: featureEntitlement.strategyExplanationEnabled,
      riskAlertEnabled: featureEntitlement.riskAlertEnabled,
      historyEnabled: featureEntitlement.historyEnabled,
      followUpEnabled: featureEntitlement.followUpEnabled,
      advancedModesEnabled: featureEntitlement.advancedModesEnabled,
    })
    .from(featureEntitlement)
    .where(eq(featureEntitlement.userId, userId))
    .limit(1);

  const expected = getFeatureEntitlements(supportLevel);
  if (!row || !entitlementsMatchRow(row, expected)) {
    return upsertFeatureEntitlementsTx(tx, userId, supportLevel);
  }

  return expected;
}

async function upsertFeatureEntitlementsTx(
  tx: TxLike,
  userId: string,
  supportLevel: BillingSupportLevel
): Promise<FeatureEntitlements> {
  const entitlements = getFeatureEntitlements(supportLevel);

  await tx
    .insert(featureEntitlement)
    .values({
      userId,
      multiVersionEnabled: entitlements.multiVersionEnabled,
      strategyExplanationEnabled: entitlements.strategyExplanationEnabled,
      riskAlertEnabled: entitlements.riskAlertEnabled,
      historyEnabled: entitlements.historyEnabled,
      followUpEnabled: entitlements.followUpEnabled,
      advancedModesEnabled: entitlements.advancedModesEnabled,
    })
    .onConflictDoUpdate({
      target: featureEntitlement.userId,
      set: {
        multiVersionEnabled: entitlements.multiVersionEnabled,
        strategyExplanationEnabled: entitlements.strategyExplanationEnabled,
        riskAlertEnabled: entitlements.riskAlertEnabled,
        historyEnabled: entitlements.historyEnabled,
        followUpEnabled: entitlements.followUpEnabled,
        advancedModesEnabled: entitlements.advancedModesEnabled,
        updatedAt: new Date(),
      },
    });

  return entitlements;
}

async function upsertUserBillingStateTx(
  tx: TxLike,
  params: {
    userId: string;
    creditsRemaining: number;
    creditsTotal: number;
    supportLevel: BillingSupportLevel;
    purchasedPlan: string;
  }
) {
  await tx
    .insert(userBillingState)
    .values({
      userId: params.userId,
      creditsRemaining: Math.max(0, params.creditsRemaining),
      creditsTotal: Math.max(0, params.creditsTotal),
      supportLevel: params.supportLevel,
      purchasedPlan: params.purchasedPlan || DEFAULT_PURCHASED_PLAN,
    })
    .onConflictDoUpdate({
      target: userBillingState.userId,
      set: {
        creditsRemaining: Math.max(0, params.creditsRemaining),
        creditsTotal: Math.max(0, params.creditsTotal),
        supportLevel: params.supportLevel,
        purchasedPlan: params.purchasedPlan || DEFAULT_PURCHASED_PLAN,
        updatedAt: new Date(),
      },
    });
}

function normalizeSupportLevel(value: string | null | undefined): BillingSupportLevel {
  const raw = String(value || '').trim();
  if (raw === 'quick_help' || raw === 'pro' || raw === 'studio') {
    return raw;
  }
  return 'free';
}

function entitlementsMatchRow(
  row: Partial<FeatureEntitlements>,
  expected: FeatureEntitlements
): boolean {
  return (
    Boolean(row.multiVersionEnabled) === expected.multiVersionEnabled &&
    Boolean(row.strategyExplanationEnabled) === expected.strategyExplanationEnabled &&
    Boolean(row.riskAlertEnabled) === expected.riskAlertEnabled &&
    Boolean(row.historyEnabled) === expected.historyEnabled &&
    Boolean(row.followUpEnabled) === expected.followUpEnabled &&
    Boolean(row.advancedModesEnabled) === expected.advancedModesEnabled
  );
}
