import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Freelance Negotiation Scenarios | Flowdockr',
  description: 'Open scenario-first negotiation flows and generate client replies instantly.',
  canonicalUrl: '/pricing',
});

export default async function CreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(locale === defaultLocale ? '/pricing' : `/${locale}/pricing`);
}
