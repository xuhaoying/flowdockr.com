import { PricingScenario } from '@/lib/pricing-cluster';

import { Link } from '@/core/i18n/navigation';

export function PricingScenarioCard({
  scenario,
}: {
  scenario: PricingScenario;
}) {
  return (
    <article className="border-brand-lavender/25 rounded-lg border bg-white p-4 shadow-sm shadow-slate-950/5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border-brand-lavender/35 bg-brand-bg text-brand-primary rounded-full border px-2 py-0.5 text-[11px] font-medium">
          {scenario.schema.page.family.replace(/-/g, ' ')}
        </span>
        <span className="border-brand-lavender/25 rounded-full border bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600">
          Pricing decision
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-900">
        {scenario.title}
      </h3>
      <p className="mt-2 text-sm text-slate-700">{scenario.shortDescription}</p>
      <Link
        href={`/pricing/${scenario.slug}`}
        className="text-brand-primary mt-3 inline-flex text-sm font-semibold underline underline-offset-2"
      >
        Open scenario
      </Link>
    </article>
  );
}
