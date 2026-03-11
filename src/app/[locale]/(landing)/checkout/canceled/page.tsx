import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Checkout canceled | Flowdockr',
  description: 'Your checkout was canceled. You can restart anytime.',
  canonicalUrl: '/checkout/canceled',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const fallback = '/pricing';
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return fallback;
  }
  return raw;
}

function mapScenarioSlugToPricingPath(slug: string): string {
  const map: Record<string, string> = {
    'lowball-offer': '/pricing/price-pushback-after-proposal',
    'client-asks-discount': '/pricing/discount-pressure-before-signing',
    'cheaper-freelancer': '/scenario/cheaper-freelancer',
    'free-sample-work': '/pricing/free-trial-work-request',
    'more-work-same-budget': '/scenario/more-work',
    'budget-limited': '/pricing/budget-lower-than-expected',
    'small-extra-free': '/pricing/more-work-same-price',
    'delayed-decision': '/pricing/price-pushback-after-proposal',
    'client-delays-payment': '/scenario/late-payment',
    'invoice-follow-up': '/scenario/invoice-follow-up',
    'price-objection': '/scenario/price-too-expensive',
    'extra-revisions': '/scenario/extra-revisions',
    'scope-creep': '/scenario/scope-creep',
    'additional-features': '/scenario/additional-features',
    'rush-delivery': '/scenario/rush-delivery',
    'timeline-pressure': '/scenario/faster-turnaround',
  };

  return map[slug] || '/pricing';
}

export default async function CheckoutCanceledPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    return_to?: string;
    scenario?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const returnTo = sanitizeReturnPath(query.return_to);
  const scenarioSlug = String(query.scenario || '').trim();
  const backToScenario = scenarioSlug ? mapScenarioSlugToPricingPath(scenarioSlug) : '/pricing';

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Checkout canceled
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          No charge was completed. You can restart checkout anytime.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={returnTo} className="font-semibold text-slate-900 underline">
            Return to pricing
          </Link>
          <Link href={backToScenario} className="font-semibold text-slate-700 underline">
            Continue with pricing scenarios
          </Link>
        </div>
      </section>
    </main>
  );
}
