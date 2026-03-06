import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale } from '@/config/locale';
import {
  getRelatedScenarios,
  getScenarioBySlug,
  scenarioCatalog,
} from '@/lib/promptTemplates';
import {
  NegotiationTool,
  ScenarioHeader,
  ScenarioLinks,
} from '@/shared/blocks/scenarios';

type ScenarioPageParams = {
  locale: string;
  slug: string;
};

export async function generateStaticParams() {
  return scenarioCatalog.map((scenario) => ({
    slug: scenario.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    return {
      title: 'Scenario not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/scenarios/${scenario.slug}`;
  const canonicalUrl = `${envConfigs.app_url}${
    locale === defaultLocale ? '' : `/${locale}`
  }${canonicalPath}`;

  return {
    title: scenario.pageTitle,
    description: scenario.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: scenario.pageTitle,
      description: scenario.metaDescription,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const scenario = getScenarioBySlug(slug);
  if (!scenario) {
    notFound();
  }

  const relatedScenarios = getRelatedScenarios(scenario.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: scenario.h1,
    description: scenario.shortExplanation,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Paste client message',
        text: 'Paste the exact client message into the tool input.',
      },
      {
        '@type': 'HowToStep',
        name: 'Generate reply',
        text: 'Click Generate reply and get a professional negotiation response.',
      },
      {
        '@type': 'HowToStep',
        name: 'Send and continue',
        text: 'Use the response as-is or adjust the tone before sending to the client.',
      },
    ],
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ScenarioHeader scenario={scenario} />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Why clients say this</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground md:text-base">
          {scenario.whyClientsSayThis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Common mistakes freelancers make</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground md:text-base">
          {scenario.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Example of the situation</h2>
        <div className="rounded-md border bg-muted/40 p-4 text-sm leading-relaxed md:text-base">
          {scenario.situationExample}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Generate a professional reply</h2>
        <NegotiationTool scenarioSlug={scenario.slug} />
      </section>

      <ScenarioLinks items={relatedScenarios} />
    </main>
  );
}
