'use client';

type TrackProps = Record<string, string | number | boolean | null | undefined>;

type PlausibleFn = (eventName: string, options?: { props?: TrackProps }) => void;
type GtagFn = (
  command: string,
  eventName: string,
  params?: Record<string, string | number | boolean>
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    gtag?: GtagFn;
  }
}

export function trackEvent(eventName: string, props: TrackProps = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.plausible?.(eventName, { props });
  } catch {
    // no-op
  }

  try {
    if (typeof window.gtag === 'function') {
      const normalized: Record<string, string | number | boolean> = {};
      for (const [key, value] of Object.entries(props)) {
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          normalized[key] = value;
        }
      }
      window.gtag('event', eventName, normalized);
    }
  } catch {
    // no-op
  }
}
