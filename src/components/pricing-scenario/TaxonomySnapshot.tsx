import type { PricingScenario } from '@/lib/pricing-cluster';

type TaxonomySnapshotProps = {
  scenario: PricingScenario;
};

function formatLabel(value: string): string {
  return value.replace(/-/g, ' ');
}

export function TaxonomySnapshot({ scenario }: TaxonomySnapshotProps) {
  const taxonomy = scenario.schema;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Decision taxonomy</h2>
      <p className="text-sm text-slate-700">{taxonomy.primaryIntent}</p>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Trigger stage</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{formatLabel(taxonomy.triggerStage)}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Pressure type</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{formatLabel(taxonomy.pressureType)}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Real risks</p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {taxonomy.realRisks.slice(0, 3).map(formatLabel).join(', ')}
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Decision goals</p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {taxonomy.decisionGoals.slice(0, 3).map(formatLabel).join(', ')}
          </p>
        </article>
      </div>
    </section>
  );
}
