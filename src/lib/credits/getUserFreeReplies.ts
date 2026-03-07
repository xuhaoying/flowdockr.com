import { and, eq, sql } from 'drizzle-orm';

import { db, generation } from '@/lib/db';

import { FREE_REPLY_LIMIT } from './getFreeUsage';

export async function getUserFreeRepliesRemaining(userId: string): Promise<number> {
  const [row] = await db()
    .select({
      used: sql<number>`count(*)`,
    })
    .from(generation)
    .where(and(eq(generation.userId, userId), eq(generation.isFreeGeneration, true)));

  const used = Number(row?.used || 0);
  return Math.max(0, FREE_REPLY_LIMIT - used);
}
