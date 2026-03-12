'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { trackEvent } from '@/lib/analytics';

type ScenarioViewTrackerProps = {
  scenarioSlug: string;
};

let lastScenarioViewKey = '';
let lastScenarioViewAt = 0;

export function ScenarioViewTracker({
  scenarioSlug,
}: ScenarioViewTrackerProps) {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!scenarioSlug || !pathname) {
      return;
    }

    const key = `${locale}:${pathname}:${scenarioSlug}`;
    const now = Date.now();

    if (key === lastScenarioViewKey && now - lastScenarioViewAt < 1500) {
      return;
    }

    lastScenarioViewKey = key;
    lastScenarioViewAt = now;

    trackEvent('fd_scenario_view', {
      scenario_slug: scenarioSlug,
      page_type: 'scenario',
      referrer: document.referrer || 'direct',
      device_type: getDeviceType(),
    });
  }, [locale, pathname, scenarioSlug]);

  return null;
}

function getDeviceType() {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
}
