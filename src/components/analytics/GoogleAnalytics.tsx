'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  pageview,
} from '@/lib/analytics';

type GoogleAnalyticsProps = {
  consentGranted?: boolean;
};

export function GoogleAnalytics({
  consentGranted = false,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!consentGranted || !ANALYTICS_ENABLED || !pathname) {
      return;
    }

    pageview(pathname);
  }, [consentGranted, pathname]);

  if (!consentGranted || !ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `,
        }}
      />
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
