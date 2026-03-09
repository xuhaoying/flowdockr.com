import { Link } from '@/core/i18n/navigation';
import { Scenario } from '@/lib/scenarios';

type ScenarioHeroProps = {
  scenario: Scenario;
};

const CATEGORY_LABEL: Record<Scenario['category'], string> = {
  negotiation: 'Negotiation pressure',
  pricing: 'Pricing pressure',
  'difficult-clients': 'Difficult client pressure',
};

const RISK_LABEL: Record<Scenario['riskLevel'], string> = {
  low: 'Low pressure',
  medium: 'Medium pressure',
  high: 'High pressure',
};

export function ScenarioHero({ scenario }: ScenarioHeroProps) {
  return (
    <section className="space-y-4">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/scenario">Scenarios</Link>
          </li>
          <li>/</li>
          <li>{CATEGORY_LABEL[scenario.category]}</li>
          <li>/</li>
          <li className="text-slate-900">{scenario.h1}</li>
        </ol>
      </nav>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {CATEGORY_LABEL[scenario.category]}
          </p>
          <p className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
            {RISK_LABEL[scenario.riskLevel]}
          </p>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {scenario.h1}
        </h1>
        <p className="max-w-3xl text-base text-slate-700">{scenario.heroIntro}</p>
        <a href="#scenario-tool" className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2">
          Paste your client message
        </a>
      </div>
    </section>
  );
}
