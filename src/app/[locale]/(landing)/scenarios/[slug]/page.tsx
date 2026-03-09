import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale, locales } from '@/config/locale';
import { scenarios } from '@/lib/scenarios';

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

  redirect(
    locale === defaultLocale ? `/scenario/${slug}` : `/${locale}/scenario/${slug}`
  );
}
