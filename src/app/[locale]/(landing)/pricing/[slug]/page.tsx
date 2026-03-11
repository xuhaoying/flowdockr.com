import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { CoreFearBlock } from '@/components/scenario/CoreFearBlock';
import { ExampleReplies } from '@/components/scenario/ExampleReplies';
import { HubBackLink } from '@/components/scenario/HubBackLink';
import { NextDecisionLinks } from '@/components/scenario/NextDecisionLinks';
import { ScenarioFaq } from '@/components/scenario/ScenarioFaq';
import { PricingScenarioHero } from '@/components/scenario/PricingScenarioHero';
import { SituationSummary } from '@/components/scenario/SituationSummary';
import { StrategyPaths } from '@/components/scenario/StrategyPaths';
import { ToolCtaBlock } from '@/components/scenario/ToolCtaBlock';
import { PageContainer } from '@/components/shared/PageContainer';
import { getAllScenarioSlugs } from '@/lib/content/getAllScenarioSlugs';
import { getScenarioBySlug } from '@/lib/content/getScenarioBySlug';
import { buildScenarioMetadata } from '@/lib/seo/buildScenarioMetadata';
import { buildScenarioHowToSchema } from '@/lib/seo/buildScenarioSchema';

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
  const { locale, slug } = await params;
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

  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const canonical = `${envConfigs.app_url}${localePrefix}${normalizePath(scenario.url)}`;

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

  const scenario = getScenarioBySlug(slug);
  if (!scenario) {
    notFound();
  }

  const schema = buildScenarioHowToSchema(scenario);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PricingScenarioHero scenario={scenario} />
      <SituationSummary scenario={scenario} />
      <CoreFearBlock scenario={scenario} />
      <StrategyPaths scenario={scenario} />
      <ExampleReplies scenario={scenario} />
      <ToolCtaBlock scenario={scenario} />
      <NextDecisionLinks scenario={scenario} />
      <HubBackLink scenario={scenario} />
      <ScenarioFaq scenario={scenario} />
    </PageContainer>
  );
}
