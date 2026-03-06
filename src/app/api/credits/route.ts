import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import {
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
} from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
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

      return NextResponse.json({
        loggedIn: true,
        creditsBalance: dbUser?.creditsBalance || 0,
      });
    }

    const anonymousSessionId = getAnonymousSessionIdFromRequest(request);
    if (!anonymousSessionId) {
      return NextResponse.json({
        loggedIn: false,
        remainingFreeGenerations: FREE_GENERATION_LIMIT,
      });
    }

    const usage = await ensureAnonymousUsageRecord({
      anonymousSessionId,
      request,
    });

    return NextResponse.json({
      loggedIn: false,
      remainingFreeGenerations: Math.max(
        0,
        FREE_GENERATION_LIMIT - (usage.freeGenerationsUsed || 0)
      ),
    });
  } catch (error) {
    return NextResponse.json(
      {
        loggedIn: false,
        remainingFreeGenerations: FREE_GENERATION_LIMIT,
        error:
          error instanceof Error ? error.message : 'Failed to fetch credits usage.',
      },
      { status: 200 }
    );
  }
}
