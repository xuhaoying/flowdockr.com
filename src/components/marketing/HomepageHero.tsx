import { SharedGeneratorEntry } from '@/components/generator/SharedGeneratorEntry';

import { Link } from '@/core/i18n/navigation';

const PROOF_POINTS = ['Reply draft', 'Strategy logic', 'Risk note'] as const;

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden py-2 md:py-4">
      <svg
        aria-hidden="true"
        className="text-brand-lavender/35 pointer-events-none absolute top-3 right-0 h-40 w-80 translate-x-1/3"
        viewBox="0 0 320 160"
        fill="none"
      >
        <path
          d="M7 98C61 36 122 36 181 80C226 114 263 111 314 54"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 126C83 74 133 71 188 105C232 132 267 127 306 88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      <div className="relative grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="space-y-5 lg:pt-8">
          <p className="border-brand-lavender/40 text-brand-primary inline-flex rounded-full border bg-white px-2.5 py-1 text-xs font-medium shadow-xs">
            FlowDockr for client negotiation
          </p>
          <h1 className="text-brand-text max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            AI negotiation assistant for difficult client replies
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
            Paste the real message. FlowDockr turns pricing pushback, scope
            pressure, and sensitive follow-ups into a clear strategy and a
            send-ready reply.
          </p>

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PROOF_POINTS.map((point) => (
              <div
                key={point}
                className="border-brand-lavender/25 rounded-lg border bg-white/80 px-3 py-2 text-sm font-medium text-slate-800 shadow-xs"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href="#tool-workspace"
              className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-linear-to-r px-5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              Try the free draft
            </a>
            <Link
              href="/scenario"
              className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-medium shadow-xs transition-colors"
            >
              Browse scenarios
            </Link>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            2 free negotiation drafts. No subscription required.
          </p>
        </div>

        <div className="border-brand-lavender/25 rounded-2xl border bg-white/80 p-3 shadow-sm shadow-slate-950/5 backdrop-blur">
          <SharedGeneratorEntry
            sourcePage="home"
            analyticsScenarioSlug="discount-request"
            defaultScenarioSlug="discount-request"
            initialMessage="Your quote is a bit above our budget. Can you do 20% off if we move forward this week?"
            submitLabel="Generate negotiation draft"
            workspaceTitle="Paste the message or situation"
            workspaceDescription="FlowDockr drafts around the real pressure, not a generic writing prompt."
            placeholder="Paste the client message here..."
            exampleShortcut={{
              label: 'Try example message',
              message:
                'Your quote is a bit above our budget. Can you do 20% off if we move forward this week?',
            }}
            analyticsEvents={{
              inputFocus: 'hero_input_focus',
              generateClick: 'hero_generate_clicked',
              generationCompleted: 'generation_completed',
              replyCopied: 'reply_copied',
              regenerateClicked: 'regenerate_clicked',
              toneVariationClicked: 'tone_variation_clicked',
            }}
            quickLinks={[
              {
                label: 'Payment follow-up',
                href: '/scenario/ask-for-payment-politely',
              },
              {
                label: 'Client wants a discount',
                href: '/scenario/discount-request',
              },
              {
                label: 'Extra work for free',
                href: '/scenario/extra-work-outside-scope',
              },
            ]}
            relatedClickEventName="related_scenario_clicked"
          />
        </div>
      </div>
    </section>
  );
}
