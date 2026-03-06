import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import {
  RelatedScenarios,
  ScenarioExamples,
  ScenarioFAQ,
  ScenarioHero,
} from '@/components/seo';
import { ReplyGeneratorCard } from '@/components/tool';
import {
  buildScenarioArticleSchema,
  buildScenarioBreadcrumbSchema,
  buildScenarioFaqSchema,
  getScenarioCanonicalUrl,
} from '@/lib/seo';
import { getRelatedScenarios, getScenarioBySlug, scenarios } from '@/lib/scenarios';

type ScenarioPageParams = {
  locale: string;
  slug: string;
};

export async function generateStaticParams() {
  return scenarios.map((scenario) => ({
    slug: scenario.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ScenarioPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
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

  const canonicalUrl = getScenarioCanonicalUrl(scenario.slug);
  return {
    title: `${scenario.seoTitle} | Flowdockr`,
    description: scenario.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${scenario.seoTitle} | Flowdockr`,
      description: scenario.seoDescription,
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
  const faqSchema = buildScenarioFaqSchema(scenario);
  const articleSchema = buildScenarioArticleSchema(scenario);
  const breadcrumbSchema = buildScenarioBreadcrumbSchema(scenario);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <article className="space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <ScenarioHero scenario={scenario} />

        <section id="tool" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Generate your reply</h2>
          <ReplyGeneratorCard
            scenarioSlug={scenario.slug}
            defaultTone={
              scenario.promptContext.defaultTone as
                | 'professional_firm'
                | 'warm_confident'
                | 'direct'
                | 'diplomatic'
            }
          />
        </section>

        <section id="quick-answer" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Best way to respond</h2>
          <p className="text-muted-foreground">{scenario.problemSummary}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground md:text-base">
            {scenario.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <ScenarioExamples scenario={scenario} />

        <section id="mistakes" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Mistakes to avoid</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground md:text-base">
            {scenario.mistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <ScenarioFAQ scenario={scenario} />

        <RelatedScenarios
          relatedScenarios={relatedScenarios}
          currentScenarioSlug={scenario.slug}
        />
      </article>
    </main>
  );
}
