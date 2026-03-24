import { permanentRedirect } from 'next/navigation';
import { scenarios } from '@/lib/scenarios';
import { setRequestLocale } from 'next-intl/server';

import { locales } from '@/config/locale';
import { getLegacyScenarioRedirectPath } from '@/lib/routing/legacyScenarioRedirects';

type LegacyScenarioPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    scenarios.map((scenario) => ({ locale, slug: scenario.slug }))
  );
}

export default async function LegacyScenarioPageRedirect({
  params,
}: {
  params: Promise<LegacyScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const mapped = getLegacyScenarioRedirectPath(slug);

  permanentRedirect(mapped);
}
