import { setRequestLocale } from 'next-intl/server';

import { ExampleConversation } from '@/components/marketing/ExampleConversation';
import { FinalCta } from '@/components/marketing/FinalCta';
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
    'Handle pricing pushback, discount pressure, and budget mismatch with structured negotiation support for freelancers and agencies.',
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
            No. You can start with 2 free replies first, then sign in when you want to
            save history or buy credits.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What happens after free replies are used?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You&apos;ll see an upgrade prompt and can continue with credits. Your
            generated replies can still be saved into your negotiation library.
          </p>
        </details>
      </section>

      <FinalCta />
    </main>
  );
}
