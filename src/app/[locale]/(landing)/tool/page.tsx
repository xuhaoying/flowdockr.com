import { setRequestLocale } from 'next-intl/server';

import { PricingCards } from '@/components/pricing/PricingCards';
import { ToolForm } from '@/components/tool/ToolForm';
import { ToolExample } from '@/components/tool/ToolExample';
import { Link } from '@/core/i18n/navigation';
import { getScenarioBySlug } from '@/lib/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Client Conversation Support Workspace | Flowdockr',
  description:
    'Scenario-informed client conversation support for freelancers. Generate structured replies and keep your negotiation flow moving.',
  canonicalUrl: '/tool',
  keywords:
    'client conversation support, negotiation support tool, freelancer pricing response',
});

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const scenario = getScenarioBySlug('client-asks-discount');

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Generic conversation workspace
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Scenario pages are the primary path for context-rich replies. Use this
          workspace when you need direct access without browsing.
        </p>
        <Link href="/scenario" className="inline-flex text-sm font-semibold text-slate-900 underline">
          Browse scenario-first pages
        </Link>
      </section>

      <ToolForm sourcePage="tool" showScenarioSelector />

      {scenario ? <ToolExample scenario={scenario} title="Sample output" /> : null}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Need more than 2 free replies?</h2>
        <p className="text-sm text-slate-700">
          Buy credits only when needed. No monthly subscription.
        </p>
        <PricingCards sourcePage="tool" />
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">How to use</h2>
        <ol className="space-y-2 text-sm text-slate-700">
          <li>1. Choose the closest scenario.</li>
          <li>2. Paste the exact client wording.</li>
          <li>3. Generate, copy, and send your preferred version.</li>
        </ol>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is this only for freelancers?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            It is designed for freelancers and solo service providers, but anyone handling
            client negotiation can use it.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do I need a subscription?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. You get 2 free replies, then buy credits only when needed.
          </p>
        </details>
      </section>
    </main>
  );
}
