import { Link } from '@/core/i18n/navigation';
import type { ScenarioPageData } from '@/types/content';

type NextDecisionLinksProps = {
  scenario: ScenarioPageData;
};

export function NextDecisionLinks({ scenario }: NextDecisionLinksProps) {
  if (scenario.nextDecisionLinks.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Next decision links
      </h2>
      <p className="text-sm text-slate-700">
        Route to the next pricing decision state instead of generic related posts.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.nextDecisionLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{link.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

