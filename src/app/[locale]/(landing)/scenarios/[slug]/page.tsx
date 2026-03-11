import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale, locales } from '@/config/locale';
import { scenarios } from '@/lib/scenarios';

type LegacyScenarioPageParams = {
  locale: string;
  slug: string;
};

const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'lowball-offer': '/pricing/price-pushback-after-proposal',
  'client-asks-discount': '/pricing/discount-pressure-before-signing',
  'cheaper-freelancer': '/scenario/cheaper-freelancer',
  'free-sample-work': '/pricing/free-trial-work-request',
  'more-work-same-budget': '/scenario/more-work',
  'budget-limited': '/pricing/budget-lower-than-expected',
  'delayed-decision': '/pricing/price-pushback-after-proposal',
  'small-extra-free': '/pricing/more-work-same-price',
  'client-delays-payment': '/scenario/late-payment',
  'invoice-follow-up': '/scenario/invoice-follow-up',
  'price-objection': '/scenario/price-too-expensive',
  'extra-revisions': '/scenario/extra-revisions',
  'scope-creep': '/scenario/scope-creep',
  'additional-features': '/scenario/additional-features',
  'rush-delivery': '/scenario/rush-delivery',
  'timeline-pressure': '/scenario/faster-turnaround',
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
  const mapped = LEGACY_SCENARIO_REDIRECTS[slug] || '/pricing/price-pushback-after-proposal';

  redirect(locale === defaultLocale ? mapped : `/${locale}${mapped}`);
}
