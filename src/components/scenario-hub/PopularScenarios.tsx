import { Link } from '@/core/i18n/navigation';
import type { ScenarioHubScenarioLink } from '@/types/scenario-hub';

type PopularScenariosProps = {
  items: ScenarioHubScenarioLink[];
};

export function PopularScenarios({ items }: PopularScenariosProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Most Common Scenarios
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Start with the negotiation situations freelancers run into most
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/scenario/${item.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-400"
            >
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                {item.title}
              </p>
              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {item.description}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
