import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { anonymousUsage } from '@/config/db/schema';
import { db } from '@/core/db';
import { getUuid, md5 } from '@/shared/lib/hash';

export const ANONYMOUS_SESSION_COOKIE = 'fd_anonymous_session';
const ANONYMOUS_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function getRequestIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function hashRequestIp(request: NextRequest): string {
  return md5(getRequestIp(request));
}

export function hashRequestUserAgent(request: NextRequest): string {
  return md5(request.headers.get('user-agent') || 'unknown');
}

export function getAnonymousSessionIdFromRequest(
  request: NextRequest
): string | null {
  const value = String(
    request.cookies.get(ANONYMOUS_SESSION_COOKIE)?.value || ''
  ).trim();

  if (!value || value.length < 16 || value.length > 120) {
    return null;
  }

  return value;
}

export function createAnonymousSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return getUuid();
}

export function setAnonymousSessionCookie(
  response: NextResponse,
  anonymousSessionId: string
): void {
  response.cookies.set(ANONYMOUS_SESSION_COOKIE, anonymousSessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ANONYMOUS_SESSION_MAX_AGE,
    path: '/',
  });
}

export async function ensureAnonymousUsageRecord(params: {
  anonymousSessionId: string;
  request: NextRequest;
}) {
  const { anonymousSessionId, request } = params;

  const [existing] = await db()
    .select()
    .from(anonymousUsage)
    .where(eq(anonymousUsage.anonymousSessionId, anonymousSessionId))
    .limit(1);

  if (existing) {
    return existing;
  }

  const [created] = await db()
    .insert(anonymousUsage)
    .values({
      id: getUuid(),
      anonymousSessionId,
      freeGenerationsUsed: 0,
      ipHash: hashRequestIp(request),
      userAgentHash: hashRequestUserAgent(request),
    })
    .returning();

  return created;
}
