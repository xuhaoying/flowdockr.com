'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics-client';
import { CREDIT_PACKAGE_LIST } from '@/lib/credits/packages';
import { CreditPackageId } from '@/types/billing';

import { Link } from '@/core/i18n/navigation';
import { freeTrialPlan } from '@/config/creditPacks';
import { Button } from '@/shared/components/ui/button';

type PricingCardsProps = {
  sourcePage?: 'pricing' | 'home' | 'scenario' | 'tool';
  scenarioSlug?: string;
  showSectionHeader?: boolean;
  sectionId?: string;
};

const USAGE_HINTS: Record<string, string> = {
  free_trial:
    'Best when you want to test one real negotiation situation first.',
  quick_help:
    'Best when you need one clear response for a live client conversation.',
  pro: 'Best when you want deeper support and need to compare response styles.',
  studio:
    'Best when the negotiation is ongoing and you want next-step support as well.',
};

const CTA_LABELS: Record<string, string> = {
  free_trial: 'Try a scenario',
  quick_help: 'Get quick help',
  pro: 'Upgrade to Pro',
  studio: 'Get Studio',
};

export function PricingCards({
  sourcePage = 'pricing',
  scenarioSlug = '',
  showSectionHeader = false,
  sectionId,
}: PricingCardsProps) {
  const [loadingId, setLoadingId] = useState<CreditPackageId | null>(null);
  const [error, setError] = useState('');
  const wrapperClassName = showSectionHeader
    ? 'space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'
    : 'space-y-5';

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
        window.location.assign(
          `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
        );
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
    <section id={sectionId} className={wrapperClassName}>
      {showSectionHeader ? (
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Pricing Cards
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Choose the support depth that fits the conversation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Start free, then move into the support level that matches how often
            you handle difficult client negotiations.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="flex flex-col rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {freeTrialPlan.name}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Start free
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                Free
              </span>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-900">$0</p>
              <p className="mt-1 text-sm text-slate-700">
                {freeTrialPlan.credits} negotiation credits
              </p>
            </div>

            <p className="text-sm text-slate-700">
              {freeTrialPlan.description}
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              {freeTrialPlan.featureSummary?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs leading-relaxed text-slate-600">
              <p className="font-semibold text-slate-900">Usage hint</p>
              <p className="mt-1">{USAGE_HINTS.free_trial}</p>
            </div>
          </div>

          <div className="mt-5">
            <Button asChild className="w-full">
              <Link href="/tools/reply-generator">{CTA_LABELS.free_trial}</Link>
            </Button>
          </div>
        </article>

        {CREDIT_PACKAGE_LIST.map((pack) => {
          const isPopular = pack.id === 'pro';

          return (
            <article
              key={pack.id}
              className={`flex flex-col rounded-3xl border p-5 shadow-sm ${
                isPopular
                  ? 'border-slate-900 bg-slate-950 text-white shadow-lg'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`text-lg font-semibold ${
                        isPopular ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {pack.name}
                    </p>
                    {isPopular ? (
                      <p className="mt-1 text-xs font-medium tracking-wide text-slate-300 uppercase">
                        Most freelancers choose this
                      </p>
                    ) : pack.badge ? (
                      <p className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
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

                <div>
                  <p
                    className={`text-3xl font-bold ${
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
                </div>

                <p
                  className={`text-sm ${
                    isPopular ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {pack.description}
                </p>

                <ul
                  className={`space-y-2 text-sm ${
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

                <div
                  className={`rounded-2xl border px-3 py-3 text-xs leading-relaxed ${
                    isPopular
                      ? 'border-white/15 bg-white/5 text-slate-200'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      isPopular ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Usage hint
                  </p>
                  <p className="mt-1">{USAGE_HINTS[pack.id]}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button
                  type="button"
                  className="w-full"
                  variant={isPopular ? 'secondary' : 'outline'}
                  onClick={() => startCheckout(pack.id)}
                  disabled={loadingId !== null}
                >
                  {loadingId === pack.id
                    ? 'Redirecting...'
                    : CTA_LABELS[pack.id]}
                </Button>
                <p
                  className={`text-xs ${
                    isPopular ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  One-time purchase. Credits do not expire.
                </p>
              </div>
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
