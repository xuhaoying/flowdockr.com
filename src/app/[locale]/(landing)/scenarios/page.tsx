import { setRequestLocale } from 'next-intl/server';

import { ScenarioCard } from '@/components/scenario/ScenarioCard';
import { Link } from '@/core/i18n/navigation';
import { scenarios } from '@/lib/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Client Negotiation Scenarios for Freelancers | Flowdockr',
  description:
    'Browse client negotiation scenarios, then generate a professional reply tailored to that exact message.',
  canonicalUrl: '/scenarios',
  keywords:
    'freelance negotiation scenarios, client discount response, scope creep reply, lowball offer response',
});

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Client negotiation scenarios for freelancers
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Browse common pricing and scope-pressure situations, then generate a
          professional reply tailored to that exact client message.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">All scenarios</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.slug} scenario={scenario} />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Scenario buckets</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Pricing pressure</p>
            <p className="mt-1">Lowball offers, discount requests, cheaper freelancer comparisons.</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Scope pressure</p>
            <p className="mt-1">More work same budget, small free extras, free sample requests.</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Trust and proof pressure</p>
            <p className="mt-1">When clients question value and compare alternatives.</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Timing and follow-up pressure</p>
            <p className="mt-1">Delayed decision after quote and stalled decision loops.</p>
          </article>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Are these scenario pages only for SEO?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. Each page is a direct-use tool page with practical examples and immediate
            generation.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Can I start from a generic tool instead?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Yes. Use the generic tool page if you don&apos;t need scenario-specific framing.
          </p>
        </details>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-700">
          Want direct access without browsing scenarios?
        </p>
        <Link href="/tool" className="mt-2 inline-flex text-sm font-semibold text-slate-900 underline">
          Open client negotiation reply generator
        </Link>
      </section>
    </main>
  );
}
