import { ExampleConversation } from '@/components/marketing/ExampleConversation';
import { HomepageHero } from '@/components/marketing/HomepageHero';
import { HomepageScenarioGrid } from '@/components/marketing/HomepageScenarioGrid';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { PricingCards } from '@/components/pricing/PricingCards';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Flowdockr | AI Negotiation Assistant for Professionals',
  description:
    'Flowdockr helps professionals prepare for difficult conversations and negotiations with AI-guided strategy, reply drafts, and scenario support.',
  canonicalUrl: '/',
  keywords:
    'AI negotiation assistant, difficult conversations, pricing negotiation, client communication, negotiation preparation',
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

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 md:p-6">
        {[
          {
            title: 'Prepare before you respond',
            body: 'Turn a messy message or high-stakes conversation into a clearer plan, tone, and next step.',
          },
          {
            title: 'Negotiate without sounding aggressive',
            body: 'Keep commercial boundaries clear while preserving trust with clients, partners, and buyers.',
          },
          {
            title: 'Use AI with structure',
            body: 'Flowdockr guides replies through negotiation context, risk checks, and practical tradeoffs.',
          },
        ].map((feature) => (
          <article
            key={feature.title}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <h2 className="text-base font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {feature.body}
            </p>
          </article>
        ))}
      </section>

      <ExampleConversation />
      <WhyItWorks />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Common use cases
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Built for conversations where the wording matters
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            Flowdockr is useful when professionals need a calm, commercially
            sound response before a deal, payment, or relationship gets worse.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            'A prospect says the quote is too high.',
            'A client asks for a discount or cheaper option.',
            'A customer wants extra work without changing scope.',
            'A payment follow-up needs to stay firm and polite.',
            'A vendor or partner conversation needs a clear concession path.',
            'A manager, consultant, or founder needs to rehearse a difficult conversation.',
          ].map((useCase) => (
            <div
              key={useCase}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {useCase}
            </div>
          ))}
        </div>
      </section>

      <HomepageScenarioGrid />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Professional negotiation support, not generic chat
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-700">
          Start with the real message or situation. Flowdockr helps frame the
          negotiation, identify the tradeoff, and draft language you can edit
          before sending.
        </p>
        <Link
          href="/guides/how-to-negotiate-freelance-pricing"
          className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
        >
          Open pricing negotiation guide
        </Link>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Pricing preview
        </h2>
        <p className="text-sm text-slate-700">
          Start free. Paid credit packs are one-time purchases processed through
          checkout when you need more negotiation support.
        </p>
        <PricingCards sourcePage="home" />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          FAQ
        </h2>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Why not just use ChatGPT?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            Flowdockr is structured around real negotiation scenarios with
            strategy constraints and reusable history, not just generic text
            generation.
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
            No. You can start with 2 free negotiation credits first, then sign
            in when you want to save history or buy more support.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What happens after free credits are used?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You&apos;ll see a pack comparison and can continue with Quick Help,
            Pro, or Studio. Saved negotiation history is included from Pro
            upward.
          </p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is Flowdockr legal or financial advice?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. Flowdockr provides communication and negotiation drafting
            support. You are responsible for reviewing outputs and making final
            business decisions.
          </p>
        </details>
      </section>
    </main>
  );
}
