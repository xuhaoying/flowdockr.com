import { Link } from '@/core/i18n/navigation';

export function ExampleConversation() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        What Flowdockr produces
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Client message
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Your quote is higher than expected. Another freelancer can do this
            for $300.
          </p>
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              User goal
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Protect the price anchor without sounding defensive or losing the
              client conversation.
            </p>
          </div>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Flowdockr output
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
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
            <div className="rounded-lg border border-slate-200 bg-white p-3">
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
        className="inline-flex text-sm font-semibold text-slate-900 underline"
      >
        See full scenario
      </Link>
    </section>
  );
}
