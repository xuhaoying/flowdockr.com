import { scenarios } from '@/lib/scenarios';

import { Link } from '@/core/i18n/navigation';

const FEATURED_SLUGS = [
  'quote-too-high',
  'discount-request',
  'extra-work-outside-scope',
  'ghosted-after-rate',
];

export function ScenarioLibraryPreview() {
  const featured = FEATURED_SLUGS.map((slug) =>
    scenarios.find((item) => item.slug === slug)
  ).filter((item): item is (typeof scenarios)[number] => Boolean(item));

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Scenario library preview
        </h2>
        <p className="text-sm text-slate-700">
          Real negotiation situations designed for search intent and immediate
          action.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {featured.map((scenario) => (
          <Link
            key={scenario.slug}
            href={`/scenario/${scenario.slug}`}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">
              {scenario.title}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {scenario.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
