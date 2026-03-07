import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Terms | Flowdockr',
  description: 'Terms for using Flowdockr.',
  canonicalUrl: '/terms',
});

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(
    locale === defaultLocale ? '/terms-of-service' : `/${locale}/terms-of-service`
  );
}
