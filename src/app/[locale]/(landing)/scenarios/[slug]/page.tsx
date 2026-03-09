import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { ScenarioExampleMessage } from '@/components/scenario/ScenarioExampleMessage';
import { ScenarioFaq } from '@/components/scenario/ScenarioFaq';
import { ScenarioHero } from '@/components/scenario/ScenarioHero';
import { ScenarioOutputPreview } from '@/components/scenario/ScenarioOutputPreview';
import { ScenarioProblem } from '@/components/scenario/ScenarioProblem';
import { RelatedScenarios } from '@/components/scenario/RelatedScenarios';
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
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

      <ScenarioHero
        scenario={scenario}
        tool={
          <ToolForm
            sourcePage="scenario"
            defaultScenarioSlug={scenario.slug}
            showScenarioSelector={false}
            placeholder={scenario.placeholder}
          />
        }
      />

      <ScenarioProblem paragraphs={scenario.problemText} />
      <ScenarioExampleMessage message={scenario.exampleClientMessage} />
      <ScenarioOutputPreview
        exampleReply={scenario.exampleReply}
        exampleAltReply={scenario.exampleAltReply}
      />

      <ScenarioStrategy scenario={scenario} />

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Save this deal context
        </h2>
        <p className="text-sm text-slate-700">
          After generating a reply, save this interaction to your deal history so you
          can revisit what worked and reuse patterns in future negotiations.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/history" className="font-semibold text-slate-900 underline">
            Open saved deals history
          </Link>
          <Link href="/tool" className="font-semibold text-slate-900 underline">
            Generate another reply
          </Link>
        </div>
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
    </main>
  );
}
