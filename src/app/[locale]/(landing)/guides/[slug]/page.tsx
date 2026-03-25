import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { GuideFaq } from '@/components/guide/GuideFaq';
import { GuideHero } from '@/components/guide/GuideHero';
import { GuideLinkGrid } from '@/components/guide/GuideLinkGrid';
import { GuideSectionBlocks } from '@/components/guide/GuideSectionBlocks';
import { GuideTakeaways } from '@/components/guide/GuideTakeaways';
import { RecommendedScenarios } from '@/components/guide/RecommendedScenarios';
import { locales } from '@/config/locale';
import { Link } from '@/core/i18n/navigation';
import { getAllGuideSlugs } from '@/lib/content/getAllGuideSlugs';
import { getGuideBySlug } from '@/lib/content/getGuideBySlug';
import { getToolBySlug } from '@/lib/content/getToolBySlug';
import { buildGuideMetadata } from '@/lib/seo/buildGuideMetadata';

function getScenarioSlugFromHref(href: string): string | null {
  const segments = href.split('/').filter(Boolean);
  return segments.at(-1) ?? null;
}

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

type GuidePageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<GuidePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${envConfigs.site_url}${normalizePath(guide.url)}`;

  return buildGuideMetadata({
    guide,
    canonical,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<GuidePageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  const suggestedScenarioSlug = guide.recommendedScenarios[0]
    ? getScenarioSlugFromHref(guide.recommendedScenarios[0].href)
    : null;

  const guideTool = getToolBySlug(guide.toolCta.toolSlug);
  const toolBaseHref = guideTool?.url ?? `/tools/${guide.toolCta.toolSlug}/`;
  const toolHref = suggestedScenarioSlug
    ? `${toolBaseHref}?scenario=${encodeURIComponent(suggestedScenarioSlug)}`
    : toolBaseHref;
  const hubHref =
    guide.hubLink?.href ||
    (guide.cluster === 'pricing' ? '/pricing/' : guide.cluster === 'payment' ? '/payment/' : '/guides/');
  const hubLabel =
    guide.hubLink?.label ||
    (guide.cluster === 'pricing'
      ? 'Browse pricing scenarios'
      : guide.cluster === 'payment'
        ? 'Open payment hub'
        : 'Back to guides');

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:py-10">
      <GuideHero guide={guide} />
      {guide.hubLink ? (
        <GuideLinkGrid
          title="Part of this cluster"
          description="Move back up to the payment hub when you need the full map of guides, templates, and live scenarios."
          links={[guide.hubLink]}
        />
      ) : null}
      <GuideTakeaways takeaways={guide.coreTakeaways} />
      <GuideSectionBlocks sections={guide.sections} />
      <GuideLinkGrid
        title="Related templates"
        description="Use a structured wording page when you already know the situation and want copy you can adapt quickly."
        links={guide.recommendedTemplates || []}
      />
      <RecommendedScenarios links={guide.recommendedScenarios} />
      <GuideLinkGrid
        title="More guides in this cluster"
        description="Move sideways when the payment pressure changes but stays inside the same client-communication problem space."
        links={guide.relatedGuides || []}
      />

      <section className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">{guide.toolCta.title}</h2>
        <p className="text-sm leading-relaxed text-slate-200">{guide.toolCta.body}</p>
        <Link
          href={toolHref}
          className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          {guide.toolCta.buttonLabel}
        </Link>
      </section>

      <GuideFaq faq={guide.faq} />

      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Link href="/guides/" className="text-sm font-semibold text-slate-900 underline underline-offset-2">
          Back to guides
        </Link>
        <Link href={hubHref} className="text-sm font-semibold text-slate-900 underline underline-offset-2">
          {hubLabel}
        </Link>
      </section>
    </main>
  );
}
