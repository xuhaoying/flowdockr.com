import { setRequestLocale } from 'next-intl/server';

import { ExampleConversation } from '@/components/marketing/ExampleConversation';
import { FinalCta } from '@/components/marketing/FinalCta';
import { ConversationSurfaces } from '@/components/marketing/ConversationSurfaces';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { HomepageHero } from '@/components/marketing/HomepageHero';
import { HomepageScenarioGrid } from '@/components/marketing/HomepageScenarioGrid';
import { ProblemStrip } from '@/components/marketing/ProblemStrip';
import { SavedDealsPreview } from '@/components/marketing/SavedDealsPreview';
import { WhyNotGenericAI } from '@/components/marketing/WhyNotGenericAI';
import { PricingCards } from '@/components/pricing/PricingCards';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Flowdockr | Pricing Negotiation Support for Freelancers',
  description:
    'Respond to pricing pushback before a deal slips. Choose the right negotiation path and draft a send-ready reply from the exact client message.',
  canonicalUrl: '/',
  keywords:
    'freelance pricing negotiation, client discount response, quote too high reply, budget mismatch response',
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
      <ProblemStrip />
      <ConversationSurfaces />
      <ExampleConversation />
      <WhyNotGenericAI />
      <HomepageScenarioGrid />
      <HowItWorksSection />
      <SavedDealsPreview />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Pricing preview</h2>
        <p className="text-sm text-slate-700">
          Credits-first pricing for occasional and ongoing client conversations.
        </p>
        <PricingCards sourcePage="home" />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Why not just use ChatGPT?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Flowdockr is structured around real negotiation scenarios with strategy
            constraints and reusable history, not just generic text generation.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Will replies sound robotic?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. Outputs are concise, editable drafts designed for normal client
            communication, not canned scripts.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do I need an account before trying?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. You can start with 2 free negotiation credits first, then sign in when
            you want to save history or buy more support.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What happens after free credits are used?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You&apos;ll see a pack comparison and can continue with Quick Help, Pro, or
            Studio. Saved negotiation history is included from Pro upward.
          </p>
        </details>
      </section>

      <FinalCta />
    </main>
  );
}
