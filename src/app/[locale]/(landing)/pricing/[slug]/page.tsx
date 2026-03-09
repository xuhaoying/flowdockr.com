import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';
import { ToolForm } from '@/components/tool/ToolForm';
import { Link } from '@/core/i18n/navigation';
import {
  getPricingScenarioBySlug,
  getRelatedPricingScenarios,
  pricingScenarios,
} from '@/lib/pricing-cluster';

type PricingScenarioPageParams = {
  locale: string;
  slug: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pricingScenarios.map((scenario) => ({ locale, slug: scenario.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const scenario = getPricingScenarioBySlug(slug);

  if (!scenario) {
    return {
      title: 'Pricing scenario not found | Flowdockr',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  const canonical = `${envConfigs.app_url}${localePrefix}/pricing/${scenario.slug}`;

  return {
    title: scenario.seoTitle,
    description: scenario.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [scenario.primaryKeyword, ...scenario.keywordVariants],
    openGraph: {
      title: scenario.seoTitle,
      description: scenario.metaDescription,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function PricingScenarioPage({
  params,
}: {
  params: Promise<PricingScenarioPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const scenario = getPricingScenarioBySlug(slug);
  if (!scenario) {
    notFound();
  }

  const nextDecisions = getRelatedPricingScenarios(scenario.nextDecisionSlugs);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 pb-24 md:py-10 md:pb-10">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/pricing">Pricing scenarios</Link>
            </li>
            <li>/</li>
            <li className="text-slate-900">{scenario.title}</li>
          </ol>
        </nav>

        <p className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          Pricing pressure scenario
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {scenario.title}
        </h1>
        <p className="max-w-3xl text-base text-slate-700">{scenario.heroSubtitle}</p>
        <p className="text-sm text-slate-600">
          This usually happens when the prospect still sees value but is testing pricing flexibility.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Situation snapshot</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {scenario.situationSnapshot.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {scenario.tier === 'tier1' ? (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Negotiation diagnostics
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              Check whether this is tactical pushback or a hard budget ceiling.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              Keep scope and pricing separated before proposing concessions.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              Choose a reply path that preserves both margin and deal momentum.
            </li>
          </ul>
        </section>
      ) : (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Fast handling checklist
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              Name the pressure clearly before writing your reply.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              Avoid instant concessions on unchanged scope.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              End with one structured next step, not vague flexibility.
            </li>
          </ul>
        </section>
      )}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Your real goal</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {scenario.realGoals.map((goal) => (
            <li key={goal} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Best response paths</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {scenario.responsePaths.map((path) => (
            <article key={path.id} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Path {path.id} — {path.title}
              </h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">When to use:</span> {path.whenToUse}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Risk:</span> {path.risk}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Example wording:</span>{' '}
                  {path.exampleWording}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Copy-ready examples</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {scenario.copyReadyExamples.map((example) => (
            <article key={`${example.tone}-${example.text}`} className="rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{example.tone}</h3>
              <p className="mt-2 text-sm text-slate-700">{example.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing-tool" className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Tailor this to your situation</h2>
        <p className="text-sm text-slate-700">
          Paste the exact message, add your context, and generate a reply that protects your rate and fits this deal.
        </p>
        <ToolForm
          sourcePage="scenario"
          defaultScenarioSlug={scenario.generatorScenarioSlug}
          showScenarioSelector={false}
          placeholder="Paste the exact prospect message and any budget context..."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What to do next</h2>
        <p className="text-sm text-slate-700">
          Navigate to the next likely decision instead of guessing in the dark.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {nextDecisions.map((item) => (
            <Link
              key={item.slug}
              href={`/pricing/${item.slug}`}
              className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
            >
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-700">{item.shortDescription}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/pricing" className="font-semibold text-slate-900 underline underline-offset-2">
            Back to pricing hub
          </Link>
          <Link
            href="/tools/price-negotiation-email-generator"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Open pricing email generator
          </Link>
        </div>
      </section>

      {scenario.guideLinks?.length ? (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Related guides
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {scenario.guideLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-semibold text-slate-900 underline underline-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <div className="space-y-2">
          {scenario.faq.map((item) => (
            <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.q}</summary>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-sm">
        <h2 className="text-xl font-semibold">Try your message now</h2>
        <p className="mt-1 text-sm text-slate-200">
          2 free replies. No subscription required.
        </p>
        <a
          href="#pricing-tool"
          className="mt-3 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Generate my reply
        </a>
      </section>
    </main>
  );
}
