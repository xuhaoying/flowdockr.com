import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Reduce Scope Instead of Lowering Rate | Flowdockr Guide',
  description:
    'Protect your rate by changing scope, sequencing work, and setting clear boundaries in budget-constrained deals.',
  canonicalUrl: '/guides/reduce-scope-instead-of-lowering-rate',
});

const CHECKLIST = [
  'Define the minimum viable outcome first.',
  'Remove lower-impact deliverables explicitly.',
  'Split work into phases with clear scope boundaries.',
  'Confirm what is out-of-scope before signing.',
];

export default async function ReduceScopeGuide({
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
          Reduce scope instead of lowering your rate
        </h1>
        <p className="text-base text-slate-700">
          Scope reduction is often the healthiest answer when budget and expectations do
          not match.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Scope restructuring checklist</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Scenario links</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/pricing/budget-lower-than-expected"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Budget lower than expected
          </Link>
          <Link
            href="/pricing/more-work-same-price"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            More work at same price
          </Link>
          <Link
            href="/pricing/price-pushback-after-proposal"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Price pushback after proposal
          </Link>
        </div>
      </section>
    </main>
  );
}
