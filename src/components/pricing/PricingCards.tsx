'use client';

import { useEffect, useState } from 'react';

import { trackEvent } from '@/lib/analytics-client';
import { CREDIT_PACKAGE_LIST } from '@/lib/credits/packages';
import { CreditPackageId } from '@/types/billing';

import { Button } from '@/shared/components/ui/button';

type PricingCardsProps = {
  sourcePage?: 'pricing' | 'home' | 'scenario' | 'tool';
  scenarioSlug?: string;
};

export function PricingCards({
  sourcePage = 'pricing',
  scenarioSlug = '',
}: PricingCardsProps) {
  const [loadingId, setLoadingId] = useState<CreditPackageId | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sourcePage === 'pricing') {
      trackEvent('pricing_viewed', {});
    }
  }, [sourcePage]);

  const startCheckout = async (packageId: CreditPackageId) => {
    setLoadingId(packageId);
    setError('');

    try {
      trackEvent('pricing_card_clicked', {
        packageId,
        sourcePage,
        scenarioSlug,
      });
      trackEvent('checkout_started', {
        packageId,
        sourcePage,
        scenarioSlug,
      });

      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Keep locale-aware return path so checkout success/cancel returns to the current locale.
        // This is especially important when locale prefix is not the default locale.
        body: JSON.stringify({
          packCode: packageId,
          scenarioSlug: scenarioSlug || undefined,
          returnTo: `${window.location.pathname}${window.location.search}`,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        checkoutUrl?: string;
        error?: string;
      };

      if (response.status === 401 || payload.error === 'UNAUTHORIZED') {
        const callbackUrl = `${window.location.pathname}${window.location.search}`;
        window.location.assign(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }

      if (!response.ok || !payload.ok || !payload.checkoutUrl) {
        throw new Error(payload.message || 'Failed to start checkout.');
      }

      window.location.assign(payload.checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Failed to start checkout.'
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-300 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Free</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">$0</p>
          <p className="mt-1 text-sm text-slate-600">2 replies</p>
          <p className="mt-3 text-xs text-slate-600">No subscription required.</p>
        </article>

        {CREDIT_PACKAGE_LIST.map((pack) => (
          <article
            key={pack.id}
            className={`rounded-2xl border p-5 ${
              pack.id === 'pro_100' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white'
            }`}
          >
            <p className={`text-sm font-semibold ${pack.id === 'pro_100' ? 'text-white' : 'text-slate-900'}`}>
              {pack.name}
            </p>
            <p className={`mt-2 text-3xl font-bold ${pack.id === 'pro_100' ? 'text-white' : 'text-slate-900'}`}>
              ${(pack.priceUsdCents / 100).toFixed(0)}
            </p>
            <p className={`mt-1 text-sm ${pack.id === 'pro_100' ? 'text-slate-200' : 'text-slate-600'}`}>
              {pack.credits} replies
            </p>
            <p className={`mt-3 text-xs ${pack.id === 'pro_100' ? 'text-slate-200' : 'text-slate-600'}`}>
              1 generation = 1 credit.
            </p>

            <Button
              type="button"
              className="mt-4 w-full"
              variant={pack.id === 'pro_100' ? 'secondary' : 'outline'}
              onClick={() => startCheckout(pack.id)}
              disabled={loadingId !== null}
            >
              {loadingId === pack.id ? 'Redirecting...' : 'Buy credits'}
            </Button>
          </article>
        ))}
      </div>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </div>
      ) : null}
    </section>
  );
}
