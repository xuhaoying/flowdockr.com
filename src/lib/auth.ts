import { eq } from 'drizzle-orm';

import { db, user } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';
import { getUserInfo } from '@/shared/models/user';

export async function getCurrentUser() {
  return getUserInfo();
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const [existing] = await db()
    .select()
    .from(user)
    .where(eq(user.email, normalizedEmail))
    .limit(1);

  return existing || null;
}

export async function findOrCreateUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    return existing;
  }

  const fallbackName = normalizedEmail.split('@')[0] || 'Flowdockr User';

  const [created] = await db()
    .insert(user)
    .values({
      id: getUuid(),
      name: fallbackName.slice(0, 80),
      email: normalizedEmail,
      emailVerified: false,
      creditsBalance: 0,
      magicLinkEnabled: true,
    })
    .returning();

  return created;
}
