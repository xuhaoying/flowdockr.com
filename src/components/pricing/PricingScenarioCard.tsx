import { Link } from '@/core/i18n/navigation';
import { PricingScenario } from '@/lib/pricing-cluster';

export function PricingScenarioCard({
  scenario,
}: {
  scenario: PricingScenario;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
          {scenario.schema.page.family.replace(/-/g, ' ')}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {scenario.schema.page.pageRole === 'pillar'
            ? 'Core decision'
            : scenario.schema.page.pageRole === 'entry'
              ? 'Entry scenario'
              : scenario.schema.page.pageRole === 'bridge'
                ? 'Bridge scenario'
              : 'Support scenario'}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-900">{scenario.title}</h3>
      <p className="mt-2 text-sm text-slate-700">{scenario.shortDescription}</p>
      <Link
        href={`/pricing/${scenario.slug}`}
        className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
      >
        Open scenario
      </Link>
    </article>
  );
}
