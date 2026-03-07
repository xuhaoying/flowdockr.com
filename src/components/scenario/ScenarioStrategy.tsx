import { Scenario } from '@/lib/scenarios';

type ScenarioStrategyProps = {
  scenario: Scenario;
};

export function ScenarioStrategy({ scenario }: ScenarioStrategyProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why this response works</h2>
      <ul className="space-y-3 text-sm text-slate-700">
        {scenario.strategyBullets.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
