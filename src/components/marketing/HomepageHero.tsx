import { SharedGeneratorEntry } from '@/components/generator/SharedGeneratorEntry';
import { Link } from '@/core/i18n/navigation';

export function HomepageHero() {
  return (
    <section className="space-y-2">
      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            Built for difficult client conversations
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Reply to difficult client messages with confidence
          </h1>
          <p className="max-w-3xl text-base text-slate-700 md:text-lg">
            Paste what the client said. Get a reply you can actually send.
          </p>
          <SharedGeneratorEntry
            sourcePage="home"
            analyticsScenarioSlug="discount-request"
            defaultScenarioSlug="discount-request"
            initialMessage="Your quote is a bit above our budget. Can you do 20% off if we move forward this week?"
            submitLabel="Generate reply"
            workspaceTitle="Paste the client message"
            workspaceDescription="Start with the exact wording. Flowdockr will draft a send-ready reply around the real negotiation pressure."
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
                label: 'Ask for payment',
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

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Result preview
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Client message</p>
              <p className="mt-1 text-sm text-slate-700">
                Your quote is a bit above our budget. Can you do 20% off if we move
                forward this week?
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Flowdockr reply</p>
              <p className="mt-1 text-sm text-slate-700">
                I&apos;m happy to keep this moving, but I would not reduce the same
                scope without changing the structure behind it. If budget is the
                issue, I can suggest a leaner version or a phased first step so the
                tradeoff stays clear.
              </p>
            </div>
            <p className="text-xs text-emerald-700">
              Send-ready draft, clear tradeoff, next step included
            </p>
          </div>
        </article>
      </div>

      <p className="text-sm text-slate-600">
        Start with 2 free real-message drafts. No subscription required.
      </p>
      <p className="text-sm text-slate-600">
        Need a narrower entry point? Browse the full{' '}
        <Link href="/scenario" className="font-semibold text-slate-900 underline">
          scenario library
        </Link>
        .
      </p>
    </section>
  );
}
