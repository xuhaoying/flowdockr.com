import { Link } from '@/core/i18n/navigation';
import { pricingScenarios } from '@/lib/pricing-cluster';

const GROUPS = [
  {
    title: 'Proposal pushback',
    slugs: [
      'price-pushback-after-proposal',
      'discount-pressure-before-signing',
      'small-discount-before-closing',
    ],
  },
  {
    title: 'Budget and comparison',
    slugs: [
      'budget-lower-than-expected',
      'cheaper-competitor-comparison',
      'can-you-do-it-cheaper',
    ],
  },
  {
    title: 'Scope and boundary pressure',
    slugs: ['more-work-same-price', 'free-trial-work-request'],
  },
] as const;

export function HomepageScenarioGrid() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Popular pricing scenarios</h2>
      <p className="text-sm text-slate-700">
        Choose the exact pricing pressure you are facing and open the matching decision page.
      </p>
      <div className="space-y-5">
        {GROUPS.map((group) => {
          const items = group.slugs
            .map((slug) => pricingScenarios.find((scenario) => scenario.slug === slug))
            .filter((scenario): scenario is (typeof pricingScenarios)[number] => Boolean(scenario));

          if (items.length === 0) {
            return null;
          }

          return (
            <article key={group.title} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((scenario) => (
                  <Link
                    key={scenario.slug}
                    href={`/pricing/${scenario.slug}`}
                    className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
                  >
                    <p className="text-sm font-semibold text-slate-900">{scenario.title}</p>
                    <p className="mt-1 text-sm text-slate-700">{scenario.shortDescription}</p>
                    <span className="mt-3 inline-flex text-sm font-medium text-slate-800 underline underline-offset-2">
                      Open scenario
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
