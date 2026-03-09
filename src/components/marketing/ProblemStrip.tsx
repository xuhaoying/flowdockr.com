import { Link } from '@/core/i18n/navigation';

const PRESSURE_ITEMS = [
  { label: 'Price pushback after proposal', slug: 'price-pushback-after-proposal' },
  { label: 'Discount pressure before signing', slug: 'discount-pressure-before-signing' },
  { label: 'Budget lower than expected', slug: 'budget-lower-than-expected' },
  { label: 'Another freelancer is cheaper', slug: 'cheaper-competitor-comparison' },
  { label: 'More work for same price', slug: 'more-work-same-price' },
  { label: 'Can you do it cheaper?', slug: 'can-you-do-it-cheaper' },
];

export function ProblemStrip() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Common pricing pressure points
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRESSURE_ITEMS.map((item) => (
          <Link
            key={item.slug}
            href={`/pricing/${item.slug}`}
            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-400 hover:bg-white hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
