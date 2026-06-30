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

    let freeGenerationsUsed = 0;
    let degraded = false;

    try {
      const usage = await ensureAnonymousUsageRecord({
        anonymousSessionId,
        request,
      });
      freeGenerationsUsed = usage.freeGenerationsUsed || 0;
    } catch (error) {
      degraded = true;
      console.warn(
        'anonymous session usage bootstrap failed:',
        error instanceof Error ? error.message : 'UNKNOWN'
      );
    }

    const response = NextResponse.json({
      ok: true,
      anonymousSessionId,
      remainingFreeGenerations: Math.max(
        0,
        FREE_GENERATION_LIMIT - freeGenerationsUsed
      ),
      created,
      degraded,
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
          error instanceof Error
            ? error.message
            : 'Failed to initialize session.',
      },
      { status: 500 }
    );
  }
}
