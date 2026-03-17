'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

import {
  TRACKING_CONSENT_COOKIE,
  TRACKING_CONSENT_MAX_AGE_SECONDS,
} from '@/lib/trust';

type CookieConsentBannerProps = {
  privacyHref: string;
};

export function CookieConsentBanner({
  privacyHref,
}: CookieConsentBannerProps) {
  const updateConsent = (value: 'accepted' | 'declined') => {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${TRACKING_CONSENT_COOKIE}=${value}; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
    window.location.reload();
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-xl">
      <div className="rounded-[22px] border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">
            Optional analytics and third-party tools
          </p>
          <p className="text-sm leading-6 text-slate-600">
            Flowdockr only loads optional analytics, attribution, and
            third-party support scripts after you allow them. You can read more
            in our{' '}
            <Link
              href={privacyHref}
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => updateConsent('declined')}
          >
            Keep essential only
          </Button>
          <Button
            type="button"
            className="rounded-xl"
            onClick={() => updateConsent('accepted')}
          >
            Allow analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
