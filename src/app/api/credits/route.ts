import { NextRequest, NextResponse } from 'next/server';

import {
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
} from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { getDefaultBillingProfile, getUserBillingProfile } from '@/lib/billing';
import { getUserFreeRepliesRemaining } from '@/lib/credits';

const FREE_GENERATION_LIMIT = 2;

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const billingProfile = await getUserBillingProfile(currentUser.id);
      const freeRepliesRemaining = await getUserFreeRepliesRemaining(currentUser.id);
      const creditsRemaining = Math.max(0, billingProfile.creditsRemaining || 0);
      const canGenerate = creditsRemaining > 0 || freeRepliesRemaining > 0;

      return NextResponse.json({
        success: true,
        isLoggedIn: true,
        creditsRemaining,
        creditsTotal: billingProfile.creditsTotal,
        freeRepliesRemaining,
        canGenerate,
        requiresUpgrade: !canGenerate,
        loggedIn: true,
        creditsBalance: creditsRemaining,
        supportLevel: billingProfile.supportLevel,
        purchasedPlan: billingProfile.purchasedPlan,
        entitlements: billingProfile.entitlements,
      });
    }

    const anonymousSessionId = getAnonymousSessionIdFromRequest(request);
    if (!anonymousSessionId) {
      const freeRepliesRemaining = FREE_GENERATION_LIMIT;
      const billingProfile = getDefaultBillingProfile();
      return NextResponse.json({
        success: true,
        isLoggedIn: false,
        creditsRemaining: 0,
        creditsTotal: 0,
        freeRepliesRemaining,
        canGenerate: true,
        requiresUpgrade: false,
        loggedIn: false,
        remainingFreeGenerations: freeRepliesRemaining,
        supportLevel: billingProfile.supportLevel,
        purchasedPlan: billingProfile.purchasedPlan,
        entitlements: billingProfile.entitlements,
      });
    }

    const usage = await ensureAnonymousUsageRecord({
      anonymousSessionId,
      request,
    });

    const freeRepliesRemaining = Math.max(
      0,
      FREE_GENERATION_LIMIT - (usage.freeGenerationsUsed || 0)
    );
    const canGenerate = freeRepliesRemaining > 0;
    const billingProfile = getDefaultBillingProfile();

    return NextResponse.json({
      success: true,
      isLoggedIn: false,
      creditsRemaining: 0,
      creditsTotal: 0,
      freeRepliesRemaining,
      canGenerate,
      requiresUpgrade: !canGenerate,
      loggedIn: false,
      remainingFreeGenerations: freeRepliesRemaining,
      supportLevel: billingProfile.supportLevel,
      purchasedPlan: billingProfile.purchasedPlan,
      entitlements: billingProfile.entitlements,
    });
  } catch (error) {
    const billingProfile = getDefaultBillingProfile();
    return NextResponse.json(
      {
        success: false,
        isLoggedIn: false,
        creditsRemaining: 0,
        creditsTotal: 0,
        freeRepliesRemaining: FREE_GENERATION_LIMIT,
        canGenerate: true,
        requiresUpgrade: false,
        loggedIn: false,
        remainingFreeGenerations: FREE_GENERATION_LIMIT,
        supportLevel: billingProfile.supportLevel,
        purchasedPlan: billingProfile.purchasedPlan,
        entitlements: billingProfile.entitlements,
        error:
          error instanceof Error ? error.message : 'Failed to fetch credits usage.',
      },
      { status: 200 }
    );
  }
}
