import { Scenario } from '@/types/scenario';

type ScenarioQuickStrategyProps = {
  scenario: Scenario;
};

export function ScenarioQuickStrategy({ scenario }: ScenarioQuickStrategyProps) {
  const keyMoves = scenario.preferredMoves.slice(0, 3);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Quick strategy</h2>
        <p className="text-sm text-slate-700">{scenario.primaryGoal}</p>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {keyMoves.map((move) => (
          <li key={move} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span>{move}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
