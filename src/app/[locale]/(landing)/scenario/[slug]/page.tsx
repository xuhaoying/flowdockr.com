import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ScenarioViewTracker } from '@/components/analytics/ScenarioViewTracker';
import { RelatedScenarios } from '@/components/scenario/RelatedScenarios';
import { ScenarioClientMessages } from '@/components/scenario/ScenarioClientMessages';
import { ScenarioCTA } from '@/components/scenario/ScenarioCTA';
import { ScenarioDifficulty } from '@/components/scenario/ScenarioDifficulty';
import { ScenarioHero } from '@/components/scenario/ScenarioHero';
import { ScenarioInlineTool } from '@/components/scenario/ScenarioInlineTool';
import { ScenarioOverview } from '@/components/scenario/ScenarioOverview';
import { ScenarioStickyBottomCta } from '@/components/scenario/ScenarioStickyBottomCta';
import { PageContainer } from '@/components/shared/PageContainer';
import {
  getAllScenarioPageSlugs,
  getNegotiationStageLabel,
  getRelatedScenarioLinks,
  getScenarioArchetypeLabel,
  getScenarioMetaDescription,
  getScenarioPageBySlug,
} from '@/lib/content/scenarioPages';
import { buildScenarioPageMetadata } from '@/lib/seo/buildScenarioPageMetadata';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';

const SCENARIO_ALIAS_REDIRECTS: Record<string, string> = {
  'client-says-rate-too-high': 'quote-too-high',
  'client-asks-for-discount': 'discount-request',
  'client-asks-for-extra-revisions': 'unlimited-revisions',
  'client-expands-project-scope': 'extra-work-outside-scope',
  'price-objection': 'higher-than-expected',
};

const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'rate-too-high': '/scenario/quote-too-high',
  'price-too-expensive': '/scenario/higher-than-expected',
  'extra-revisions': '/scenario/unlimited-revisions',
  'scope-creep': '/scenario/extra-work-outside-scope',
  'more-work': '/scenario/extra-work-outside-scope',
  'additional-features': '/scenario/extra-work-outside-scope',
  'lowball-offer': '/scenario/quote-too-high',
  'client-asks-discount': '/scenario/discount-request',
  'more-work-same-budget': '/scenario/extra-work-outside-scope',
  'delayed-decision': '/scenario/ghosted-after-rate',
  'small-extra-free': '/scenario/extra-work-outside-scope',
  'free-sample-work': '/pricing/free-trial-work-request',
  'client-delays-payment': '/scenario',
  'late-payment': '/scenario',
  'invoice-follow-up': '/scenario',
  'rush-delivery': '/scenario',
  'faster-turnaround': '/scenario',
  'timeline-pressure': '/scenario',
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
  const aliasSlugs = Object.keys(SCENARIO_ALIAS_REDIRECTS);
  const legacySlugs = Object.keys(LEGACY_SCENARIO_REDIRECTS);

  return locales.flatMap((locale) =>
    [...landingSlugs, ...aliasSlugs, ...legacySlugs].map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (SCENARIO_ALIAS_REDIRECTS[slug] || LEGACY_SCENARIO_REDIRECTS[slug]) {
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
  const canonical = `${envConfigs.site_url}${localePrefix}${normalizePath(
    `/scenario/${page.slug}`
  )}`;

  return buildScenarioPageMetadata({
    page: {
      title: page.title,
      metaDescription: getScenarioMetaDescription(page),
    },
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

  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const scenarioAliasSlug = SCENARIO_ALIAS_REDIRECTS[slug];
  if (scenarioAliasSlug) {
    redirect(`${localePrefix}/scenario/${scenarioAliasSlug}`);
  }

  const page = getScenarioPageBySlug(slug);
  if (page) {
    const strategyPoints = [page.strategyPrimary];
    if (page.strategySecondary) {
      strategyPoints.push(page.strategySecondary);
    }

    return (
      <>
        <PageContainer className="max-w-6xl gap-6 py-8 md:gap-8 md:py-12">
          <ScenarioViewTracker scenarioSlug={page.slug} />
          <ScenarioHero
            title={page.title}
            archetypeLabel={getScenarioArchetypeLabel(page.archetype)}
            negotiationStageLabel={getNegotiationStageLabel(
              page.negotiationStage
            )}
            primaryClientMessage={page.primaryClientMessage}
          />
          <ScenarioOverview userSituation={page.userSituation} />
          <ScenarioClientMessages
            primaryClientMessage={page.primaryClientMessage}
            clientMessageVariants={page.clientMessageVariants}
          />
          <ScenarioDifficulty points={strategyPoints} />
          <ScenarioInlineTool
            analyticsScenarioSlug={page.slug}
            defaultScenarioSlug={page.slug}
            title="Draft a reply for this situation"
            description={page.toolPromptIntent}
            primaryClientMessage={page.primaryClientMessage}
          />
          <RelatedScenarios items={getRelatedScenarioLinks(page.slug)} />
          <ScenarioCTA title={page.title} />
        </PageContainer>
        <ScenarioStickyBottomCta />
      </>
    );
  }

  const legacyPath = LEGACY_SCENARIO_REDIRECTS[slug];
  if (legacyPath) {
    redirect(`${localePrefix}${legacyPath}`);
  }

  notFound();
}
