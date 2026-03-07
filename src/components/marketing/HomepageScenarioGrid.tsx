import { ScenarioCard } from '@/components/scenario/ScenarioCard';
import { scenarios } from '@/lib/scenarios';

export function HomepageScenarioGrid() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Scenario shortcuts</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.slug} scenario={scenario} />
        ))}
      </div>
    </section>
  );
}
