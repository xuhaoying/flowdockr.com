import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Scenario-Driven Negotiation Assistant | Flowdockr',
  description:
    'Open a negotiation scenario and generate a professional freelance client reply instantly.',
  canonicalUrl: '/scenario/lowball-offer',
});

export default async function DealPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(
    locale === defaultLocale
      ? '/scenario/lowball-offer'
      : `/${locale}/scenario/lowball-offer`
  );
}
