import { setRequestLocale } from 'next-intl/server';

import { ScenarioCard } from '@/components/scenario/ScenarioCard';
import { Link } from '@/core/i18n/navigation';
import { scenarios } from '@/lib/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Client Negotiation Scenarios for Freelancers | Flowdockr',
  description:
    'Browse client negotiation scenarios, then generate a professional reply tailored to that exact message.',
  canonicalUrl: '/scenario',
  keywords:
    'freelance negotiation scenarios, client discount response, scope creep reply, lowball offer response',
});

const PRESSURE_GROUPS: Array<{
  key: string;
  title: string;
  description: string;
  slugs: string[];
}> = [
  {
    key: 'pricing-pressure',
    title: 'Pricing pressure',
    description:
      'Discount asks, lowball offers, and price comparisons where you need to hold your position.',
    slugs: ['client-asks-discount', 'lowball-offer', 'cheaper-freelancer', 'budget-limited'],
  },
  {
    key: 'scope-pressure',
    title: 'Scope pressure',
    description:
      'Extra requests and boundary tests that quietly erode margin if not handled clearly.',
    slugs: ['more-work-same-budget', 'small-extra-free', 'free-sample-work'],
  },
  {
    key: 'delay-pressure',
    title: 'Delay and follow-up pressure',
    description:
      'Conversations where momentum stalls and you need a clear, low-pressure next step.',
    slugs: ['delayed-decision'],
  },
];

const DEAL_STAGE_GROUPS = [
  {
    key: 'before-quote',
    title: 'Before quote',
    slugs: ['free-sample-work', 'budget-limited'],
  },
  {
    key: 'after-quote',
    title: 'After quote',
    slugs: ['client-asks-discount', 'lowball-offer', 'cheaper-freelancer'],
  },
  {
    key: 'stalled-deal',
    title: 'Stalled deal',
    slugs: ['delayed-decision', 'more-work-same-budget', 'small-extra-free'],
  },
];

const GOAL_GROUPS = [
  {
    key: 'protect-price',
    title: 'Protect price',
    slugs: ['lowball-offer', 'client-asks-discount', 'cheaper-freelancer'],
  },
  {
    key: 'set-boundaries',
    title: 'Set boundaries',
    slugs: ['free-sample-work', 'more-work-same-budget', 'small-extra-free'],
  },
  {
    key: 'keep-momentum',
    title: 'Keep momentum',
    slugs: ['delayed-decision', 'budget-limited'],
  },
];

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Client negotiation scenarios for freelancers
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Browse common pricing and scope-pressure situations, then generate a
          professional reply tailored to that exact client message.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">By pressure type</h2>
        <p className="text-sm text-slate-700">
          Start from the negotiation pressure you are facing right now.
        </p>
        {PRESSURE_GROUPS.map((group) => (
          <ScenarioGroup key={group.key} title={group.title} description={group.description} slugs={group.slugs} />
        ))}
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">By deal stage</h2>
        <p className="text-sm text-slate-700">
          Navigate based on where the conversation sits in your deal lifecycle.
        </p>
        <div className="space-y-4">
          {DEAL_STAGE_GROUPS.map((group) => (
            <ScenarioMiniGroup key={group.key} title={group.title} slugs={group.slugs} />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">By goal</h2>
        <p className="text-sm text-slate-700">
          Choose the outcome you want to optimize in this specific message.
        </p>
        <div className="space-y-4">
          {GOAL_GROUPS.map((group) => (
            <ScenarioMiniGroup key={group.key} title={group.title} slugs={group.slugs} />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">All scenarios</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.slug} scenario={scenario} />
          ))}
        </div>
        <p className="text-sm text-slate-700">
          Need direct access without browsing? Use the generic tool.
        </p>
        <Link href="/tool" className="inline-flex text-sm font-semibold text-slate-900 underline">
          Open client conversation workspace
        </Link>
      </section>
    </main>
  );
}

function ScenarioGroup({
  title,
  description,
  slugs,
}: {
  title: string;
  description: string;
  slugs: string[];
}) {
  const items = slugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));

  if (items.length === 0) {
    return null;
  }

  return (
    <article className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-700">{description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((scenario) => (
          <ScenarioCard key={scenario.slug} scenario={scenario} />
        ))}
      </div>
    </article>
  );
}

function ScenarioMiniGroup({
  title,
  slugs,
}: {
  title: string;
  slugs: string[];
}) {
  const items = slugs
    .map((slug) => scenarios.find((scenario) => scenario.slug === slug))
    .filter((scenario): scenario is (typeof scenarios)[number] => Boolean(scenario));

  if (items.length === 0) {
    return null;
  }

  return (
    <article className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((scenario) => (
          <ScenarioCard key={scenario.slug} scenario={scenario} />
        ))}
      </div>
    </article>
  );
}
