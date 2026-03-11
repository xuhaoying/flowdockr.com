import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { PageContainer } from '@/components/shared/PageContainer';
import { RelatedScenarios } from '@/components/scenario/RelatedScenarios';
import { ScenarioCTA } from '@/components/scenario/ScenarioCTA';
import { ScenarioDifficulty } from '@/components/scenario/ScenarioDifficulty';
import { ScenarioHero } from '@/components/scenario/ScenarioHero';
import { ScenarioInlineTool } from '@/components/scenario/ScenarioInlineTool';
import { ScenarioMistakes } from '@/components/scenario/ScenarioMistakes';
import { ScenarioOverview } from '@/components/scenario/ScenarioOverview';
import { getAllScenarioPageSlugs, getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import { buildScenarioPageMetadata } from '@/lib/seo/buildScenarioPageMetadata';

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

type ScenarioPageParams = {
  locale: string;
  slug: string;
};

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const landingSlugs = getAllScenarioPageSlugs();
  const legacySlugs = Object.keys(LEGACY_SCENARIO_REDIRECTS);

  return locales.flatMap((locale) =>
    [...landingSlugs, ...legacySlugs].map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (LEGACY_SCENARIO_REDIRECTS[slug]) {
    return {
      title: 'Negotiation scenario | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const page = getScenarioPageBySlug(slug);
  if (!page) {
    return {
      title: 'Scenario not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const canonical = `${envConfigs.app_url}${localePrefix}${normalizePath(page.canonicalPath)}`;

  return buildScenarioPageMetadata({
    page,
    canonical,
  });
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const legacyPricingSlug = LEGACY_SCENARIO_REDIRECTS[slug];
  if (legacyPricingSlug) {
    const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
    redirect(`${localePrefix}/pricing/${legacyPricingSlug}`);
  }

  const page = getScenarioPageBySlug(slug);
  if (!page) {
    notFound();
  }

  return (
    <PageContainer className="max-w-5xl gap-8 py-8 md:py-10">
      <ScenarioHero scenario={page} />
      <ScenarioOverview overview={page.overview} />
      <ScenarioDifficulty points={page.difficultyPoints} />
      <ScenarioMistakes
        mistakes={page.commonMistakes}
        closingLine={page.mistakesClosingLine}
      />
      <ScenarioInlineTool toolPreset={page.toolPreset} />
      <RelatedScenarios items={page.relatedScenarios} />
      <ScenarioCTA cta={page.cta} />
    </PageContainer>
  );
}
