import { BillingPolicy } from '@/components/pricing/BillingPolicy';
import { CreditExplanation } from '@/components/pricing/CreditExplanation';
import { FeatureComparison } from '@/components/pricing/FeatureComparison';
import { HowItWorks } from '@/components/pricing/HowItWorks';
import { PricingCards } from '@/components/pricing/PricingCards';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingHero } from '@/components/pricing/PricingHero';
import { ProblemFraming } from '@/components/pricing/ProblemFraming';
import { getPricingHub } from '@/lib/content/getPricingHub';
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
