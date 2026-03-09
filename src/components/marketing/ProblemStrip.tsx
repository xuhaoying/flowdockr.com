import { Link } from '@/core/i18n/navigation';

const PRESSURE_ITEMS = [
  { label: 'Client asks for a discount', slug: 'client-asks-discount' },
  { label: 'Budget is too low', slug: 'budget-limited' },
  { label: 'Wants more work for same budget', slug: 'more-work-same-budget' },
  { label: 'Delays decision after quote', slug: 'delayed-decision' },
  { label: 'Asks for free sample work', slug: 'free-sample-work' },
  { label: 'Another freelancer is cheaper', slug: 'cheaper-freelancer' },
];

export function ProblemStrip() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Common client pressure points
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRESSURE_ITEMS.map((item) => (
          <Link
            key={item.slug}
            href={`/scenario/${item.slug}`}
            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-400 hover:bg-white hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
