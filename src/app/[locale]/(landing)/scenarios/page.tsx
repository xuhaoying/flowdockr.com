import { permanentRedirect } from 'next/navigation';
import { getLegacyScenariosHubRedirectPath } from '@/lib/routing/legacyScenarioRedirects';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale } from '@/config/locale';

export default async function LegacyScenariosPageRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  permanentRedirect(
    locale === defaultLocale
      ? getLegacyScenariosHubRedirectPath()
      : `/${locale}${getLegacyScenariosHubRedirectPath()}`
  );
}
