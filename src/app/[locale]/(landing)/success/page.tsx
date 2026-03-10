import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Payment successful | Flowdockr',
  description: 'Redirecting to checkout status.',
  canonicalUrl: '/success',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const fallback = '/pricing';
  const raw = String(value || '').trim();
  if (!raw) {
    return fallback;
  }

  if (!raw.startsWith('/')) {
    return fallback;
  }

  if (raw.startsWith('//')) {
    return fallback;
  }

  return raw;
}

export default async function SuccessPage({
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
  const paramsQuery = new URLSearchParams();
  if (query.session_id) {
    paramsQuery.set('session_id', query.session_id);
  }
  if (query.purchase_id) {
    paramsQuery.set('purchase_id', query.purchase_id);
  }
  if (query.return_to) {
    paramsQuery.set('return_to', sanitizeReturnPath(query.return_to));
  }
  if (query.scenario) {
    paramsQuery.set('scenario', query.scenario);
  }

  const nextPath = paramsQuery.toString()
    ? `/checkout/success?${paramsQuery.toString()}`
    : '/checkout/success';
  redirect(nextPath);
}
