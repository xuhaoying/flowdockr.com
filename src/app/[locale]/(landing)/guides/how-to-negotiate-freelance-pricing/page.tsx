import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'How to Negotiate Freelance Pricing | Flowdockr Guide',
  description:
    'A practical decision framework for handling quote pushback, discount pressure, and budget mismatch in freelance pricing conversations.',
  canonicalUrl: '/guides/how-to-negotiate-freelance-pricing',
});

const FRAMEWORK_STEPS = [
  'Classify the pressure: pushback, discount ask, budget mismatch, or competitor comparison.',
  'Define your primary goal: hold value, restructure scope, or exit politely.',
  'Offer structured options with explicit tradeoffs.',
  'Move to a clear next step instead of vague flexibility.',
];

const SCENARIO_LINKS: Array<{ href: string; label: string }> = [
  {
    href: '/pricing/price-pushback-after-proposal',
    label: 'Price pushback after proposal',
  },
  {
    href: '/pricing/discount-pressure-before-signing',
    label: 'Discount pressure before signing',
  },
  {
    href: '/pricing/budget-lower-than-expected',
    label: 'Budget lower than expected',
  },
  {
    href: '/pricing/cheaper-competitor-comparison',
    label: 'Cheaper competitor comparison',
  },
  {
    href: '/pricing/more-work-same-price',
    label: 'More work at same price',
  },
];

export default async function HowToNegotiateFreelancePricingGuide({
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
          How to negotiate freelance pricing
        </h1>
        <p className="text-base text-slate-700">
          Most pricing conversations fail because freelancers react to the number first,
          instead of diagnosing the type of pressure they are facing.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A practical framework</h2>
        <ol className="space-y-2 text-sm text-slate-700">
          {FRAMEWORK_STEPS.map((step, index) => (
            <li key={step}>
              <span className="font-semibold text-slate-900">{index + 1}. </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Open a matching scenario</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SCENARIO_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Apply this with the tool</h2>
        <p className="text-sm text-slate-700">
          Use the pricing generator when you need send-ready wording for a real client message.
        </p>
        <Link
          href="/tools/price-negotiation-email-generator"
          className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
        >
          Open price negotiation email generator
        </Link>
      </section>
    </main>
  );
}
