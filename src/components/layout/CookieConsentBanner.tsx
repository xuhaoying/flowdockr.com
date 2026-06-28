'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TRACKING_CONSENT_COOKIE,
  TRACKING_CONSENT_MAX_AGE_SECONDS,
  type TrackingConsent,
} from '@/lib/trust';

import { Button } from '@/shared/components/ui/button';

type CookieConsentBannerProps = {
  privacyHref: string;
};

export function CookieConsentBanner({ privacyHref }: CookieConsentBannerProps) {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      const savedConsent = window.localStorage.getItem(TRACKING_CONSENT_COOKIE);

      if (savedConsent === 'accepted' || savedConsent === 'declined') {
        writeConsentCookie(savedConsent);
        setIsDismissed(true);
      }
    } catch {
      // If storage is blocked, the cookie path below still handles consent.
    }
  }, []);

  const updateConsent = (value: Exclude<TrackingConsent, null>) => {
    writeConsentCookie(value);

    try {
      window.localStorage.setItem(TRACKING_CONSENT_COOKIE, value);
    } catch {
      // Consent still works through the first-party cookie when storage fails.
    }

    setIsDismissed(true);
    router.refresh();
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:right-4 sm:left-auto sm:max-w-md sm:px-0">
      <div
        role="dialog"
        aria-label="Cookie and analytics consent"
        className="border-brand-lavender/30 pointer-events-auto rounded-2xl border bg-white/95 p-3 shadow-lg shadow-slate-950/10 backdrop-blur sm:p-4"
      >
        <p className="text-sm font-semibold text-slate-900">
          Optional analytics
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
          FlowDockr only loads optional analytics and third-party tools after
          you allow them. Read the{' '}
          <Link
            href={privacyHref}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11 flex-1 rounded-xl"
            onClick={() => updateConsent('declined')}
          >
            Keep essential only
          </Button>
          <Button
            type="button"
            size="sm"
            className="min-h-11 flex-1 rounded-xl"
            onClick={() => updateConsent('accepted')}
          >
            Allow analytics
          </Button>
        </div>
      </div>
    </div>
  );
}

function writeConsentCookie(value: Exclude<TrackingConsent, null>) {
  if (typeof window === 'undefined') {
    return;
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${TRACKING_CONSENT_COOKIE}=${value}; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}
