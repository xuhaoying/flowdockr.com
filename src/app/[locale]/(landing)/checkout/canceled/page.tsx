import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getPricingScenarioSlugFromPath } from '@/lib/analytics/pricingAttribution';
import { getPricingScenarioBySlug } from '@/lib/pricing-cluster';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Checkout canceled | Flowdockr',
  description: 'Your checkout was canceled. You can restart anytime.',
  canonicalUrl: '/checkout/canceled',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return '';
  }
  return raw;
}

export default async function CheckoutCanceledPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    return_to?: string;
    scenario?: string;
    pricing_slug?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const returnTo = sanitizeReturnPath(query.return_to);
  const scenarioSlug = String(query.scenario || '').trim();
  const pricingSlug =
    getPricingScenarioBySlug(String(query.pricing_slug || '').trim())?.slug ||
    getPricingScenarioSlugFromPath(returnTo);
  const returnTarget = returnTo || '/pricing';
  const backToScenario = pricingSlug
    ? `/pricing/${pricingSlug}/`
    : scenarioSlug
      ? `/scenario/${scenarioSlug}/`
      : '/pricing';

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
          <Link
            href={returnTarget}
            className="font-semibold text-slate-900 underline"
          >
            Return to pricing
          </Link>
          <Link
            href={backToScenario}
            className="font-semibold text-slate-700 underline"
          >
            Continue with pricing scenarios
          </Link>
        </div>
      </section>
    </main>
  );
}
