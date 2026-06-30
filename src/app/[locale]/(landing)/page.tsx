import { ExampleConversation } from '@/components/marketing/ExampleConversation';
import { HomepageHero } from '@/components/marketing/HomepageHero';
import { HomepageScenarioGrid } from '@/components/marketing/HomepageScenarioGrid';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { PricingCards } from '@/components/pricing/PricingCards';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title:
    'Professional Message Generator for Awkward Work Situations | FlowDockr',
  description:
    'Generate polite, professional emails and replies for asking for payment, saying no, handling scope creep, following up, and setting boundaries with clients or coworkers.',
  canonicalUrl: '/',
  keywords:
    'professional message generator, payment reminder email, scope creep email template, client communication templates, reply generator',
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

      <section className="border-brand-lavender/25 grid gap-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5 md:grid-cols-3 md:p-6">
        {[
          {
            title: 'Start from the awkward situation',
            body: 'Choose the real scenario: payment reminder, scope creep, discount request, follow-up, or a polite no.',
          },
          {
            title: 'Copy wording that sounds professional',
            body: 'Use templates that are direct enough to protect the boundary and calm enough to preserve the relationship.',
          },
          {
            title: 'Generate a custom reply',
            body: 'Paste the actual message and get a tailored draft you can edit before sending.',
          },
        ].map((feature) => (
          <article
            key={feature.title}
            className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4"
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

      <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5 md:p-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Popular client communication scenarios
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Get to the template before the explanation
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            FlowDockr is organized around the messages freelancers, consultants,
            agencies, and small business owners need to send under pressure.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            'A prospect says the quote is too high.',
            'A client asks for payment before it is comfortable to follow up.',
            'An overdue invoice needs a firm but polite reminder.',
            'A client asks for extra work without extra budget.',
            'A request needs to be marked out of scope professionally.',
            'A client asks for a discount or cheaper option.',
          ].map((useCase) => (
            <div
              key={useCase}
              className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border px-4 py-3 text-sm text-slate-700"
            >
              {useCase}
            </div>
          ))}
        </div>
      </section>

      <HomepageScenarioGrid />

      <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Templates for freelancers and consultants
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-700">
          The strongest early cluster is client communication: payment, scope,
          discount pressure, and boundary-setting messages with real commercial
          consequences.
        </p>
        <Link
          href="/client-communication-templates"
          className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center rounded-md border bg-white px-4 py-2 text-sm font-semibold transition-colors"
        >
          Open client communication templates
        </Link>
      </section>

      <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Pricing preview
        </h2>
        <p className="text-sm text-slate-700">
          Start free. Paid credit packs are one-time purchases processed through
          checkout when you need more reply support.
        </p>
        <PricingCards sourcePage="home" />
      </section>

      <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          FAQ
        </h2>
        <details className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What is FlowDockr for?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            FlowDockr helps you write polite professional messages for awkward
            work situations such as payment reminders, scope creep, discount
            requests, follow-ups, and boundary-setting.
          </p>
        </details>
        <details className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is this only for freelancers?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            The current focus is freelancers, consultants, agencies, and small
            business owners, but many templates also work for coworker, manager,
            and vendor conversations.
          </p>
        </details>
        <details className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Do I need an account before trying?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. You can start with 2 free message drafts first, then sign in
            when you want to save history or buy more support.
          </p>
        </details>
        <details className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            What happens after free credits are used?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            You&apos;ll see a pack comparison and can continue with Quick Help,
            Pro, or Studio. Saved message history is included from Pro upward.
          </p>
        </details>
        <details className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Is FlowDockr legal or financial advice?
          </summary>
          <p className="mt-2 text-sm text-slate-700">
            No. FlowDockr provides communication drafting support for
            professional client conversations. It is not a law firm, financial
            adviser, lender, broker, debt settlement service, debt collection
            service, bank, or money transmitter. You are responsible for
            reviewing outputs and making final business decisions.
          </p>
        </details>
      </section>
    </main>
  );
}
