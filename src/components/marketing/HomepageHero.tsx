import { SharedGeneratorEntry } from '@/components/generator/SharedGeneratorEntry';

import { Link } from '@/core/i18n/navigation';

const PROOF_POINTS = [
  'Payment reminders',
  'Scope boundaries',
  'Discount replies',
] as const;

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden py-2 md:py-4">
      <div className="relative grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="space-y-5 lg:pt-8">
          <p className="border-brand-lavender/40 text-brand-primary inline-flex rounded-full border bg-white px-2.5 py-1 text-xs font-medium shadow-xs">
            Awkward work message generator
          </p>
          <h1 className="text-brand-text max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Professional Message Generator for Awkward Work Situations
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
            Create polite emails and replies for difficult client, coworker, and
            manager conversations. Start from the exact message you need to
            send, then copy a cleaner professional version.
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
              Generate a reply
            </a>
            <Link
              href="/client-communication-templates"
              className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-medium shadow-xs transition-colors"
            >
              Browse templates
            </Link>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            2 free message drafts. No subscription required.
          </p>
        </div>

        <div className="min-w-0">
          <SharedGeneratorEntry
            sourcePage="home"
            analyticsScenarioSlug="ask-for-payment-politely"
            defaultScenarioSlug="ask-for-payment-politely"
            initialMessage="Hi Sarah, following up on invoice #0187, which was due last Friday. Could you confirm when payment is scheduled?"
            submitLabel="Generate professional reply"
            workspaceTitle="Paste the message or situation"
            workspaceDescription="Draft a polite reply for the awkward message you need to send now."
            placeholder="Paste the client message, rough draft, or situation here..."
            exampleShortcut={{
              label: 'Try payment reminder',
              message:
                'Hi Sarah, following up on invoice #0187, which was due last Friday. Could you confirm when payment is scheduled?',
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
                label: 'Overdue invoice',
                href: '/scenario/overdue-invoice-no-response',
              },
              {
                label: 'Out of scope',
                href: '/scenario/out-of-scope-professionally',
              },
              {
                label: 'Discount request',
                href: '/scenario/discount-request',
              },
            ]}
            relatedClickEventName="related_scenario_clicked"
          />
        </div>
      </div>
    </section>
  );
}
