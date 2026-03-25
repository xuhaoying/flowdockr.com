import {
  CheckoutCompletedTracker,
  CheckoutStatusCard,
} from '@/components/tool';
import {
  getPricingScenarioSlugFromPath,
  isPricingAnalyticsSourceSurface,
} from '@/lib/analytics/pricingAttribution';
import { getPricingScenarioBySlug } from '@/lib/pricing-cluster';
import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Payment successful | Flowdockr',
  description:
    'Your Flowdockr negotiation credits and support level are being confirmed.',
  canonicalUrl: '/checkout/success',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return '';
  }

  return raw;
}

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    session_id?: string;
    purchase_id?: string;
    return_to?: string;
    scenario?: string;
    pricing_slug?: string;
    pricing_source_surface?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const sessionId = String(query.session_id || '').trim();
  const purchaseId = String(query.purchase_id || '').trim();
  const returnTo = sanitizeReturnPath(query.return_to);
  const scenarioSlug = String(query.scenario || '').trim();
  const pricingSlug =
    getPricingScenarioBySlug(String(query.pricing_slug || '').trim())?.slug ||
    getPricingScenarioSlugFromPath(returnTo);
  const sourceSurface = String(query.pricing_source_surface || '').trim();
  const pricingScenario = pricingSlug ? getPricingScenarioBySlug(pricingSlug) : null;
  const pricingAttribution = pricingScenario
    ? {
        pricingSlug: pricingScenario.slug,
        sourceSurface: isPricingAnalyticsSourceSurface(sourceSurface)
          ? sourceSurface
          : 'pricing_page',
        locale,
      }
    : undefined;

  const continuePath = pricingSlug
    ? `/pricing/${pricingSlug}/`
    : returnTo || (scenarioSlug ? `/scenario/${scenarioSlug}/` : '/pricing');

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <CheckoutCompletedTracker />
      <CheckoutStatusCard
        sessionId={sessionId}
        purchaseId={purchaseId}
        continuePath={continuePath}
        pricingAttribution={pricingAttribution}
      />
    </main>
  );
}
