import { setRequestLocale } from 'next-intl/server';

import { PricingCards } from '@/components/pricing/PricingCards';
import { ToolForm } from '@/components/tool/ToolForm';
import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Price Negotiation Email Generator | Flowdockr',
  description:
    'Generate pricing negotiation replies that protect your rate, test budget reality, and move deals forward.',
  canonicalUrl: '/tools/price-negotiation-email-generator',
  keywords:
    'price negotiation email generator, freelance pricing email, discount response email',
});

const USE_CASES = [
  'Prospect says your quote is too high after proposal review.',
  'Client asks for discount right before signing.',
  'Buyer says another freelancer is cheaper.',
  'Client wants more work for the same budget.',
];

export default async function PriceNegotiationEmailGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Price negotiation email generator
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Write replies that protect your rate, test budget constraints, and keep
          negotiation tone professional.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Best use cases</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {USE_CASES.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <ToolForm
        sourcePage="tool"
        defaultScenarioSlug="lowball-offer"
        showScenarioSelector
        placeholder="Paste the exact pricing message, including any budget or competitor references..."
      />

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Next decision pages</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/pricing/price-pushback-after-proposal"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Price pushback after proposal
          </Link>
          <Link
            href="/pricing/discount-pressure-before-signing"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Discount pressure before signing
          </Link>
          <Link
            href="/pricing/cheaper-competitor-comparison"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Cheaper competitor comparison
          </Link>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Credits pricing</h2>
        <p className="text-sm text-slate-700">2 free replies. Buy credits only when you need more support.</p>
        <PricingCards sourcePage="tool" />
      </section>
    </main>
  );
}
