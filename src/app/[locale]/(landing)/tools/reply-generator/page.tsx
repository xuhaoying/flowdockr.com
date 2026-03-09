import { setRequestLocale } from 'next-intl/server';

import { PricingCards } from '@/components/pricing/PricingCards';
import { ToolForm } from '@/components/tool/ToolForm';
import { ToolExample } from '@/components/tool/ToolExample';
import { Link } from '@/core/i18n/navigation';
import { getScenarioBySlug } from '@/lib/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'AI Client Reply Generator for Freelancers | Flowdockr',
  description:
    'Draft send-ready client replies for pricing pushback, discount asks, and scope pressure.',
  canonicalUrl: '/tools/reply-generator',
  keywords: 'client reply generator, freelancer negotiation reply, AI pricing response tool',
});

export default async function ReplyGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const scenario = getScenarioBySlug('client-asks-discount');

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          AI client reply generator for freelancers
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Draft clear responses for pricing pushback, scope changes, and stalled proposal
          conversations.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/pricing" className="font-semibold text-slate-900 underline underline-offset-2">
            Explore pricing scenarios
          </Link>
          <Link
            href="/tools/price-negotiation-email-generator"
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            Open pricing email generator
          </Link>
        </div>
      </section>

      <ToolForm sourcePage="tool" showScenarioSelector />

      {scenario ? <ToolExample scenario={scenario} title="Example output" /> : null}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Credits and access</h2>
        <p className="text-sm text-slate-700">2 free replies, then buy credits when needed.</p>
        <PricingCards sourcePage="tool" />
      </section>
    </main>
  );
}
