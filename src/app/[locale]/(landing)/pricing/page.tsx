import { BillingPolicy } from '@/components/pricing/BillingPolicy';
import { CreditExplanation } from '@/components/pricing/CreditExplanation';
import { FeatureComparison } from '@/components/pricing/FeatureComparison';
import { HowItWorks } from '@/components/pricing/HowItWorks';
import { PricingCards } from '@/components/pricing/PricingCards';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingScenarioCard } from '@/components/pricing/PricingScenarioCard';
import { ProblemFraming } from '@/components/pricing/ProblemFraming';
import { getPricingHub } from '@/lib/content/getPricingHub';
import {
  getPricingScenariosByFamily,
  pricingFamilies,
} from '@/lib/pricing-cluster';
import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';

const pricingHubPage = getPricingHub();

export const generateMetadata = getMetadata({
  title: pricingHubPage.metaTitle,
  description: pricingHubPage.metaDescription,
  canonicalUrl: '/pricing',
  keywords:
    'freelance pricing negotiation scenarios, quote pushback, discount requests, budget mismatch, scope pressure',
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
      <PricingHero />
      <ProblemFraming />
      <HowItWorks />
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
      <PricingCards
        sourcePage="pricing"
        showSectionHeader={true}
        sectionId="pricing-cards"
      />
      <BillingPolicy />
      <CreditExplanation />
      <FeatureComparison />
      <PricingFAQ />
      <PricingCTA />
    </main>
  );
}
