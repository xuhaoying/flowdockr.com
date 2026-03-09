import { ScenarioCard } from '@/components/scenario/ScenarioCard';
import { scenarios } from '@/lib/scenarios';

const GROUPS = [
  {
    title: 'Pricing pressure',
    slugs: ['client-asks-discount', 'lowball-offer', 'cheaper-freelancer'],
  },
  {
    title: 'Scope and boundaries',
    slugs: ['more-work-same-budget', 'free-sample-work', 'small-extra-free'],
  },
  {
    title: 'Delay and uncertainty',
    slugs: ['delayed-decision', 'budget-limited'],
  },
] as const;

export function HomepageScenarioGrid() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Popular scenarios</h2>
      <p className="text-sm text-slate-700">
        Browse by pressure type and open the exact scenario page for your conversation.
      </p>
      <div className="space-y-5">
        {GROUPS.map((group) => {
          const items = group.slugs
            .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
            .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));

          if (items.length === 0) {
            return null;
          }

          return (
            <article key={group.title} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((scenario) => (
                  <ScenarioCard key={scenario.slug} scenario={scenario} />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
