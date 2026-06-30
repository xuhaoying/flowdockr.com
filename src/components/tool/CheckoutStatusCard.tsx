'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import {
  buildPricingScenarioAnalyticsParams,
  buildPricingScenarioAttribution,
} from '@/lib/analytics/pricingAttribution';
import { BillingSupportLevel } from '@/types/billing';
import type { CheckoutStatusResponse } from '@/types/payments';
import type { PricingScenarioAttributionSeedInput } from '@/types/pricing-analytics';

import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

type CheckoutStatusCardProps = {
  sessionId?: string;
  purchaseId?: string;
  continuePath: string;
  pricingAttribution?: PricingScenarioAttributionSeedInput;
};

export function CheckoutStatusCard({
  sessionId = '',
  purchaseId = '',
  continuePath,
  pricingAttribution: pricingAttributionSeed,
}: CheckoutStatusCardProps) {
  const [status, setStatus] = useState<CheckoutStatusResponse>({
    success: true,
    status: 'pending',
    creditsGranted: false,
    creditsAdded: 0,
  });
  const [timedOut, setTimedOut] = useState(false);
  const attemptsRef = useRef(0);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (sessionId) {
      params.set('sessionId', sessionId);
    }
    if (purchaseId) {
      params.set('purchaseId', purchaseId);
    }
    return params.toString();
  }, [purchaseId, sessionId]);
  const hasCheckoutReference = Boolean(queryString);
  const resolvedPricingAttribution = useMemo(
    () =>
      buildPricingScenarioAttribution(
        status.pricingAttribution || pricingAttributionSeed
      ),
    [pricingAttributionSeed, status.pricingAttribution]
  );
  const pricingAnalyticsParams = useMemo(
    () => buildPricingScenarioAnalyticsParams(resolvedPricingAttribution),
    [resolvedPricingAttribution]
  );

  useEffect(() => {
    if (!hasCheckoutReference) {
      return;
    }

    attemptsRef.current = 0;
    setTimedOut(false);
    let aborted = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      if (aborted) {
        return;
      }

      attemptsRef.current += 1;
      try {
        const response = await fetch(`/api/checkout/status?${queryString}`, {
          method: 'GET',
          cache: 'no-store',
        });
        const payload = (await response.json()) as CheckoutStatusResponse;
        if (aborted) {
          return;
        }

        setStatus(payload);

        const isFinalFailure =
          payload.status === 'failed' ||
          payload.status === 'canceled' ||
          payload.status === 'refunded';
        const isFinalSuccess =
          payload.status === 'paid' && payload.creditsGranted;
        const shouldKeepPolling =
          !isFinalSuccess && !isFinalFailure && attemptsRef.current < 20;
        if (shouldKeepPolling) {
          timeoutId = setTimeout(() => {
            void tick();
          }, 1800);
        } else if (!isFinalSuccess && !isFinalFailure) {
          setTimedOut(true);
        }
      } catch {
        if (aborted) {
          return;
        }

        setStatus((prev) => ({
          ...prev,
          success: false,
          error: 'STATUS_FETCH_FAILED',
        }));

        if (attemptsRef.current < 20) {
          timeoutId = setTimeout(() => {
            void tick();
          }, 1800);
        } else {
          setTimedOut(true);
        }
      }
    };

    void tick();

    return () => {
      aborted = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasCheckoutReference, queryString]);

  const isFinalized = status.status === 'paid' && status.creditsGranted;
  const isFinalFailure =
    status.status === 'failed' ||
    status.status === 'canceled' ||
    status.status === 'refunded';
  const isDelayed =
    timedOut && hasCheckoutReference && !isFinalized && !isFinalFailure;
  const purchaseTrackedRef = useRef(false);

  useEffect(() => {
    if (!isFinalized || purchaseTrackedRef.current) {
      return;
    }

    purchaseTrackedRef.current = true;
    trackEvent('fd_purchase_success', {
      purchased_plan: status.purchasedPlan || 'unknown',
      credits_added: Math.max(0, status.creditsAdded || 0),
      return_to: continuePath,
      ...pricingAnalyticsParams,
      page_type: 'checkout',
    });
  }, [
    continuePath,
    isFinalized,
    pricingAnalyticsParams,
    status.creditsAdded,
    status.creditsGranted,
    status.purchasedPlan,
  ]);

  return (
    <section className="space-y-4 rounded-lg border p-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {isFinalized
          ? 'Payment successful'
          : isDelayed
            ? 'Still confirming payment'
            : hasCheckoutReference
              ? 'Finalizing your credits'
              : 'Payment status unavailable'}
      </h1>

      {!hasCheckoutReference ? (
        <p className="text-muted-foreground">
          We could not find a checkout reference for this page. Please retry
          from the pricing page.
        </p>
      ) : null}

      {!isFinalized && !isFinalFailure && hasCheckoutReference ? (
        <p className="text-muted-foreground">
          {isDelayed
            ? 'We could not confirm the credit grant automatically. Refresh this page in a minute or contact support if your payment receipt arrived but credits did not.'
            : 'Payment completed. We are confirming your message credits and support level. This usually takes a few seconds.'}
        </p>
      ) : null}

      {isFinalized ? (
        <p className="text-muted-foreground">
          Your message credits are now available. You can continue with deeper
          client support right away.
        </p>
      ) : null}

      {isFinalFailure ? (
        <p className="text-muted-foreground">
          This payment was not finalized. You can retry checkout from pricing.
        </p>
      ) : null}

      <div className="bg-muted/30 rounded-md border p-4 text-sm">
        <p>
          <span className="font-semibold">Status:</span> {status.status}
        </p>
        <p>
          <span className="font-semibold">Credits granted:</span>{' '}
          {status.creditsGranted ? 'Yes' : 'No'}
        </p>
        <p>
          <span className="font-semibold">Credits added:</span>{' '}
          {Math.max(0, status.creditsAdded || 0)}
        </p>
        {typeof status.creditsRemaining === 'number' ? (
          <p>
            <span className="font-semibold">Credits remaining:</span>{' '}
            {Math.max(0, status.creditsRemaining)}
          </p>
        ) : null}
        {status.supportLevel ? (
          <p>
            <span className="font-semibold">Support level:</span>{' '}
            {formatSupportLevel(status.supportLevel)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        {isFinalized ? (
          <Button asChild>
            <Link href={continuePath}>Continue negotiating</Link>
          </Button>
        ) : (
          <Button type="button" disabled>
            Continue negotiating
          </Button>
        )}
        {isFinalFailure || isDelayed ? (
          <Button asChild variant="outline">
            <Link href="/pricing">View pricing</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

function formatSupportLevel(value: BillingSupportLevel) {
  switch (value) {
    case 'quick_help':
      return 'Quick Help';
    case 'pro':
      return 'Pro';
    case 'studio':
      return 'Studio';
    case 'free':
    default:
      return 'Free Trial';
  }
}
