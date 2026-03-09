import { setRequestLocale } from 'next-intl/server';

import { ScenarioCard } from '@/components/scenario/ScenarioCard';
import { Link } from '@/core/i18n/navigation';
import { scenarios } from '@/lib/scenarios';
import { ScenarioCategory } from '@/types/scenario';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Client Negotiation Scenarios for Freelancers | Flowdockr',
  description:
    'Browse client negotiation scenarios, then generate a professional reply tailored to that exact message.',
  canonicalUrl: '/scenario',
  keywords:
    'freelance negotiation scenarios, client discount response, scope creep reply, lowball offer response',
});

const HUB_SECTIONS: Array<{
  key: ScenarioCategory;
  title: string;
  description: string;
}> = [
  {
    key: 'negotiation',
    title: 'Negotiation',
    description:
      'Scenarios where you need to defend boundaries and keep leverage without damaging trust.',
  },
  {
    key: 'pricing',
    title: 'Pricing',
    description:
      'Scenarios focused on discount pressure, lowball offers, and budget mismatch conversations.',
  },
  {
    key: 'difficult-clients',
    title: 'Difficult clients',
    description:
      'Scenarios for delayed decisions, boundary tests, and higher-friction client behavior.',
  },
];

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
        <h2 className="text-xl font-semibold text-slate-900">Scenario hub</h2>
        <div className="space-y-6">
          {HUB_SECTIONS.map((section) => {
            const sectionScenarios = scenarios.filter(
              (scenario) => scenario.category === section.key
            );

            if (sectionScenarios.length === 0) {
              return null;
            }

            return (
              <article key={section.key} className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{section.description}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {sectionScenarios.map((scenario) => (
                    <ScenarioCard key={scenario.slug} scenario={scenario} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
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
