import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getAllGuides } from '@/lib/content/getGuideBySlug';
import { getAllScenarios } from '@/lib/content/getScenarioBySlug';
import { getMetadata } from '@/shared/lib/seo';
import type { GuidePageData, ScenarioPageData } from '@/types/content';

export const generateMetadata = getMetadata({
  title: 'Pricing Negotiation Guides | Flowdockr',
  description:
    'Practical guides for freelance pricing negotiation, discount decisions, and scope-based deal structuring.',
  canonicalUrl: '/guides',
});

const RECOMMENDED_GUIDE_ORDER = [
  'how-to-negotiate-freelance-pricing',
  'when-to-discount-and-when-not-to',
  'reduce-scope-instead-of-lowering-rate',
] as const;

const STARTING_SCENARIO_SLUGS = [
  'price-pushback-after-proposal',
  'discount-pressure-before-signing',
  'budget-lower-than-expected',
] as const;

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const guides = getAllGuides();
  const guideMap = new Map(guides.map((guide) => [guide.slug, guide]));
  const recommendedGuides = RECOMMENDED_GUIDE_ORDER
    .map((slug) => guideMap.get(slug))
    .filter((guide): guide is GuidePageData => Boolean(guide));

  const scenariosBySlug = new Map(getAllScenarios().map((scenario) => [scenario.slug, scenario]));
  const startingScenarios = STARTING_SCENARIO_SLUGS
    .map((slug) => scenariosBySlug.get(slug))
    .filter((scenario): scenario is ScenarioPageData => Boolean(scenario));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Pricing negotiation guides
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Learn the decision logic behind stronger pricing conversations, then apply it
          to a real message in a scenario page or tool workspace.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recommended starting path</h2>
        <ol className="space-y-3 text-sm text-slate-700">
          {recommendedGuides.map((guide, index) => (
            <li key={guide.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Step {index + 1}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{guide.h1}</p>
              <p className="mt-1">{guide.heroSubheading}</p>
              <Link
                href={guide.url}
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Read this guide
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {guides.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Guides are loading</h2>
          <p className="mt-2 text-sm text-slate-700">
            Guide definitions are temporarily unavailable. Start from pricing scenarios.
          </p>
          <Link href="/pricing" className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2">
            Open pricing scenarios
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{guide.h1}</h2>
              <p className="mt-2 text-sm text-slate-700">{guide.heroSubheading}</p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Core takeaways
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {guide.coreTakeaways.slice(0, 3).map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={guide.url}
                className="mt-4 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Read guide
              </Link>
            </article>
          ))}
        </section>
      )}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Apply a guide to a live situation</h2>
        <p className="text-sm text-slate-700">
          After reading, open a matching pricing scenario and generate a reply for your exact message.
        </p>
        <div className="grid gap-2 md:grid-cols-3">
          {startingScenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={scenario.url}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
            >
              {scenario.h1}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
