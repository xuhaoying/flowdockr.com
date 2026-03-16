import { permanentRedirect } from 'next/navigation';
import { scenarios } from '@/lib/scenarios';
import { setRequestLocale } from 'next-intl/server';

import { defaultLocale, locales } from '@/config/locale';

type LegacyScenarioPageParams = {
  locale: string;
  slug: string;
};

const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'lowball-offer': '/scenario/quote-too-high',
  'client-asks-discount': '/scenario/discount-request',
  'cheaper-freelancer': '/scenario/cheaper-freelancer',
  'free-sample-work': '/pricing/free-trial-work-request',
  'more-work-same-budget': '/scenario/extra-work-outside-scope',
  'budget-limited': '/scenario/budget-limited',
  'delayed-decision': '/scenario/ghosted-after-rate',
  'small-extra-free': '/scenario/extra-work-outside-scope',
  'client-delays-payment': '/scenario',
  'invoice-follow-up': '/scenario',
  'price-objection': '/scenario/higher-than-expected',
  'extra-revisions': '/scenario/unlimited-revisions',
  'scope-creep': '/scenario/extra-work-outside-scope',
  'additional-features': '/scenario/extra-work-outside-scope',
  'rush-delivery': '/scenario',
  'timeline-pressure': '/scenario',
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
  const mapped = LEGACY_SCENARIO_REDIRECTS[slug] || `/scenario/${slug}`;

  permanentRedirect(locale === defaultLocale ? mapped : `/${locale}${mapped}`);
}
