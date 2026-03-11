import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale } from '@/config/locale';
import { ScenarioClusterSection } from '@/components/scenario-hub/ScenarioClusterSection';
import { ScenarioHubCTA } from '@/components/scenario-hub/ScenarioHubCTA';
import { ScenarioHubHero } from '@/components/scenario-hub/ScenarioHubHero';
import { ScenarioHubIntro } from '@/components/scenario-hub/ScenarioHubIntro';
import { ScenarioHubWhy } from '@/components/scenario-hub/ScenarioHubWhy';
import { PopularScenarios } from '@/components/scenario-hub/PopularScenarios';
import { PageContainer } from '@/components/shared/PageContainer';
import { scenarioHubData } from '@/content/scenario-hub';
import { buildScenarioPageMetadata } from '@/lib/seo/buildScenarioPageMetadata';

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const canonical = `${envConfigs.app_url}${localePrefix}${normalizePath(
    scenarioHubData.canonicalPath
  )}`;

  return buildScenarioPageMetadata({
    page: {
      seoTitle: scenarioHubData.seoTitle,
      metaDescription: scenarioHubData.metaDescription,
    },
    canonical,
  });
}

export default async function ScenarioHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageContainer className="max-w-6xl gap-8 py-8 md:py-10">
      <ScenarioHubHero hero={scenarioHubData.hero} />
      <ScenarioHubIntro items={scenarioHubData.handleCards} />
      <ScenarioClusterSection clusters={scenarioHubData.clusters} />
      <PopularScenarios items={scenarioHubData.popularScenarios} />
      <ScenarioHubWhy why={scenarioHubData.why} />
      <ScenarioHubCTA cta={scenarioHubData.cta} />
    </PageContainer>
  );
}
