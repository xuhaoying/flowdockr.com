import { Link } from '@/core/i18n/navigation';
import type { ScenarioPageData } from '@/types/content';

type HubBackLinkProps = {
  scenario: ScenarioPageData;
};

export function HubBackLink({ scenario }: HubBackLinkProps) {
  return (
    <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Link
        href={scenario.hubParent}
        className="text-sm font-semibold text-slate-900 underline underline-offset-2"
      >
        Back to pricing hub
      </Link>
      <p className="text-sm text-slate-600">
        Continue from hub to choose another pricing decision scenario.
      </p>
    </section>
  );
}

