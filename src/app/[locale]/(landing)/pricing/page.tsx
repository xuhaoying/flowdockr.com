import { setRequestLocale } from 'next-intl/server';

import { CreditExplainer } from '@/components/pricing/CreditExplainer';
import { PricingCards } from '@/components/pricing/PricingCards';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Pricing | Flowdockr',
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
            Why credits instead of subscription?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Flowdockr usage is event-driven. Credits keep pricing simple for occasional
            and active client conversations without monthly lock-in.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do credits expire?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. Credits stay in your account until used.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do I need an account before trying?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. You can use 2 free replies before signing in.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Can I edit replies before sending?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Yes. Every output is editable. Flowdockr gives a strategic draft, then you
            adapt it to your voice.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is this only for freelancers?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            It is built for freelancers, solo providers, and small agencies handling
            client negotiation conversations.
          </p>
        </details>
      </section>
    </main>
  );
}
