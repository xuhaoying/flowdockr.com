import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Privacy | Flowdockr',
  description: 'Privacy policy for Flowdockr.',
  canonicalUrl: '/privacy',
});

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(locale === defaultLocale ? '/privacy-policy' : `/${locale}/privacy-policy`);
}
