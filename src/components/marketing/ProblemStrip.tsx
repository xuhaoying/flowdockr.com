import { Link } from '@/core/i18n/navigation';

const PRESSURE_ITEMS = [
  { label: 'Client says your quote is too high', slug: 'quote-too-high' },
  { label: 'Client asks for a discount', slug: 'discount-request' },
  { label: 'Client found someone cheaper', slug: 'found-someone-cheaper' },
  { label: 'Ask for payment politely', slug: 'ask-for-payment-politely' },
  { label: 'Final payment reminder', slug: 'final-payment-reminder' },
  { label: 'Client wants extra work for free', slug: 'extra-work-for-free' },
  { label: 'Unlimited revisions request', slug: 'unlimited-revisions' },
  { label: 'That request is out of scope', slug: 'out-of-scope-professionally' },
];

export function ProblemStrip() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Common client reply situations
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
