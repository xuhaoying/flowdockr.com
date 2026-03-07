import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import {
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
} from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { getUserFreeRepliesRemaining } from '@/lib/credits';
import { db, user } from '@/lib/db';

const FREE_GENERATION_LIMIT = 2;

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const [dbUser] = await db()
        .select({
          creditsBalance: user.creditsBalance,
        })
        .from(user)
        .where(eq(user.id, currentUser.id))
        .limit(1);

      const freeRepliesRemaining = await getUserFreeRepliesRemaining(currentUser.id);
      const creditsRemaining = Math.max(0, dbUser?.creditsBalance || 0);
      const canGenerate = creditsRemaining > 0 || freeRepliesRemaining > 0;

      return NextResponse.json({
        success: true,
        isLoggedIn: true,
        creditsRemaining,
        freeRepliesRemaining,
        canGenerate,
        requiresUpgrade: !canGenerate,
        loggedIn: true,
        creditsBalance: creditsRemaining,
      });
    }

    const anonymousSessionId = getAnonymousSessionIdFromRequest(request);
    if (!anonymousSessionId) {
      const freeRepliesRemaining = FREE_GENERATION_LIMIT;
      return NextResponse.json({
        success: true,
        isLoggedIn: false,
        creditsRemaining: 0,
        freeRepliesRemaining,
        canGenerate: true,
        requiresUpgrade: false,
        loggedIn: false,
        remainingFreeGenerations: freeRepliesRemaining,
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

    return NextResponse.json({
      success: true,
      isLoggedIn: false,
      creditsRemaining: 0,
      freeRepliesRemaining,
      canGenerate,
      requiresUpgrade: !canGenerate,
      loggedIn: false,
      remainingFreeGenerations: freeRepliesRemaining,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        isLoggedIn: false,
        creditsRemaining: 0,
        freeRepliesRemaining: FREE_GENERATION_LIMIT,
        canGenerate: true,
        requiresUpgrade: false,
        loggedIn: false,
        remainingFreeGenerations: FREE_GENERATION_LIMIT,
        error:
          error instanceof Error ? error.message : 'Failed to fetch credits usage.',
      },
      { status: 200 }
    );
  }
}
