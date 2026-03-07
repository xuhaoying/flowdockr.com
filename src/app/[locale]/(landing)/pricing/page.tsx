import { setRequestLocale } from 'next-intl/server';

import { CreditExplainer } from '@/components/pricing/CreditExplainer';
import { PricingCards } from '@/components/pricing/PricingCards';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Simple Pricing for Negotiation Replies | Flowdockr',
  description:
    '2 free replies, then buy credits when needed. No subscription required for Flowdockr negotiation reply generation.',
  canonicalUrl: '/pricing',
});

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Simple pricing for negotiation replies
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          1 generation = 1 credit. No subscription required. Buy only when you need
          more replies.
        </p>
      </section>

      <PricingCards sourcePage="pricing" />

      <CreditExplainer />

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Can I cancel anytime?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            There is no subscription to cancel. You buy credits only when needed.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is login required before checkout?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You can use the tool for free without login. To buy credits, you&apos;ll be
            prompted to sign in so purchases and balance stay attached to your account.
          </p>
        </details>
      </section>
    </main>
  );
}
