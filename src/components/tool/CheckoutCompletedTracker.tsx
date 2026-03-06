'use client';

import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics-client';

type CheckoutCompletedTrackerProps = {
  scenarioSlug?: string;
};

export function CheckoutCompletedTracker({
  scenarioSlug = '',
}: CheckoutCompletedTrackerProps) {
  useEffect(() => {
    trackEvent('checkout_completed', {
      scenarioSlug,
    });
  }, [scenarioSlug]);

  return null;
}
