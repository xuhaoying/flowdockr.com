import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import {
  AIGeneratorTool,
  CopyReadyReplies,
  FAQBlock,
  HowToSchema,
  NextDecisionPaths,
  PossibleGoals,
  RelatedGuides,
  ScenarioHero,
  ScenarioStickyCta,
  SituationSnapshot,
  StrategyPaths,
  TaxonomySnapshot,
  WhatsReallyHappening,
} from '@/components/pricing-scenario';
import {
  getPricingScenarioBySlug,
  getRelatedPricingScenarios,
  pricingScenarios,
} from '@/lib/pricing-cluster';

type PricingScenarioPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pricingScenarios.map((scenario) => ({ locale, slug: scenario.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const scenario = getPricingScenarioBySlug(slug);

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
  const canonical = `${envConfigs.app_url}${localePrefix}/pricing/${scenario.slug}`;

  return {
    title: scenario.seoTitle,
    description: scenario.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [...scenario.schema.primaryKeywords, ...scenario.schema.supportKeywords],
    openGraph: {
      title: scenario.seoTitle,
      description: scenario.metaDescription,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function PricingScenarioPage({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const scenario = getPricingScenarioBySlug(slug);
  if (!scenario) {
    notFound();
  }

  const nextDecisions = getRelatedPricingScenarios(scenario.nextDecisionSlugs);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 pb-24 md:py-10 md:pb-10">
      <HowToSchema scenario={scenario} />
      <ScenarioHero scenario={scenario} />
      <TaxonomySnapshot scenario={scenario} />
      <SituationSnapshot scenario={scenario} />
      <WhatsReallyHappening scenario={scenario} />
      <PossibleGoals scenario={scenario} />
      <StrategyPaths scenario={scenario} />
      <CopyReadyReplies scenario={scenario} />
      <AIGeneratorTool scenario={scenario} />
      <NextDecisionPaths items={nextDecisions} />
      <RelatedGuides items={scenario.guideLinks || []} />
      <FAQBlock scenario={scenario} />
      <ScenarioStickyCta />
    </main>
  );
}
