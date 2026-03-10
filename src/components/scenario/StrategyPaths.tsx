import type { ScenarioPageData } from '@/types/content';

type StrategyPathsProps = {
  scenario: ScenarioPageData;
};

export function StrategyPaths({ scenario }: StrategyPathsProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Strategy paths
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.strategyPaths.map((path, index) => (
          <article
            key={path.id}
            className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              Path {index + 1}: {path.title}
            </h3>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">When to use:</span>{' '}
              {path.whenToUse}
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {path.keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

