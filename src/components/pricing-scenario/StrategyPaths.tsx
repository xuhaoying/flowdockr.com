import type { PricingScenario } from '@/types/pricing-cluster';

type StrategyPathsProps = {
  scenario: PricingScenario;
};

export function StrategyPaths({ scenario }: StrategyPathsProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Strategy options</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.responsePaths.map((path) => (
          <article key={path.id} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Path {path.id} - {path.title}
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
  );
}
