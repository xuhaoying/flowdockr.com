import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { ScenarioFaq } from '@/components/scenario/ScenarioFaq';
import { ScenarioHero } from '@/components/scenario/ScenarioHero';
import { ScenarioExampleComparison } from '@/components/scenario/ScenarioExampleComparison';
import { ScenarioProblem } from '@/components/scenario/ScenarioProblem';
import { ScenarioQuickStrategy } from '@/components/scenario/ScenarioQuickStrategy';
import { RelatedScenarios } from '@/components/scenario/RelatedScenarios';
import { ScenarioStrategicPrinciples } from '@/components/scenario/ScenarioStrategicPrinciples';
import { ScenarioStickyBottomCta } from '@/components/scenario/ScenarioStickyBottomCta';
import { ScenarioStrategy } from '@/components/scenario/ScenarioStrategy';
import { ToolForm } from '@/components/tool/ToolForm';
import { locales } from '@/config/locale';
import { Link } from '@/core/i18n/navigation';
import {
  buildScenarioArticleSchema,
  buildScenarioBreadcrumbSchema,
  buildScenarioFaqSchema,
  getScenarioCanonicalUrl,
} from '@/lib/seo';
import { getScenarioBySlug, scenarios } from '@/lib/scenarios';

type ScenarioPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    scenarios.map((scenario) => ({ locale, slug: scenario.slug }))
  );
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
    title: scenario.seoTitle,
    description: scenario.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: scenario.seoTitle,
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

  const faqSchema = buildScenarioFaqSchema(scenario);
  const articleSchema = buildScenarioArticleSchema(scenario);
  const breadcrumbSchema = buildScenarioBreadcrumbSchema(scenario);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 pb-24 md:py-10 md:pb-10">
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

      <ScenarioQuickStrategy scenario={scenario} />

      <section id="scenario-tool" className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Try your message</h2>
        <p className="text-sm text-slate-700">
          Paste the exact client wording and generate a structured reply you can send.
          2 free replies. No subscription required.
        </p>
        <ToolForm
          sourcePage="scenario"
          defaultScenarioSlug={scenario.slug}
          showScenarioSelector={false}
          placeholder={scenario.placeholder}
        />
      </section>

      <ScenarioProblem paragraphs={scenario.problemText} />
      <ScenarioExampleComparison scenario={scenario} />
      <ScenarioStrategy scenario={scenario} />
      <ScenarioStrategicPrinciples scenario={scenario} />

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Save and reuse</h2>
        <p className="text-sm text-slate-700">
          Turn useful replies into reusable deal assets. Save context and outcomes so
          future negotiation replies are faster and more consistent.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#scenario-tool" className="font-semibold text-slate-900 underline underline-offset-2">
            Save this reply
          </a>
          <Link href="/history" className="font-semibold text-slate-900 underline underline-offset-2">
            View deal history
          </Link>
        </div>
        <p className="text-xs text-slate-600">
          After generation, use <strong>Save to deals</strong> in the output panel.
        </p>
      </section>

      <RelatedScenarios slugs={scenario.relatedSlugs} />
      <ScenarioFaq scenario={scenario} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Continue generating replies</h2>
        <p className="mt-1 text-sm text-slate-700">
          Try more scenarios or buy credits when you need more than 2 free replies.
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <Link href="/scenario" className="font-semibold text-slate-900 underline">
            Browse all scenarios
          </Link>
          <Link href="/pricing" className="font-semibold text-slate-900 underline">
            View credits pricing
          </Link>
          <Link href="/tool" className="font-semibold text-slate-900 underline">
            Open generic tool
          </Link>
        </div>
      </section>

      <ScenarioStickyBottomCta />
    </main>
  );
}
