import { defaultLocale } from '@/config/locale';
import type { Configs } from '@/shared/models/config';

export const FLOWDOCKR_PRODUCT_NAME = 'Flowdockr';
export const FLOWDOCKR_COMPANY_NAME = 'Auralis Labs LLC';
export const TRUST_EFFECTIVE_DATE = 'March 17, 2026';

export const TRACKING_CONSENT_COOKIE = 'flowdockr_tracking_consent';
export const TRACKING_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type TrackingConsent = 'accepted' | 'declined' | null;

const NON_PUBLIC_EMAIL_PATTERNS = [
  /^no-reply@/i,
  /^noreply@/i,
  /^do-not-reply@/i,
  /^donotreply@/i,
];

export function parseTrackingConsent(
  value: string | null | undefined
): TrackingConsent {
  if (value === 'accepted' || value === 'declined') {
    return value;
  }

  return null;
}

export function extractEmailAddress(value: string | null | undefined) {
  const raw = String(value || '').trim();
  if (!raw) {
    return null;
  }

  const angleMatch = raw.match(/<([^>]+)>/);
  const candidate = (angleMatch?.[1] || raw).trim().toLowerCase();
  const emailMatch = candidate.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );

  return emailMatch?.[0]?.toLowerCase() || null;
}

export function isPublishedContactEmail(email: string | null | undefined) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  return !NON_PUBLIC_EMAIL_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function resolvePublishedContactEmail(
  values: Array<string | null | undefined>
) {
  for (const value of values) {
    const email = extractEmailAddress(value);
    if (email && isPublishedContactEmail(email)) {
      return email;
    }
  }

  return null;
}

export function hasOptionalTrackingConfigured(
  configs: Configs,
  params: {
    gaMeasurementId?: string;
    isDebug?: boolean;
    isProduction?: boolean;
  }
) {
  const gaConfigured =
    Boolean(String(params.gaMeasurementId || '').trim()) &&
    (params.isProduction || params.isDebug);

  return Boolean(
    gaConfigured ||
      configs.clarity_id ||
      (configs.plausible_domain && configs.plausible_src) ||
      configs.openpanel_client_id ||
      configs.vercel_analytics_enabled === 'true' ||
      configs.adsense_code ||
      (configs.affonso_enabled === 'true' && configs.affonso_id) ||
      (configs.promotekit_enabled === 'true' && configs.promotekit_id) ||
      (configs.crisp_enabled === 'true' && configs.crisp_website_id) ||
      (configs.tawk_enabled === 'true' &&
        configs.tawk_property_id &&
        configs.tawk_widget_id)
  );
}

export function getLocalizedPublicPath(pathname: string, locale: string) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalizedLocale = String(locale || '').trim();

  if (!normalizedLocale || normalizedLocale === defaultLocale) {
    return normalizedPath;
  }

  return `/${normalizedLocale}${normalizedPath}`;
}
