import { setRequestLocale } from 'next-intl/server';

import { PricingPacks } from '@/components/tool';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Flowdockr Credits Pricing',
  description:
    'Buy credits for Flowdockr negotiation reply generation. One-time payment, credits never expire.',
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
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Credits pricing
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Buy credits once and use them whenever clients push on price, scope, or
          budget. No subscription. Credits never expire.
        </p>
      </section>

      <PricingPacks />
    </main>
  );
}
