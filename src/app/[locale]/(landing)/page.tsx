import { setRequestLocale } from 'next-intl/server';

import { HomepageHero } from '@/components/marketing/HomepageHero';
import { HomepageScenarioGrid } from '@/components/marketing/HomepageScenarioGrid';
import { TrustNote } from '@/components/marketing/TrustNote';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { ToolExample } from '@/components/tool/ToolExample';
import { Link } from '@/core/i18n/navigation';
import { getScenarioBySlug } from '@/lib/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Flowdockr | Client Negotiation Reply Tool for Freelancers',
  description:
    'Paste the client message and get a reply you can send today. Handle lowball offers, discount requests, and scope pressure with confidence.',
  canonicalUrl: '/',
  keywords:
    'freelance negotiation reply, client discount response, lowball offer response, scope creep response',
});

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lowballScenario = getScenarioBySlug('lowball-offer');

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:gap-10 md:py-10">
      <HomepageHero />

      {lowballScenario ? <ToolExample scenario={lowballScenario} /> : null}
      <HomepageScenarioGrid />
      <WhyItWorks />
      <TrustNote />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Simple pricing</h2>
        <p className="text-sm text-slate-700">
          Free for your first 2 replies. Buy credits only when needed.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Free</p>
            <p className="mt-1 text-sm text-slate-700">2 replies</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Starter</p>
            <p className="mt-1 text-sm text-slate-700">20 replies</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Pro</p>
            <p className="mt-1 text-sm text-slate-700">100 replies</p>
          </article>
        </div>
        <Link href="/pricing" className="inline-flex text-sm font-medium text-slate-800 underline">
          View full pricing and checkout
        </Link>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            How are replies generated?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Flowdockr uses scenario-specific prompt context plus your exact client
            message to generate a concise reply and an alternative version.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Can I edit the generated reply?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Yes. Every output is editable. Use it as a starting draft and adjust to
            your voice.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do I need to log in for free replies?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. You can use 2 free replies first. You only need email during checkout
            when you buy credits.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What happens after free replies are used?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You&apos;ll see a simple upgrade block and can buy credits to continue.
            No subscription required.
          </p>
        </details>
      </section>
    </main>
  );
}
