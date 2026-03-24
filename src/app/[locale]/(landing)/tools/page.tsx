import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import {
  getToolSurfaceScenarioLinks,
  getToolsIndexScenarioSurfaceEntries,
} from '@/lib/content/scenarioPages';
import { getAllTools } from '@/lib/content/getToolBySlug';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Negotiation Tools | Flowdockr',
  description:
    'Use pricing-focused negotiation tools to draft client replies and move deal conversations forward.',
  canonicalUrl: '/tools',
});

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tools = getAllTools();
  const startingScenarios = getToolsIndexScenarioSurfaceEntries(4);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Pricing negotiation tools
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Use these tools when you need to answer a real client message now. Each
          workspace is built for pricing pressure, scope boundaries, and deal momentum.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/tools/price-negotiation-email-generator"
            className="inline-flex rounded-md bg-slate-900 px-4 py-2 font-semibold text-white"
          >
            Open pricing reply workspace
          </Link>
          <Link
            href="/scenario"
            className="inline-flex rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-900"
          >
            Choose a scenario first
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">When to use this page</h2>
          <p className="mt-1 text-sm text-slate-700">
            You already have a client message and want a negotiation-aware draft quickly.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">What each tool gives you</h2>
          <p className="mt-1 text-sm text-slate-700">
            Structured replies tuned for pricing conversations, plus alternative wording.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">What to do next</h2>
          <p className="mt-1 text-sm text-slate-700">
            Save what works in your negotiation library and reuse stronger patterns later.
          </p>
        </article>
      </section>

      {tools.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Tools are loading</h2>
          <p className="mt-2 text-sm text-slate-700">
            Tool definitions are temporarily unavailable. Use pricing scenarios to keep moving.
          </p>
          <Link href="/scenario" className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2">
            Open scenarios
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <article key={tool.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{tool.h1}</h2>
              <p className="mt-2 text-sm text-slate-700">{tool.heroSubheading}</p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Best for</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {tool.bestFor.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Linked situations
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {getToolSurfaceScenarioLinks(tool.slug, 3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href={tool.url}
                className="mt-4 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Open tool workspace
              </Link>
            </article>
          ))}
        </section>
      )}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Need scenario context first?</h2>
        <p className="text-sm text-slate-700">
          Start in the scenario library to open the closest client situation before generating a reply.
        </p>
        <div className="grid gap-2 md:grid-cols-2">
          {startingScenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={scenario.href}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
            >
              {scenario.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
