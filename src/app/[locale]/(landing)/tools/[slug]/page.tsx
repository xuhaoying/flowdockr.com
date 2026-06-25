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
import type { DealTone } from '@/types/deals';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { locales } from '@/config/locale';

const defaultGeneratorScenarioByToolSlug: Record<string, string> = {
  'reply-generator': 'discount-request',
  'price-negotiation-email-generator': 'quote-too-high',
};

const REPLY_GENERATOR_PREFILLS: Record<
  string,
  {
    message: string;
    tone: DealTone;
    taskContext: string;
    workspaceDescription: string;
  }
> = {
  'unpaid-invoice-follow-up': {
    message:
      'Hi Sarah, following up on invoice #0187, which was due on March 20. It still appears open on my side, so I wanted to check whether payment is scheduled and if there is an expected date I should note.',
    tone: 'professional',
    taskContext: 'Goal: confirm payment timing without escalating too early.',
    workspaceDescription:
      'Loaded a starting unpaid-invoice follow-up draft. Recommended tone: Professional. Replace it with the real client thread or edit from this example.',
  },
  'extra-work-outside-scope': {
    message:
      'Thanks for sending these additions through. They go beyond the original scope we agreed, so I would need to treat them as extra work rather than include them in the current budget. I can either quote the added work separately or suggest a reduced-scope option that stays within the current budget.',
    tone: 'firm',
    taskContext: 'Goal: protect scope and keep the next step clear.',
    workspaceDescription:
      'Loaded a starting out-of-scope reply draft. Recommended tone: Firm. Edit the message or paste the exact client request before generating.',
  },
  'client-no-response-follow-up': {
    message:
      'Hi James, following up on the proposal I sent earlier this week in case it is still under review. If helpful, I can also summarize the recommended next step or adjust timing based on your schedule.',
    tone: 'professional',
    taskContext: 'Goal: reopen the conversation without sounding needy.',
    workspaceDescription:
      'Loaded a starting no-response follow-up draft. Recommended tone: Professional. Replace it with the real thread if you already have the exact message.',
  },
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

type ToolPageSearchParams = {
  scenario?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
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
  searchParams: Promise<ToolPageSearchParams>;
}) {
  const { locale, slug } = await params;
  const {
    scenario,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
  } = await searchParams;
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
  const replyGeneratorPrefill =
    tool.slug === 'reply-generator'
      ? REPLY_GENERATOR_PREFILLS[defaultScenarioSlug] || null
      : null;
  const loadedContextTitle =
    pricingScenario?.h1 || generatorScenario?.h1 || '';
  const loadedContextLabel = pricingScenario
    ? 'Context loaded from scenario:'
    : generatorScenario
      ? 'Reply task loaded from source page:'
      : '';
  const loadedContextSummary = replyGeneratorPrefill?.taskContext || '';
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

      {loadedContextTitle ? (
        <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p>
            {loadedContextLabel}{' '}
            <span className="font-semibold text-slate-900">
              {loadedContextTitle}
            </span>
          </p>
          {loadedContextSummary ? (
            <p className="mt-1 text-xs text-slate-600">{loadedContextSummary}</p>
          ) : null}
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
        toolSlug={tool.slug}
        analyticsScenarioSlug={requestedScenario || defaultScenarioSlug}
        sourcePage="tool"
        defaultScenarioSlug={defaultScenarioSlug}
        initialMessage={replyGeneratorPrefill?.message}
        initialTone={replyGeneratorPrefill?.tone}
        initialUserRateContext={replyGeneratorPrefill?.taskContext}
        prefillHint={replyGeneratorPrefill?.workspaceDescription}
        sourceAttribution={{
          sourceOrigin: utmSource,
          sourcePageType: utmMedium,
          sourcePageSlug: utmContent,
          sourceCampaign: utmCampaign,
        }}
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
        workspaceDescription={
          replyGeneratorPrefill?.workspaceDescription ||
          '2 free negotiation credits. No subscription required.'
        }
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
