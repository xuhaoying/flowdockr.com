import { NextRequest, NextResponse } from 'next/server';

import { getUuid, md5 } from '@/shared/lib/hash';

export const SCENARIO_FREE_LIMIT = 2;
export const SCENARIO_PACK_SIZE = 20;
export const SCENARIO_PACK_PRICE_CENTS = 500;
export const SCENARIO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 10;

export const SCENARIO_BROWSER_ID_COOKIE = 'flowdockr_scenario_browser_id';
export const SCENARIO_FREE_COUNT_COOKIE = 'flowdockr_scenario_free_count';
export const SCENARIO_PAID_REMAINING_COOKIE = 'flowdockr_scenario_paid_remaining';
export const SCENARIO_PAID_SIG_COOKIE = 'flowdockr_scenario_paid_sig';
export const SCENARIO_PAID_HINT_COOKIE = 'flowdockr_scenario_paid_remaining_hint';

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

function getSignSecret(): string {
  return (
    process.env.SCENARIO_QUOTA_SIGNING_KEY ||
    process.env.AUTH_SECRET ||
    'flowdockr-scenario-quota-dev-secret'
  );
}

function signPaidRemaining(remaining: number, browserId: string): string {
  return md5(`${remaining}|${browserId}|${getSignSecret()}`);
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

export function getPaidRemaining(request: NextRequest, browserId: string): number {
  const store = getQuotaStore();

  const cookieRemainingRaw = Number(
    request.cookies.get(SCENARIO_PAID_REMAINING_COOKIE)?.value || '0'
  );
  const cookieSig = String(
    request.cookies.get(SCENARIO_PAID_SIG_COOKIE)?.value || ''
  ).trim();

  let cookieRemaining = 0;
  const normalizedCookieRemaining = clampInt(cookieRemainingRaw, 0, 10_000);
  if (
    normalizedCookieRemaining > 0 &&
    cookieSig &&
    cookieSig === signPaidRemaining(normalizedCookieRemaining, browserId)
  ) {
    cookieRemaining = normalizedCookieRemaining;
  }

  const memoryRemaining = clampInt(
    Number(store.get(`paid:browser:${browserId}`) || 0),
    0,
    10_000
  );

  return Math.max(cookieRemaining, memoryRemaining);
}

export function setPaidRemaining(
  response: NextResponse,
  browserId: string,
  remaining: number
): void {
  const normalized = clampInt(remaining, 0, 10_000);
  const store = getQuotaStore();

  store.set(`paid:browser:${browserId}`, normalized);

  response.cookies.set({
    name: SCENARIO_PAID_REMAINING_COOKIE,
    value: String(normalized),
    maxAge: SCENARIO_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  });
  response.cookies.set({
    name: SCENARIO_PAID_SIG_COOKIE,
    value: signPaidRemaining(normalized, browserId),
    maxAge: SCENARIO_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  });
  response.cookies.set({
    name: SCENARIO_PAID_HINT_COOKIE,
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

export function clearPaidHint(response: NextResponse): void {
  response.cookies.set({
    name: SCENARIO_PAID_HINT_COOKIE,
    value: '0',
    maxAge: SCENARIO_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  });
}
