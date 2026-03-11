import { setRequestLocale } from 'next-intl/server';

import { CheckoutCompletedTracker, CheckoutStatusCard } from '@/components/tool';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Payment successful | Flowdockr',
  description: 'Your Flowdockr negotiation credits and support level are being confirmed.',
  canonicalUrl: '/checkout/success',
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
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const sessionId = String(query.session_id || '').trim();
  const purchaseId = String(query.purchase_id || '').trim();
  const returnTo = sanitizeReturnPath(query.return_to);
  const scenarioSlug = String(query.scenario || '').trim();

  const continuePath =
    returnTo || (scenarioSlug ? mapScenarioSlugToPricingPath(scenarioSlug) : '/pricing');

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <CheckoutCompletedTracker scenarioSlug={scenarioSlug} />
      <CheckoutStatusCard
        sessionId={sessionId}
        purchaseId={purchaseId}
        continuePath={continuePath}
      />
    </main>
  );
}
