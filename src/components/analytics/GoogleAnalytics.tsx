'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  pageview,
} from '@/lib/analytics';

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!ANALYTICS_ENABLED || !pathname) {
      return;
    }

    pageview(pathname);
  }, [pathname]);

  if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
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
