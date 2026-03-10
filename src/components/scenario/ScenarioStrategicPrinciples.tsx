import { Scenario } from '@/types/scenario';

type ScenarioStrategicPrinciplesProps = {
  scenario: Scenario;
};

export function ScenarioStrategicPrinciples({
  scenario,
}: ScenarioStrategicPrinciplesProps) {
  const principles = [scenario.primaryGoal, ...scenario.preferredMoves].slice(0, 3);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Strategic principles
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {principles.map((principle) => (
          <article key={principle} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-800">{principle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
