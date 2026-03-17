import { permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { getLocalizedPublicPath } from '@/lib/trust';

export default async function LegacyTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  permanentRedirect(getLocalizedPublicPath('/terms', locale));
}
