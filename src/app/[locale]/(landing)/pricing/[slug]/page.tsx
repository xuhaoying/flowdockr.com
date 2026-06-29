import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PricingScenarioViewTracker } from '@/components/analytics/PricingScenarioViewTracker';
import {
  CopyReadyReplies,
  FAQBlock,
  NextDecisionPaths,
  PossibleGoals,
  RelatedGuides,
  RelatedScenarioScripts,
  ScenarioHero,
  SituationSnapshot,
  StrategyPaths,
  TaxonomySnapshot,
  WhatsReallyHappening,
} from '@/components/pricing-scenario';
import { CommonClientMessages } from '@/components/scenario/CommonClientMessages';
import { CommonMistakes } from '@/components/scenario/CommonMistakes';
import { HubBackLink } from '@/components/scenario/HubBackLink';
import { PricingScenarioInlineTool } from '@/components/scenario/PricingScenarioInlineTool';
import { ToolCtaBlock } from '@/components/scenario/ToolCtaBlock';
import { PageContainer } from '@/components/shared/PageContainer';
import { buildPricingScenarioAttribution } from '@/lib/analytics/pricingAttribution';
import { getAllScenarioSlugs } from '@/lib/content/getAllScenarioSlugs';
import { getScenarioBySlug } from '@/lib/content/getScenarioBySlug';
import { getPricingRelatedScenarioScripts } from '@/lib/content/pricingRelatedScenarios';
import {
  getPricingBlueprintBySlug,
  getPricingScenarioBySlug,
} from '@/lib/pricing-cluster';
import { buildScenarioMetadata } from '@/lib/seo/buildScenarioMetadata';
import {
  buildFaqPageSchema,
  buildScenarioHowToSchema,
} from '@/lib/seo/buildScenarioSchema';
import { getPricingScenarioCanonicalUrl } from '@/lib/seo/indexing';
import { setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { envConfigs } from '@/config';
import { locales } from '@/config/locale';
import { AppContextProvider } from '@/shared/contexts/app';
import { getLocalPage, getLocalPageSlugs } from '@/shared/models/post';

type PricingScenarioPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllScenarioSlugs();
  const pricingPageSlugs = getLocalPageSlugs()
    .filter((slug) => slug.startsWith('pricing/'))
    .map((slug) => slug.replace(/^pricing\//, ''));
  const allSlugs = Array.from(new Set([...slugs, ...pricingPageSlugs]));
  return locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    const staticPage = await getLocalPage({ slug: `pricing/${slug}`, locale });
    if (staticPage) {
      return {
        title: staticPage.title,
        description: staticPage.description,
        alternates: {
          canonical: `${envConfigs.site_url}/pricing/${slug}`,
        },
      };
    }

    return {
      title: 'Pricing scenario not found | FlowDockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = getPricingScenarioCanonicalUrl(
    scenario,
    envConfigs.site_url
  );

  return buildScenarioMetadata({
    scenario,
    canonical,
  });
}

export default async function PricingScenarioPage({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getScenarioBySlug(slug);
  const scenario = getPricingScenarioBySlug(slug);
  const blueprint = getPricingBlueprintBySlug(slug);

  if (!page || !scenario || !blueprint) {
    const staticPage = await getLocalPage({ slug: `pricing/${slug}`, locale });
    if (staticPage) {
      const StaticPage = await getThemePage('static-page');
      return (
        <AppContextProvider>
          <StaticPage locale={locale} post={staticPage} />
        </AppContextProvider>
      );
    }

    notFound();
  }

  const pricingAttribution = buildPricingScenarioAttribution({
    pricingSlug: scenario.slug,
    sourceSurface: 'pricing_page',
    locale,
  });

  const schema = buildScenarioHowToSchema({
    h1: page.h1,
    metaDescription: page.metaDescription,
    strategyPaths: page.strategyPaths,
  });
  const faqSchema = buildFaqPageSchema(
    scenario.faq.map((item) => ({
      question: item.q,
      answer: item.a,
    }))
  );
  const relatedScenarioScripts = getPricingRelatedScenarioScripts(
    scenario.slug,
    scenario.generatorScenarioSlug
  );

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {pricingAttribution ? (
        <PricingScenarioViewTracker attribution={pricingAttribution} />
      ) : null}
      <ScenarioHero scenario={scenario} />
      <PricingScenarioInlineTool
        scenario={page}
        pricingAttribution={pricingAttribution || undefined}
      />
      <SituationSnapshot scenario={scenario} />
      <WhatsReallyHappening scenario={scenario} />
      <CommonClientMessages scenario={page} />
      <RelatedScenarioScripts items={relatedScenarioScripts} />
      <PossibleGoals scenario={scenario} />
      <StrategyPaths scenario={scenario} />
      <CopyReadyReplies scenario={scenario} />
      <CommonMistakes scenario={page} />
      <FAQBlock scenario={scenario} />
      <NextDecisionPaths links={blueprint.nextDecisionLinks} />
      <RelatedGuides items={scenario.guideLinks || []} />
      <TaxonomySnapshot scenario={scenario} />
      <ToolCtaBlock scenario={page} />
      <HubBackLink scenario={page} />
    </PageContainer>
  );
}
