import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'When to Discount and When Not To | Flowdockr Guide',
  description:
    'Use clear decision rules for discount requests. Learn when discounts are strategic and when they harm long-term positioning.',
  canonicalUrl: '/guides/when-to-discount-and-when-not-to',
});

const SAFE_TO_DISCOUNT = [
  'Scope is intentionally reduced and documented.',
  'Client commits to faster decision or simplified terms.',
  'The concession is one-time and explicitly framed as such.',
];

const DO_NOT_DISCOUNT = [
  'Same scope, same expectations, lower number only.',
  'Pressure appears only at the closing stage without reciprocity.',
  'Client repeatedly negotiates only on price and ignores fit.',
];

export default async function WhenToDiscountGuide({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          When to discount and when not to
        </h1>
        <p className="text-base text-slate-700">
          Discounts are not automatically wrong. Unstructured discounts are the real problem.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-semibold text-emerald-900">Discount can be reasonable</h2>
          <ul className="space-y-2 text-sm text-emerald-900">
            {SAFE_TO_DISCOUNT.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="space-y-3 rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <h2 className="text-xl font-semibold text-rose-900">Do not discount</h2>
          <ul className="space-y-2 text-sm text-rose-900">
            {DO_NOT_DISCOUNT.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-rose-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Next scenarios</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/pricing/discount-pressure-before-signing"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Discount pressure before signing
          </Link>
          <Link
            href="/pricing/small-discount-before-closing"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Small discount before closing
          </Link>
          <Link
            href="/pricing/can-you-do-it-cheaper"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Can you do it cheaper
          </Link>
        </div>
      </section>
    </main>
  );
}
