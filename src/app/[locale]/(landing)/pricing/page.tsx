import { BillingPolicy } from '@/components/pricing/BillingPolicy';
import { CreditExplanation } from '@/components/pricing/CreditExplanation';
import { FeatureComparison } from '@/components/pricing/FeatureComparison';
import { HowItWorks } from '@/components/pricing/HowItWorks';
import { PricingCards } from '@/components/pricing/PricingCards';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingScenarioCard } from '@/components/pricing/PricingScenarioCard';
import { ProblemFraming } from '@/components/pricing/ProblemFraming';
import {
  getPricingScenariosByFamily,
  pricingFamilies,
} from '@/lib/pricing-cluster';
import { FLOWDOCKR_PUBLIC_SUPPORT_EMAIL } from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Pricing | FlowDockr',
  description:
    'FlowDockr pricing includes a free plan and one-time paid credit packs for professional reply support.',
  canonicalUrl: '/pricing',
  keywords:
    'FlowDockr pricing, professional reply generator pricing, message credits, client communication support',
});

export default async function PricingHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 py-8 md:gap-8 md:py-10">
      <section className="border-brand-lavender/25 rounded-3xl border bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Pricing
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Simple credits for difficult client messages
            </h1>
            <p className="text-base leading-7 text-slate-700 md:text-lg">
              Start with 2 free drafts. Buy one-time credit packs only when you
              need more professional replies, strategy notes, and saved workflow
              support.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/tools/reply-generator"
                className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-linear-to-r px-5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
              >
                Try free draft
              </Link>
              <a
                href="#pricing-cards"
                className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-medium shadow-xs transition-colors"
              >
                View plans
              </a>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ['Free trial', '2 credits before checkout'],
              ['Paid packs', 'One-time purchases in USD'],
              ['Delivery', 'Credits added after checkout'],
            ].map(([term, detail]) => (
              <div
                key={term}
                className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border px-4 py-3"
              >
                <dt className="text-sm font-semibold text-slate-900">{term}</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-700">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PricingCards
        sourcePage="pricing"
        showSectionHeader={true}
        sectionId="pricing-cards"
      />

      <section className="border-brand-lavender/25 space-y-6 rounded-3xl border bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            What users pay for
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Message credits for real professional conversations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Credits are used to generate and refine reply support inside
            FlowDockr. Each paid plan increases the number of credits and the
            depth of support available for harder conversations.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: 'Account credits',
              body: 'After checkout succeeds, credits are added to your FlowDockr account and shown in your dashboard.',
            },
            {
              title: 'Negotiation output',
              body: 'Each generation produces practical support for one conversation: strategy, risk notes when available, and a client-ready reply draft.',
            },
            {
              title: 'Billing support',
              body: `Payment or access issues can be sent to ${FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}. Refund terms are published before purchase.`,
            },
          ].map((item) => (
            <article
              key={item.title}
              className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border p-4"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-6 text-slate-700">
          FlowDockr does not use an auto-renewing subscription today. There are
          no shipping fees because this is a digital software product. See the{' '}
          <Link
            href="/refund"
            className="-mx-2 inline-flex min-h-11 items-center px-2 font-semibold underline"
          >
            Refund Policy
          </Link>{' '}
          for refund eligibility and support timing.
        </p>
      </section>
      <BillingPolicy />
      <CreditExplanation />
      <FeatureComparison />
      <ProblemFraming />
      <HowItWorks />
      <section className="border-brand-lavender/25 space-y-6 rounded-3xl border bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Scenario Library
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Browse pricing and boundary scenarios by decision type
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Each page is built for one live client conversation and routes
            directly into a reply workflow. Use the cluster that matches the
            pressure you are dealing with instead of reading generic advice.
          </p>
        </div>

        <div className="space-y-8">
          {pricingFamilies.map((family) => {
            const scenarios = getPricingScenariosByFamily(family.id);

            return (
              <section key={family.id} className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {family.title}
                  </h3>
                  <p className="text-sm text-slate-600">{family.description}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {scenarios.map((scenario) => (
                    <PricingScenarioCard
                      key={scenario.slug}
                      scenario={scenario}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <PricingFAQ />
      <PricingCTA />
    </main>
  );
}
