import { Link } from '@/core/i18n/navigation';

const PRESSURE_ITEMS = [
  { label: 'Client says your quote is too high', slug: 'quote-too-high' },
  { label: 'Client asks for a discount', slug: 'discount-request' },
  { label: 'Client found someone cheaper', slug: 'found-someone-cheaper' },
  { label: 'Ask for payment politely', slug: 'ask-for-payment-politely' },
  {
    label: 'Overdue invoice no response',
    slug: 'overdue-invoice-no-response',
  },
  { label: 'Payment before starting work', slug: 'start-before-payment' },
  { label: 'Client wants extra work for free', slug: 'extra-work-for-free' },
  {
    label: 'That request is out of scope',
    slug: 'out-of-scope-professionally',
  },
];

export function ProblemStrip() {
  return (
    <section className="border-brand-lavender/25 space-y-3 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Common client reply situations
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRESSURE_ITEMS.map((item) => (
          <Link
            key={item.slug}
            href={`/scenario/${item.slug}`}
            className="border-brand-lavender/35 bg-brand-bg/60 hover:border-brand-primary/55 hover:text-brand-primary rounded-full border px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
