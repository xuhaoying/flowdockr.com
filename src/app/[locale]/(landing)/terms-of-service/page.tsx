import { permanentRedirect } from 'next/navigation';
import { getLocalizedPublicPath } from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

export default async function LegacyTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  permanentRedirect(getLocalizedPublicPath('/terms', locale));
}
