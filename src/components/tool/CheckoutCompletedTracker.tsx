'use client';

import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics-client';

type CheckoutCompletedTrackerProps = {
};

export function CheckoutCompletedTracker({}: CheckoutCompletedTrackerProps) {
  useEffect(() => {
    trackEvent('checkout_completed', {});
  }, []);

  return null;
}
