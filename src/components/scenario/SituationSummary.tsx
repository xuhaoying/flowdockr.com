import type { ScenarioPageData } from '@/types/content';

type SituationSummaryProps = {
  scenario: ScenarioPageData;
};

export function SituationSummary({ scenario }: SituationSummaryProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Situation summary
      </h2>
      <p className="text-sm leading-relaxed text-slate-700">{scenario.situationSummary}</p>
    </section>
  );
}

