import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PricingCards } from '@/components/pricing/PricingCards';
import { RelatedScenarios } from '@/components/tool/RelatedScenarios';
import { ToolBestFor } from '@/components/tool/ToolBestFor';
import { ToolExample } from '@/components/tool/ToolExample';
import { ToolForm } from '@/components/tool/ToolForm';
import { ToolHero } from '@/components/tool/ToolHero';
import { ToolInputPreview } from '@/components/tool/ToolInputPreview';
import { ToolUseCases } from '@/components/tool/ToolUseCases';
import { buildPricingScenarioAttribution } from '@/lib/analytics/pricingAttribution';
import { getToolSurfaceScenarioLinks } from '@/lib/content/scenarioPages';
import { getAllToolSlugs } from '@/lib/content/getAllToolSlugs';
import {
  getDefaultGeneratorScenarioSlug,
  getScenarioBySlug as getPricingScenarioBySlug,
} from '@/lib/content/getScenarioBySlug';
import { getToolBySlug } from '@/lib/content/getToolBySlug';
import { getPricingScenarioBySlug as getPricingClusterScenarioBySlug } from '@/lib/pricing-cluster';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';
import { buildToolMetadata } from '@/lib/seo/buildToolMetadata';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { locales } from '@/config/locale';

const defaultGeneratorScenarioByToolSlug: Record<string, string> = {
  'reply-generator': 'discount-request',
  'price-negotiation-email-generator': 'quote-too-high',
};

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

type ToolPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ToolPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${envConfigs.site_url}${normalizePath(tool.url)}`;

  return buildToolMetadata({
    tool,
    canonical,
  });
}

export default async function ToolPage({
  params,
  searchParams,
}: {
  params: Promise<ToolPageParams>;
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { locale, slug } = await params;
  const { scenario } = await searchParams;
  setRequestLocale(locale);

  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }

  const requestedScenario = typeof scenario === 'string' ? scenario.trim() : '';
  const pricingScenario = requestedScenario
    ? getPricingScenarioBySlug(requestedScenario)
    : null;
  const pricingClusterScenario = requestedScenario
    ? getPricingClusterScenarioBySlug(requestedScenario)
    : null;
  const generatorScenario = requestedScenario
    ? getGeneratorScenarioBySlug(requestedScenario)
    : null;

  const defaultScenarioSlug = pricingScenario
    ? getDefaultGeneratorScenarioSlug(pricingScenario.slug)
    : generatorScenario?.slug ||
      defaultGeneratorScenarioByToolSlug[tool.slug] ||
      'quote-too-high';
  const pricingAttribution = pricingScenario
    ? buildPricingScenarioAttribution({
        pricingSlug: pricingClusterScenario?.slug || '',
        sourceSurface: 'tool_page',
        locale,
      })
    : null;

  const previewScenario = getGeneratorScenarioBySlug(defaultScenarioSlug);
  const curatedRelatedScenarioLinks = getToolSurfaceScenarioLinks(
    tool.slug,
    tool.relatedScenarios.length
  );
  const relatedScenarioLinks =
    curatedRelatedScenarioLinks.length > 0
      ? curatedRelatedScenarioLinks
      : tool.relatedScenarios;
  const clientMessageInput = tool.inputs.find(
    (input) => input.name === 'clientMessage'
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <ToolHero tool={tool} />

      {pricingScenario ? (
        <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Context loaded from scenario:{' '}
          <span className="font-semibold text-slate-900">
            {pricingScenario.h1}
          </span>
        </section>
      ) : null}

      <section className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Paste the message now
        </h2>
        <p className="text-sm text-slate-700">
          Paste the exact client message and generate a draft built for the
          pressure in the conversation.
        </p>
      </section>

      <ToolForm
        analyticsScenarioSlug={requestedScenario || defaultScenarioSlug}
        sourcePage="tool"
        defaultScenarioSlug={defaultScenarioSlug}
        pricingAttribution={
          pricingAttribution
            ? {
                pricingSlug: pricingAttribution.pricingSlug,
                sourceSurface: pricingAttribution.sourceSurface,
                locale: pricingAttribution.locale,
              }
            : undefined
        }
        showScenarioSelector={false}
        placeholder={clientMessageInput?.placeholder}
      />

      {previewScenario ? (
        <ToolExample scenario={previewScenario} title="Example output" />
      ) : null}
      <ToolBestFor items={tool.bestFor} />
      <ToolInputPreview inputs={tool.inputs} />
      <ToolUseCases useCases={tool.exampleUseCases} />
      <RelatedScenarios links={relatedScenarioLinks} />

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Credits and access
        </h2>
        <p className="text-sm text-slate-700">
          Start with 2 free drafts, then use credits when you need more active
          deal output.
        </p>
        <PricingCards sourcePage="tool" />
      </section>

      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Link
          href="/tools/"
          className="text-sm font-semibold text-slate-900 underline underline-offset-2"
        >
          Back to tools
        </Link>
        <Link
          href="/scenario/"
          className="text-sm font-semibold text-slate-900 underline underline-offset-2"
        >
          Browse scenarios
        </Link>
      </section>
    </main>
  );
}
