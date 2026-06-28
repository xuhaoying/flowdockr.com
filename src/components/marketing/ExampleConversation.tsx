import { Link } from '@/core/i18n/navigation';

export function ExampleConversation() {
  return (
    <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        What FlowDockr produces
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Client message
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Your quote is higher than expected. Another freelancer can do this
            for $300.
          </p>
          <div className="border-brand-lavender/20 mt-4 rounded-lg border bg-white p-3">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              User goal
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Protect the price anchor without sounding defensive or losing the
              client conversation.
            </p>
          </div>
        </article>
        <article className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            FlowDockr output
          </p>
          <div className="mt-3 space-y-3">
            <div className="border-brand-lavender/20 rounded-lg border bg-white p-3">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Strategy
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Move the conversation from price comparison to scope, quality,
                and delivery trade-offs.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase">
                Risk note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950">
                Matching the lower price without reducing scope teaches the
                client that your first quote was inflated.
              </p>
            </div>
            <div className="border-brand-lavender/20 rounded-lg border bg-white p-3">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Suggested reply
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Thanks for sharing that. Pricing differences usually come down
                to scope and delivery quality. If budget is the main constraint,
                I can suggest a reduced-scope option so we keep the work
                effective without forcing a blind discount.
              </p>
            </div>
          </div>
        </article>
      </div>
      <Link
        href="/scenario/quote-too-high"
        className="text-brand-primary inline-flex min-h-11 items-center text-sm font-semibold underline"
      >
        See full scenario
      </Link>
    </section>
  );
}
