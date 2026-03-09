import { Link } from '@/core/i18n/navigation';
import type { PricingScenario } from '@/types/pricing-cluster';

type ScenarioHeroProps = {
  scenario: PricingScenario;
};

export function ScenarioHero({ scenario }: ScenarioHeroProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/pricing">Pricing scenarios</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900">{scenario.title}</li>
        </ol>
      </nav>

      <p className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
        Pricing pressure scenario
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {scenario.title}
      </h1>
      <p className="max-w-3xl text-base text-slate-700">{scenario.heroSubtitle}</p>
      <a href="#pricing-tool" className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2">
        Paste your client message
      </a>
    </section>
  );
}
