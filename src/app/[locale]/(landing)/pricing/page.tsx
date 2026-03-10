import { setRequestLocale } from 'next-intl/server';

import { CreditExplainer } from '@/components/pricing/CreditExplainer';
import { PricingCards } from '@/components/pricing/PricingCards';
import { ToolForm } from '@/components/tool/ToolForm';
import { Link } from '@/core/i18n/navigation';
import { getGuideBySlug } from '@/lib/content/getGuideBySlug';
import { getPricingHub } from '@/lib/content/getPricingHub';
import {
  getAllScenarios,
  getDefaultGeneratorScenarioSlug,
  getScenarioBySlug,
} from '@/lib/content/getScenarioBySlug';
import { getToolBySlug } from '@/lib/content/getToolBySlug';
import { getMetadata } from '@/shared/lib/seo';

const pricingHubPage = getPricingHub();

function getSlugFromUrl(url: string): string | null {
  const segments = url.split('/').filter(Boolean);
  return segments.at(-1) ?? null;
}

export const generateMetadata = getMetadata({
  title: pricingHubPage.metaTitle,
  description: pricingHubPage.metaDescription,
  canonicalUrl: pricingHubPage.url,
  keywords:
    'freelance pricing negotiation scenarios, quote pushback, discount requests, budget mismatch, scope pressure',
});

export default async function PricingHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allScenarios = getAllScenarios();
  const featuredScenarios = pricingHubPage.featuredScenarios
    .map((url) => {
      const slug = getSlugFromUrl(url);
      return slug ? getScenarioBySlug(slug) : null;
    })
    .filter((scenario) => scenario !== null);

  const relatedGuides = pricingHubPage.relatedGuides
    .map((url) => {
      const slug = getSlugFromUrl(url);
      return slug ? getGuideBySlug(slug) : null;
    })
    .filter((guide) => guide !== null);

  const relatedTools = pricingHubPage.relatedTools
    .map((url) => {
      const slug = getSlugFromUrl(url);
      return slug ? getToolBySlug(slug) : null;
    })
    .filter((tool) => tool !== null);

  const defaultScenarioSlug = featuredScenarios[0]
    ? getDefaultGeneratorScenarioSlug(featuredScenarios[0].slug)
    : 'lowball-offer';

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <p className="inline-flex w-fit rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          Pricing cluster hub
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {pricingHubPage.h1}
        </h1>
        <p className="max-w-4xl text-base text-slate-700">{pricingHubPage.heroSubheading}</p>
        <p className="max-w-4xl text-sm leading-relaxed text-slate-700">{pricingHubPage.intro}</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Choose your situation</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {pricingHubPage.decisionBuckets.map((bucket) => (
            <article
              key={bucket.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-base font-semibold text-slate-900">{bucket.title}</h3>
              <p className="mt-1 text-sm text-slate-700">{bucket.description}</p>
              <Link
                href={bucket.href}
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Open decision path
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Key principles</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {pricingHubPage.keyPrinciples.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">All pricing scenarios</h2>
        <p className="text-sm text-slate-700">
          Navigate all pricing decision pages in one place, then open the matching tool with
          scenario context.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {allScenarios.map((scenario) => (
            <article
              key={scenario.slug}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="inline-flex rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  {scenario.pageRole}
                </span>
                <span className="inline-flex rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  Tier {scenario.tier}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{scenario.h1}</h3>
              <p className="mt-1 text-sm text-slate-700">{scenario.heroSubheading}</p>
              <Link
                href={scenario.url}
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Open scenario
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured scenarios</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {featuredScenarios.map((scenario) => (
            <article
              key={scenario.slug}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-base font-semibold text-slate-900">{scenario.h1}</h3>
              <p className="mt-1 text-sm text-slate-700">{scenario.metaDescription}</p>
              <Link
                href={scenario.url}
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Open featured scenario
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related guides</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.url}
              className="rounded-lg border border-slate-200 p-4 text-sm text-slate-800 transition-colors hover:border-slate-400"
            >
              {guide.h1}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related tools</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedTools.map((tool) => (
            <article key={tool.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">{tool.h1}</h3>
              <p className="mt-1 text-sm text-slate-700">{tool.heroSubheading}</p>
              <Link
                href={tool.url}
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
              >
                Open tool
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing-tool" className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Use the tool</h2>
        <p className="text-sm text-slate-700">
          Paste the exact message and your project context to generate a pricing reply
          that protects your rate and keeps the conversation moving.
        </p>
        <ToolForm
          sourcePage="tool"
          defaultScenarioSlug={defaultScenarioSlug}
          showScenarioSelector={true}
          placeholder="Paste the exact message where they pushed back on pricing..."
        />
      </section>

      <section
        id="credits-pricing"
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Credits pricing</h2>
        <p className="text-sm text-slate-700">
          Start with 2 free replies, then buy credits when you need deeper support.
        </p>
        <PricingCards sourcePage="pricing" />
        <CreditExplainer />
      </section>
    </main>
  );
}
