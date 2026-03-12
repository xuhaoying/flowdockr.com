import type { ScenarioPageData } from '@/types/content';

type CommonMistakesProps = {
  scenario: ScenarioPageData;
};

export function CommonMistakes({ scenario }: CommonMistakesProps) {
  if (scenario.commonMistakes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50/70 p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Common mistakes
        </h2>
        <p className="text-sm text-slate-700">
          Most reply quality drops when freelancers concede or over-explain too
          early.
        </p>
      </div>
      <ul className="space-y-3 text-sm text-slate-700">
        {scenario.commonMistakes.map((mistake) => (
          <li key={mistake} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-300 text-xs font-semibold text-rose-700">
              !
            </span>
            <span>{mistake}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
