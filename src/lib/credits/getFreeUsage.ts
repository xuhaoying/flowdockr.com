import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

import {
  createAnonymousSessionId,
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
} from '@/lib/anonymous';
import { db, anonymousUsage } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

export const FREE_REPLY_LIMIT = 2;

export async function getFreeUsage(request: NextRequest): Promise<{
  anonymousSessionId: string;
  freeRepliesRemaining: number;
  freeRepliesUsed: number;
  created: boolean;
}> {
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

  const freeRepliesUsed = usage.freeGenerationsUsed || 0;

  return {
    anonymousSessionId,
    freeRepliesUsed,
    freeRepliesRemaining: Math.max(0, FREE_REPLY_LIMIT - freeRepliesUsed),
    created,
  };
}

export async function consumeFreeUsage(params: {
  anonymousSessionId: string;
  scenarioSlug: string;
  ipHash?: string;
  userAgentHash?: string;
}) {
  const { anonymousSessionId, scenarioSlug, ipHash, userAgentHash } = params;
  return db().transaction(async (tx: any) => {
    await tx
      .insert(anonymousUsage)
      .values({
        id: getUuid(),
        anonymousSessionId,
        freeGenerationsUsed: 0,
        lastScenarioSlug: scenarioSlug,
        ipHash,
        userAgentHash,
      })
      .onConflictDoNothing({
        target: anonymousUsage.anonymousSessionId,
      });

    const [lockedUsage] = await tx
      .select({
        id: anonymousUsage.id,
        freeGenerationsUsed: anonymousUsage.freeGenerationsUsed,
      })
      .from(anonymousUsage)
      .where(eq(anonymousUsage.anonymousSessionId, anonymousSessionId))
      .limit(1)
      .for('update');

    if (!lockedUsage) {
      throw new Error('Anonymous usage not found.');
    }

    if (lockedUsage.freeGenerationsUsed >= FREE_REPLY_LIMIT) {
      return {
        freeRepliesUsed: lockedUsage.freeGenerationsUsed,
        freeRepliesRemaining: 0,
        exhausted: true,
      };
    }

    const used = lockedUsage.freeGenerationsUsed + 1;

    await tx
      .update(anonymousUsage)
      .set({
        freeGenerationsUsed: used,
        lastScenarioSlug: scenarioSlug,
        ipHash,
        userAgentHash,
        updatedAt: new Date(),
      })
      .where(eq(anonymousUsage.id, lockedUsage.id));

    return {
      freeRepliesUsed: used,
      freeRepliesRemaining: Math.max(0, FREE_REPLY_LIMIT - used),
      exhausted: false,
    };
  });
}

export async function getAnonymousFreeUsageById(anonymousSessionId: string): Promise<{
  freeRepliesRemaining: number;
  freeRepliesUsed: number;
}> {
  const [usage] = await db()
    .select({
      freeGenerationsUsed: anonymousUsage.freeGenerationsUsed,
    })
    .from(anonymousUsage)
    .where(eq(anonymousUsage.anonymousSessionId, anonymousSessionId))
    .limit(1);

  const freeRepliesUsed = usage?.freeGenerationsUsed || 0;

  return {
    freeRepliesUsed,
    freeRepliesRemaining: Math.max(0, FREE_REPLY_LIMIT - freeRepliesUsed),
  };
}
