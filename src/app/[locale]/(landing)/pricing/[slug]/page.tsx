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
  getPricingBlueprintBySlug,
  pricingScenarios,
} from '@/lib/pricing-cluster';
import { buildPricingScenarioMetadata } from '@/lib/seo/buildMetadata';

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
  const blueprint = getPricingBlueprintBySlug(slug);

  if (!scenario || !blueprint) {
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

  return buildPricingScenarioMetadata({
    scenario: blueprint,
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

  const scenario = getPricingScenarioBySlug(slug);
  if (!scenario) {
    notFound();
  }

  const blueprint = getPricingBlueprintBySlug(scenario.slug);
  if (!blueprint) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 pb-24 md:py-10 md:pb-10">
      <HowToSchema scenario={blueprint} />
      <ScenarioHero scenario={scenario} />
      <TaxonomySnapshot scenario={scenario} />
      <SituationSnapshot scenario={scenario} />
      <WhatsReallyHappening scenario={scenario} />
      <PossibleGoals scenario={scenario} />
      <StrategyPaths scenario={scenario} />
      <CopyReadyReplies scenario={scenario} />
      <AIGeneratorTool scenario={scenario} scenarioSlug={scenario.slug} cta={blueprint.toolCta} />
      <NextDecisionPaths links={blueprint.nextDecisionLinks} />
      <RelatedGuides items={scenario.guideLinks || []} />
      <FAQBlock scenario={scenario} />
      <ScenarioStickyCta />
    </main>
  );
}
