import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Scenario-Driven Freelance Negotiation | Flowdockr',
  description:
    'Open a real client negotiation scenario and generate a strategic reply instantly.',
  canonicalUrl: '/pricing/price-pushback-after-proposal',
});

export default async function ScopePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(
    locale === defaultLocale
      ? '/pricing/price-pushback-after-proposal'
      : `/${locale}/pricing/price-pushback-after-proposal`
  );
}
