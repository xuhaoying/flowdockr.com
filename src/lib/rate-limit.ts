import { rateLimitCounter } from '@/lib/db';
import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/core/db';
import { getUuid, md5 } from '@/shared/lib/hash';

type FixedWindowRateLimitParams = {
  bucket: string;
  key: string;
  limit: number;
  windowMs: number;
};

function getFixedWindow(params: FixedWindowRateLimitParams) {
  const now = Date.now();
  const windowStart = new Date(
    Math.floor(now / params.windowMs) * params.windowMs
  );
  const resetAt = new Date(windowStart.getTime() + params.windowMs);
  const keyHash = md5(params.key);

  return {
    windowStart,
    resetAt,
    keyHash,
  };
}

export async function getFixedWindowRateLimitStatus(
  params: FixedWindowRateLimitParams
): Promise<{
  allowed: boolean;
  count: number;
  remaining: number;
  resetAt: Date;
}> {
  const { keyHash, resetAt, windowStart } = getFixedWindow(params);
  const [row] = await db()
    .select({ count: rateLimitCounter.count })
    .from(rateLimitCounter)
    .where(
      and(
        eq(rateLimitCounter.bucket, params.bucket),
        eq(rateLimitCounter.keyHash, keyHash),
        eq(rateLimitCounter.windowStart, windowStart)
      )
    )
    .limit(1);
  const count = Number(row?.count || 0);

  return {
    allowed: count < params.limit,
    count,
    remaining: Math.max(0, params.limit - count),
    resetAt,
  };
}

export async function consumeFixedWindowRateLimit(
  params: FixedWindowRateLimitParams
): Promise<{
  allowed: boolean;
  count: number;
  remaining: number;
  resetAt: Date;
}> {
  const { keyHash, resetAt, windowStart } = getFixedWindow(params);

  const [row] = await db()
    .insert(rateLimitCounter)
    .values({
      id: getUuid(),
      bucket: params.bucket,
      keyHash,
      windowStart,
      count: 1,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [
        rateLimitCounter.bucket,
        rateLimitCounter.keyHash,
        rateLimitCounter.windowStart,
      ],
      set: {
        count: sql`${rateLimitCounter.count} + 1`,
        updatedAt: new Date(),
      },
    })
    .returning({
      count: rateLimitCounter.count,
    });

  const count = Number(row?.count || 0);

  return {
    allowed: count <= params.limit,
    count,
    remaining: Math.max(0, params.limit - count),
    resetAt,
  };
}
