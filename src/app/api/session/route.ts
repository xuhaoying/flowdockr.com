import { NextRequest, NextResponse } from 'next/server';

import {
  createAnonymousSessionId,
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
  setAnonymousSessionCookie,
} from '@/lib/anonymous';

const FREE_GENERATION_LIMIT = 2;

export async function POST(request: NextRequest) {
  try {
    let anonymousSessionId = getAnonymousSessionIdFromRequest(request);
    let created = false;

    if (!anonymousSessionId) {
      anonymousSessionId = createAnonymousSessionId();
      created = true;
    }

    const usage = await ensureAnonymousUsageRecord({
      anonymousSessionId,
      request,
    });

    const response = NextResponse.json({
      ok: true,
      anonymousSessionId,
      remainingFreeGenerations: Math.max(
        0,
        FREE_GENERATION_LIMIT - (usage.freeGenerationsUsed || 0)
      ),
      created,
    });

    if (created) {
      setAnonymousSessionCookie(response, anonymousSessionId);
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : 'Failed to initialize session.',
      },
      { status: 500 }
    );
  }
}
