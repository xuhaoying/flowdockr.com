import { db, generation, userFreeUsage } from '@/lib/db';
import { and, eq, sql } from 'drizzle-orm';

import { FREE_REPLY_LIMIT } from './getFreeUsage';

export async function getUserFreeRepliesRemaining(
  userId: string
): Promise<number> {
  const used = await getUserFreeRepliesUsed(userId);
  return Math.max(0, FREE_REPLY_LIMIT - used);
}

export async function consumeUserFreeUsage(userId: string): Promise<{
  freeRepliesUsed: number;
  freeRepliesRemaining: number;
}> {
  return db().transaction(async (tx: any) => {
    const historicalUsed = await getUserFreeRepliesUsed(userId);

    await tx
      .insert(userFreeUsage)
      .values({
        userId,
        freeGenerationsUsed: historicalUsed,
      })
      .onConflictDoNothing({
        target: userFreeUsage.userId,
      });

    const [lockedUsage] = await tx
      .select({
        freeGenerationsUsed: userFreeUsage.freeGenerationsUsed,
      })
      .from(userFreeUsage)
      .where(eq(userFreeUsage.userId, userId))
      .limit(1)
      .for('update');

    const currentUsed = Math.max(
      historicalUsed,
      lockedUsage?.freeGenerationsUsed || 0
    );

    if (currentUsed >= FREE_REPLY_LIMIT) {
      throw new Error('FREE_LIMIT_REACHED');
    }

    const nextUsed = currentUsed + 1;

    await tx
      .update(userFreeUsage)
      .set({
        freeGenerationsUsed: nextUsed,
        updatedAt: new Date(),
      })
      .where(eq(userFreeUsage.userId, userId));

    return {
      freeRepliesUsed: nextUsed,
      freeRepliesRemaining: Math.max(0, FREE_REPLY_LIMIT - nextUsed),
    };
  });
}

async function getUserFreeRepliesUsed(userId: string): Promise<number> {
  const [row] = await db()
    .select({
      used: sql<number>`count(*)`,
    })
    .from(generation)
    .where(
      and(eq(generation.userId, userId), eq(generation.isFreeGeneration, true))
    );

  const [usage] = await db()
    .select({
      freeGenerationsUsed: userFreeUsage.freeGenerationsUsed,
    })
    .from(userFreeUsage)
    .where(eq(userFreeUsage.userId, userId))
    .limit(1);

  return Math.max(
    Number(row?.used || 0),
    Number(usage?.freeGenerationsUsed || 0)
  );
}
