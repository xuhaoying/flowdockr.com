import { setRequestLocale } from 'next-intl/server';

import { PricingScenarioCard } from '@/components/pricing/PricingScenarioCard';
import { CreditExplainer } from '@/components/pricing/CreditExplainer';
import { PricingCards } from '@/components/pricing/PricingCards';
import { ToolForm } from '@/components/tool/ToolForm';
import { Link } from '@/core/i18n/navigation';
import { pricingScenarios } from '@/lib/pricing-cluster';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Freelance Pricing Negotiation Scenarios | Flowdockr',
  description:
    'Navigate pricing pushback, discount pressure, and budget mismatch with scenario-based negotiation guidance and reply generation.',
  canonicalUrl: '/pricing',
  keywords:
    'freelance pricing negotiation, client discount response, proposal price pushback, budget mismatch reply',
});

const PRICING_FAILURES = [
  'Discounting too early before understanding the real objection.',
  'Mixing a scope problem with a pricing problem.',
  'Failing to test whether budget pressure is real or tactical.',
  'Saving one deal while damaging long-term margin positioning.',
];

const PRICING_PRINCIPLES = [
  'Do not discount before you diagnose the objection.',
  'Separate deliverables from price in every negotiation step.',
  'Offer options with tradeoffs, not instant concessions.',
  'Protect long-term positioning, not just this single project.',
];

export default async function PricingHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featuredScenarios = pricingScenarios.filter((scenario) => scenario.featured);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <p className="inline-flex w-fit rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          Pricing cluster
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Freelance pricing negotiation scenarios
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Find the right response when a prospect pushes back on price, asks for a
          discount, or wants more work for the same budget.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why pricing conversations go wrong
        </h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {PRICING_FAILURES.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Choose your situation</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {pricingScenarios.map((scenario) => (
            <PricingScenarioCard key={scenario.slug} scenario={scenario} />
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Pricing principles</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {PRICING_PRINCIPLES.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured scenarios</h2>
        <p className="text-sm text-slate-700">
          Start with the core pricing decision pages that carry the highest intent and
          strongest conversion potential.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {featuredScenarios.map((scenario) => (
            <PricingScenarioCard key={scenario.slug} scenario={scenario} />
          ))}
        </div>
      </section>

      <section id="pricing-tool" className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Use the tool</h2>
        <p className="text-sm text-slate-700">
          Paste the exact message and your project context to generate a pricing reply
          that protects your rate and keeps the conversation moving.
        </p>
        <ToolForm
          sourcePage="tool"
          defaultScenarioSlug="lowball-offer"
          showScenarioSelector={true}
          placeholder="Paste the exact message where they pushed back on pricing..."
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related guides</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            href="/guides/how-to-negotiate-freelance-pricing"
            className="rounded-lg border border-slate-200 p-4 text-sm text-slate-800 transition-colors hover:border-slate-400"
          >
            How to negotiate freelance pricing
          </Link>
          <Link
            href="/guides/when-to-discount-and-when-not-to"
            className="rounded-lg border border-slate-200 p-4 text-sm text-slate-800 transition-colors hover:border-slate-400"
          >
            When to discount and when not to
          </Link>
          <Link
            href="/guides/reduce-scope-instead-of-lowering-rate"
            className="rounded-lg border border-slate-200 p-4 text-sm text-slate-800 transition-colors hover:border-slate-400"
          >
            Reduce scope instead of lowering your rate
          </Link>
        </div>
      </section>

      <section id="credits-pricing" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Credits pricing</h2>
        <p className="text-sm text-slate-700">
          Start with 2 free replies, then buy credits when you need deeper support.
        </p>
        <PricingCards sourcePage="pricing" />
        <CreditExplainer />
      </section>
    </main>
  );
}
