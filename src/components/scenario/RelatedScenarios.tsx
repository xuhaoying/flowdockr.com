import type { ScenarioRelatedLink } from '@/types/scenario-catalog';

import { Link } from '@/core/i18n/navigation';

type RelatedScenariosProps = {
  items: ScenarioRelatedLink[];
};

export function RelatedScenarios({ items }: RelatedScenariosProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="max-w-3xl space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Related negotiation situations
        </h2>
        <p className="text-sm text-slate-700">
          Explore adjacent client conversations that often show up around the
          same negotiation pressure.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/scenario/${item.slug}`}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
