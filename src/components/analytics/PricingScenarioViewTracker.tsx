'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { trackEvent } from '@/lib/analytics';
import { buildPricingScenarioAnalyticsParams } from '@/lib/analytics/pricingAttribution';
import type { PricingScenarioAttribution } from '@/types/pricing-analytics';

let lastPricingScenarioViewKey = '';
let lastPricingScenarioViewAt = 0;

type PricingScenarioViewTrackerProps = {
  attribution: PricingScenarioAttribution;
};

export function PricingScenarioViewTracker({
  attribution,
}: PricingScenarioViewTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const key = `${attribution.locale}:${pathname}:${attribution.pricingSlug}`;
    const now = Date.now();

    if (
      key === lastPricingScenarioViewKey &&
      now - lastPricingScenarioViewAt < 1500
    ) {
      return;
    }

    lastPricingScenarioViewKey = key;
    lastPricingScenarioViewAt = now;

    trackEvent('page_view_pricing_scenario', {
      ...buildPricingScenarioAnalyticsParams(attribution),
      referrer: document.referrer || 'direct',
      device_type: getDeviceType(),
    });
  }, [attribution, pathname]);

  return null;
}

function getDeviceType() {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
}
