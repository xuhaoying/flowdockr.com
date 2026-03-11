'use client';

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsValue = AnalyticsPrimitive | null | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;

type PlausibleFn = (
  eventName: string,
  options?: { props?: Record<string, AnalyticsPrimitive> }
) => void;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
    plausible?: PlausibleFn;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';

const ANALYTICS_DEBUG_ENABLED = process.env.NEXT_PUBLIC_DEBUG === 'true';

export const ANALYTICS_ENABLED =
  Boolean(GA_MEASUREMENT_ID) &&
  (process.env.NODE_ENV === 'production' || ANALYTICS_DEBUG_ENABLED);

function isBrowser() {
  return typeof window !== 'undefined';
}

function normalizeParams(params: AnalyticsParams = {}) {
  const normalized: Record<string, AnalyticsPrimitive> = {};

  for (const [key, value] of Object.entries(params)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      normalized[key] = value;
    }
  }

  return normalized;
}

function ensureGtag() {
  if (!isBrowser() || !ANALYTICS_ENABLED) {
    return null;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  return window.gtag;
}

export function pageview(path?: string) {
  if (!isBrowser() || !ANALYTICS_ENABLED) {
    return;
  }

  const gtag = ensureGtag();
  if (!gtag) {
    return;
  }

  const pagePath = path || window.location.pathname;

  gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(
  eventName: string,
  params: AnalyticsParams = {}
) {
  if (!isBrowser() || !ANALYTICS_ENABLED) {
    return;
  }

  const normalized = normalizeParams(params);

  try {
    window.plausible?.(eventName, { props: normalized });
  } catch {
    // no-op
  }

  const gtag = ensureGtag();
  if (!gtag) {
    return;
  }

  gtag('event', eventName, normalized);
}
