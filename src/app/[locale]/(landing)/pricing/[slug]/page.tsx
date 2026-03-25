import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CopyReadyReplies,
  FAQBlock,
  NextDecisionPaths,
  PossibleGoals,
  RelatedGuides,
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
import { PricingScenarioViewTracker } from '@/components/analytics/PricingScenarioViewTracker';
import { PageContainer } from '@/components/shared/PageContainer';
import { getAllScenarioSlugs } from '@/lib/content/getAllScenarioSlugs';
import { getScenarioBySlug } from '@/lib/content/getScenarioBySlug';
import { buildPricingScenarioAttribution } from '@/lib/analytics/pricingAttribution';
import {
  getPricingBlueprintBySlug,
  getPricingScenarioBySlug,
} from '@/lib/pricing-cluster';
import { buildScenarioMetadata } from '@/lib/seo/buildScenarioMetadata';
import { buildScenarioHowToSchema } from '@/lib/seo/buildScenarioSchema';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { locales } from '@/config/locale';

type PricingScenarioPageParams = {
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
  const slugs = getAllScenarioSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    return {
      title: 'Pricing scenario not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${envConfigs.site_url}${normalizePath(scenario.url)}`;

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

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
