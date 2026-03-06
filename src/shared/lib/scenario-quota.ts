import { NextRequest, NextResponse } from 'next/server';

import { getUuid, md5 } from '@/shared/lib/hash';

export const SCENARIO_FREE_LIMIT = 2;
export const SCENARIO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 10;

export const SCENARIO_BROWSER_ID_COOKIE = 'flowdockr_scenario_browser_id';
export const SCENARIO_FREE_COUNT_COOKIE = 'flowdockr_scenario_free_count';

export const SCENARIO_PACKS = [
  {
    id: 'flowdockr_10_replies',
    replies: 10,
    priceCents: 500,
    isMostPopular: false,
  },
  {
    id: 'flowdockr_50_replies',
    replies: 50,
    priceCents: 1500,
    isMostPopular: true,
  },
  {
    id: 'flowdockr_200_replies',
    replies: 200,
    priceCents: 4000,
    isMostPopular: false,
  },
] as const;

export type ScenarioPack = (typeof SCENARIO_PACKS)[number];
export type ScenarioPackId = ScenarioPack['id'];

type QuotaStore = Map<string, number>;
type RedeemedSessionStore = Set<string>;

declare global {
  var __flowdockrScenarioQuotaStore: QuotaStore | undefined;
  var __flowdockrScenarioRedeemedSessions: RedeemedSessionStore | undefined;
}

function getQuotaStore(): QuotaStore {
  if (!globalThis.__flowdockrScenarioQuotaStore) {
    globalThis.__flowdockrScenarioQuotaStore = new Map<string, number>();
  }
  return globalThis.__flowdockrScenarioQuotaStore;
}

function getRedeemedSessionStore(): RedeemedSessionStore {
  if (!globalThis.__flowdockrScenarioRedeemedSessions) {
    globalThis.__flowdockrScenarioRedeemedSessions = new Set<string>();
  }
  return globalThis.__flowdockrScenarioRedeemedSessions;
}

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.floor(value)));
}

export function getScenarioPackById(packId: string): ScenarioPack | null {
  const normalized = String(packId || '').trim();
  if (!normalized) {
    return null;
  }

  return SCENARIO_PACKS.find((item) => item.id === normalized) || null;
}

export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  const fromXff = xff?.split(',')[0]?.trim();

  return (
    fromXff ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function getNetworkFingerprint(request: NextRequest): string {
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';

  return md5(`${ip}|${userAgent}|${acceptLanguage}`);
}

export function getBrowserIdFromRequest(request: NextRequest): string {
  const existing = String(
    request.cookies.get(SCENARIO_BROWSER_ID_COOKIE)?.value || ''
  ).trim();

  if (existing.length >= 12 && existing.length <= 80) {
    return existing;
  }

  return `anon_${getUuid().replace(/-/g, '')}`;
}

export function attachBrowserIdCookie(
  response: NextResponse,
  browserId: string
): void {
  response.cookies.set({
    name: SCENARIO_BROWSER_ID_COOKIE,
    value: browserId,
    maxAge: SCENARIO_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });
}

export function getFreeUsage(request: NextRequest, browserId: string): number {
  const store = getQuotaStore();

  const cookieValue = Number(
    request.cookies.get(SCENARIO_FREE_COUNT_COOKIE)?.value || '0'
  );
  const cookieUsed = clampInt(cookieValue, 0, SCENARIO_FREE_LIMIT);

  const browserUsed = clampInt(
    Number(store.get(`free:browser:${browserId}`) || 0),
    0,
    SCENARIO_FREE_LIMIT
  );
  const networkUsed = clampInt(
    Number(store.get(`free:network:${getNetworkFingerprint(request)}`) || 0),
    0,
    SCENARIO_FREE_LIMIT
  );

  return Math.max(cookieUsed, browserUsed, networkUsed);
}

export function setFreeUsage(
  request: NextRequest,
  response: NextResponse,
  browserId: string,
  used: number
): void {
  const normalized = clampInt(used, 0, SCENARIO_FREE_LIMIT);
  const store = getQuotaStore();

  store.set(`free:browser:${browserId}`, normalized);
  store.set(`free:network:${getNetworkFingerprint(request)}`, normalized);

  response.cookies.set({
    name: SCENARIO_FREE_COUNT_COOKIE,
    value: String(normalized),
    maxAge: SCENARIO_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });
}

export function isPackSessionRedeemed(sessionId: string): boolean {
  return getRedeemedSessionStore().has(sessionId);
}

export function markPackSessionRedeemed(sessionId: string): void {
  getRedeemedSessionStore().add(sessionId);
}
