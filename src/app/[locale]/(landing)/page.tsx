import { setRequestLocale } from 'next-intl/server';

import { ExampleConversation } from '@/components/marketing/ExampleConversation';
import { FinalCta } from '@/components/marketing/FinalCta';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { HomepageHero } from '@/components/marketing/HomepageHero';
import { HomepageScenarioGrid } from '@/components/marketing/HomepageScenarioGrid';
import { SavedDealsPreview } from '@/components/marketing/SavedDealsPreview';
import { ScenarioLibraryPreview } from '@/components/marketing/ScenarioLibraryPreview';
import { PricingCards } from '@/components/pricing/PricingCards';
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

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:gap-10 md:py-10">
      <HomepageHero />
      <HomepageScenarioGrid />
      <ExampleConversation />
      <ScenarioLibraryPreview />
      <HowItWorksSection />
      <SavedDealsPreview />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Simple pricing</h2>
        <p className="text-sm text-slate-700">
          Credits-first pricing for occasional and ongoing deal support.
        </p>
        <PricingCards sourcePage="home" />
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
            You&apos;ll see an upgrade prompt and can continue with credits. Your
            generated replies can still be saved into deal history.
          </p>
        </details>
      </section>

      <FinalCta />
    </main>
  );
}
