import { db, user } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getCredits(userId: string): Promise<number> {
  const [row] = await db()
    .select({ creditsBalance: user.creditsBalance })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return Math.max(0, row?.creditsBalance || 0);
}
