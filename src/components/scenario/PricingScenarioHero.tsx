import { Link } from '@/core/i18n/navigation';
import type { ScenarioPageData } from '@/types/content';

type PricingScenarioHeroProps = {
  scenario: ScenarioPageData;
};

export function PricingScenarioHero({
  scenario,
}: PricingScenarioHeroProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={scenario.hubParent}>Pricing scenarios</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900">{scenario.h1}</li>
        </ol>
      </nav>

      <div className="flex flex-wrap gap-2">
        <p className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          Pricing decision
        </p>
        <p className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
          Use before replying
        </p>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {scenario.h1}
      </h1>
      <p className="max-w-3xl text-base text-slate-700">{scenario.heroSubheading}</p>
      <a
        href="#scenario-tool-cta"
        className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
      >
        Draft a reply for this situation
      </a>
    </section>
  );
}
