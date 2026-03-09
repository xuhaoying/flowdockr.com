import { Link } from '@/core/i18n/navigation';
import { Scenario } from '@/types/scenario';

type ScenarioCardProps = {
  scenario: Scenario;
  ctaLabel?: string;
};

const RISK_STYLES: Record<Scenario['riskLevel'], string> = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-rose-50 text-rose-700 border-rose-200',
};

const CATEGORY_LABEL: Record<Scenario['category'], string> = {
  negotiation: 'Negotiation',
  pricing: 'Pricing',
  'difficult-clients': 'Difficult clients',
};

export function ScenarioCard({ scenario, ctaLabel = 'Open scenario' }: ScenarioCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{scenario.title}</p>
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase ${
            RISK_STYLES[scenario.riskLevel]
          }`}
        >
          {scenario.riskLevel}
        </span>
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {CATEGORY_LABEL[scenario.category]}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {scenario.toneProfile}
        </span>
      </div>
      <p className="text-sm text-slate-700">{scenario.shortDescription}</p>
      <Link
        href={`/scenario/${scenario.slug}`}
        className="mt-3 inline-flex text-sm font-medium text-slate-800 underline underline-offset-2"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
