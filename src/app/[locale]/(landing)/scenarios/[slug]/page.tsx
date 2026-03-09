import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale, locales } from '@/config/locale';
import { scenarios } from '@/lib/scenarios';

type LegacyScenarioPageParams = {
  locale: string;
  slug: string;
};

const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'lowball-offer': 'price-pushback-after-proposal',
  'client-asks-discount': 'discount-pressure-before-signing',
  'cheaper-freelancer': 'cheaper-competitor-comparison',
  'free-sample-work': 'free-trial-work-request',
  'more-work-same-budget': 'more-work-same-price',
  'budget-limited': 'budget-lower-than-expected',
  'delayed-decision': 'price-pushback-after-proposal',
  'small-extra-free': 'more-work-same-price',
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
  const mapped = LEGACY_SCENARIO_REDIRECTS[slug] || 'price-pushback-after-proposal';

  redirect(
    locale === defaultLocale ? `/pricing/${mapped}` : `/${locale}/pricing/${mapped}`
  );
}
