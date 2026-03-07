import { setRequestLocale } from 'next-intl/server';

import { CheckoutCompletedTracker, CheckoutStatusCard } from '@/components/tool';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Payment successful | Flowdockr',
  description: 'Your Flowdockr credits are being confirmed.',
  canonicalUrl: '/checkout/success',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const fallback = '/scenarios';
  const raw = String(value || '').trim();
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return fallback;
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
    returnTo || (scenarioSlug ? `/scenarios/${scenarioSlug}` : '/scenarios');

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
