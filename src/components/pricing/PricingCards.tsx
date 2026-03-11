'use client';

import { useEffect, useState } from 'react';

import { freeTrialPlan } from '@/config/creditPacks';
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
        window.location.assign(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
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
      <div className="grid gap-4 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-300 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{freeTrialPlan.name}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {freeTrialPlan.badge}
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              Free
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">$0</p>
          <p className="mt-1 text-sm text-slate-700">
            {freeTrialPlan.credits} negotiation credits
          </p>
          <p className="mt-3 text-sm text-slate-700">{freeTrialPlan.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {freeTrialPlan.featureSummary?.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Single response only. No strategy explanation or history saving.
          </div>
        </article>

        {CREDIT_PACKAGE_LIST.map((pack) => {
          const isPopular = Boolean(pack.popular);

          return (
            <article
              key={pack.id}
              className={`rounded-2xl border p-5 ${
                isPopular
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isPopular ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {pack.name}
                  </p>
                  {pack.badge ? (
                    <p
                      className={`mt-1 text-xs font-medium uppercase tracking-wide ${
                        isPopular ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {pack.badge}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    isPopular
                      ? 'border border-white/20 bg-white/10 text-white'
                      : 'border border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  {pack.tagline}
                </span>
              </div>

              <p
                className={`mt-4 text-3xl font-bold ${
                  isPopular ? 'text-white' : 'text-slate-900'
                }`}
              >
                ${(pack.priceUsdCents / 100).toFixed(0)}
              </p>
              <p
                className={`mt-1 text-sm ${
                  isPopular ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                {pack.credits} negotiation credits
              </p>
              <p
                className={`mt-3 text-sm ${
                  isPopular ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                {pack.description}
              </p>

              <ul
                className={`mt-4 space-y-2 text-sm ${
                  isPopular ? 'text-slate-100' : 'text-slate-700'
                }`}
              >
                {pack.featureSummary?.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${
                        isPopular ? 'bg-slate-300' : 'bg-slate-500'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {pack.advancedModeLabels?.length ? (
                <div
                  className={`mt-4 rounded-xl border px-3 py-3 text-xs ${
                    isPopular
                      ? 'border-white/15 bg-white/5 text-slate-200'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {pack.advancedModeLabels.join(' · ')}
                </div>
              ) : null}

              <p
                className={`mt-4 text-xs ${
                  isPopular ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                One-time purchase. Credits do not expire.
              </p>

              <Button
                type="button"
                className="mt-4 w-full"
                variant={isPopular ? 'secondary' : 'outline'}
                onClick={() => startCheckout(pack.id)}
                disabled={loadingId !== null}
              >
                {loadingId === pack.id ? 'Redirecting...' : pack.ctaLabel || 'Buy credits'}
              </Button>
            </article>
          );
        })}
      </div>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </div>
      ) : null}
    </section>
  );
}
