'use client';

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsValue = AnalyticsPrimitive | null | undefined;

export type AnalyticsParams = Record<string, AnalyticsValue>;

type PlausibleFn = (
  eventName: string,
  options?: { props?: Record<string, AnalyticsPrimitive> }
) => void;

type GtagFn = (...args: unknown[]) => void;

type MirroredScenarioEventConfig = {
  canonicalEventName: 'fd_scenario_view' | 'fd_tool_start' | 'fd_generation_success';
  slugParam: 'scenario_slug' | 'pricing_slug';
  allowedPageTypes: string[];
};

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

const MIRRORED_SCENARIO_EVENTS: Record<string, MirroredScenarioEventConfig> = {
  fd_scenario_view: {
    canonicalEventName: 'fd_scenario_view',
    slugParam: 'scenario_slug',
    allowedPageTypes: ['scenario'],
  },
  fd_tool_start: {
    canonicalEventName: 'fd_tool_start',
    slugParam: 'scenario_slug',
    allowedPageTypes: ['scenario'],
  },
  fd_generation_success: {
    canonicalEventName: 'fd_generation_success',
    slugParam: 'scenario_slug',
    allowedPageTypes: ['scenario'],
  },
  page_view_pricing_scenario: {
    canonicalEventName: 'fd_scenario_view',
    slugParam: 'pricing_slug',
    allowedPageTypes: ['pricing'],
  },
  click_generate_from_pricing_scenario: {
    canonicalEventName: 'fd_tool_start',
    slugParam: 'pricing_slug',
    allowedPageTypes: ['pricing'],
  },
  generate_success_from_pricing_scenario: {
    canonicalEventName: 'fd_generation_success',
    slugParam: 'pricing_slug',
    allowedPageTypes: ['pricing'],
  },
};

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

function mirrorCanonicalScenarioEvent(
  eventName: string,
  params: Record<string, AnalyticsPrimitive>
) {
  if (!isBrowser()) {
    return;
  }

  const eventConfig = MIRRORED_SCENARIO_EVENTS[eventName];
  if (!eventConfig) {
    return;
  }

  const mirroredSlugValue = params[eventConfig.slugParam];
  const scenarioSlug =
    typeof mirroredSlugValue === 'string' ? mirroredSlugValue.trim() : '';
  const pageType =
    typeof params.page_type === 'string' ? params.page_type.trim() : '';

  if (!scenarioSlug || !eventConfig.allowedPageTypes.includes(pageType)) {
    return;
  }

  try {
    void fetch('/api/analytics/scenario-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: eventConfig.canonicalEventName,
        scenarioSlug,
        pageType,
        pathname: window.location.pathname,
      }),
      keepalive: true,
    });
  } catch {
    // no-op
  }
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

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!isBrowser()) {
    return;
  }

  const normalized = normalizeParams(params);
  mirrorCanonicalScenarioEvent(eventName, normalized);

  if (!ANALYTICS_ENABLED) {
    return;
  }

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
