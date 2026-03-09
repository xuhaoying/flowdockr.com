import { Link } from '@/core/i18n/navigation';
import { PricingScenario } from '@/lib/pricing-cluster';

export function PricingScenarioCard({
  scenario,
}: {
  scenario: PricingScenario;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{scenario.title}</h3>
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
