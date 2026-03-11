import { Link } from '@/core/i18n/navigation';
import type { ScenarioPageData } from '@/types/scenario-page';

type ScenarioHeroProps = {
  scenario: ScenarioPageData;
};

export function ScenarioHero({ scenario }: ScenarioHeroProps) {
  return (
    <section className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/pricing">Negotiation situations</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900">{scenario.h1}</li>
        </ol>
      </nav>

      <p className="text-sm font-medium text-slate-600">
        Negotiation scenario
      </p>

      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          {scenario.h1}
        </h1>
        <p className="text-base leading-7 text-slate-700">{scenario.subtitle}</p>
      </div>

      <a
        href="#scenario-inline-tool"
        className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
      >
        Try this scenario
      </a>
    </section>
  );
}
