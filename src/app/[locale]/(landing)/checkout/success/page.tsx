import {
  CheckoutCompletedTracker,
  CheckoutStatusCard,
} from '@/components/tool';
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
  const fallback = '/pricing';
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return fallback;
  }

  return raw;
}

function mapScenarioSlugToPricingPath(slug: string): string {
  const map: Record<string, string> = {
    'quote-too-high': '/scenario/quote-too-high',
    'higher-than-expected': '/scenario/higher-than-expected',
    'justify-your-price': '/scenario/justify-your-price',
    'budget-limited': '/scenario/budget-limited',
    'do-it-for-less': '/scenario/do-it-for-less',
    'discount-request': '/scenario/discount-request',
    'cheaper-freelancer': '/scenario/cheaper-freelancer',
    'match-lower-rate': '/scenario/match-lower-rate',
    'laughs-at-rate': '/scenario/laughs-at-rate',
    'rate-before-project-details': '/scenario/rate-before-project-details',
    'hourly-rate-request': '/scenario/hourly-rate-request',
    'day-rate-request': '/scenario/day-rate-request',
    'price-range-request': '/scenario/price-range-request',
    'immediate-quote-request': '/scenario/immediate-quote-request',
    'rates-negotiable': '/scenario/rates-negotiable',
    'reduce-scope-to-lower-cost': '/scenario/reduce-scope-to-lower-cost',
    'extra-work-outside-scope': '/scenario/extra-work-outside-scope',
    'unlimited-revisions': '/scenario/unlimited-revisions',
    'project-should-be-easy': '/scenario/project-should-be-easy',
    'start-before-payment': '/scenario/start-before-payment',
    'start-immediately': '/scenario/start-immediately',
    'exclusive-low-rate': '/scenario/exclusive-low-rate',
    'ghosted-after-rate': '/scenario/ghosted-after-rate',
    'guarantee-results': '/scenario/guarantee-results',
    'lowball-offer': '/scenario/quote-too-high',
    'client-asks-discount': '/scenario/discount-request',
    'more-work-same-budget': '/scenario/extra-work-outside-scope',
    'small-extra-free': '/scenario/extra-work-outside-scope',
    'delayed-decision': '/scenario/ghosted-after-rate',
    'price-objection': '/scenario/higher-than-expected',
    'extra-revisions': '/scenario/unlimited-revisions',
    'scope-creep': '/scenario/extra-work-outside-scope',
  };

  return map[slug] || '/scenario';
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
    returnTo ||
    (scenarioSlug ? mapScenarioSlugToPricingPath(scenarioSlug) : '/scenario');

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <CheckoutCompletedTracker />
      <CheckoutStatusCard
        sessionId={sessionId}
        purchaseId={purchaseId}
        continuePath={continuePath}
      />
    </main>
  );
}
