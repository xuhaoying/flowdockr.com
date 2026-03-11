import { Link } from '@/core/i18n/navigation';

export function HomepageHero() {
  return (
    <section className="space-y-2">
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.08fr_0.92fr] lg:p-6">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            Built for pricing conversations
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            A weak pricing reply can cost the deal or your margin.
          </h1>
          <p className="max-w-3xl text-base text-slate-700 md:text-lg">
            Flowdockr helps freelancers, consultants, and agencies choose the right
            next move under pricing pressure, then draft a send-ready reply from the
            exact client message.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/tools/price-negotiation-email-generator"
              className="inline-flex rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800"
            >
              Draft my pricing reply
            </Link>
            <Link
              href="/pricing"
              className="inline-flex rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-800 transition-colors hover:border-slate-400"
            >
              Open pricing decision paths
            </Link>
          </div>
        </div>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Message pressure preview
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Client message</p>
              <p className="mt-1 text-sm text-slate-700">
                Your quote feels high. Another freelancer said they can do this for less.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Flowdockr reply</p>
              <p className="mt-1 text-sm text-slate-700">
                Thanks for sharing that. If budget is the main issue, we can reduce
                scope while keeping the quality level needed for the result.
              </p>
            </div>
            <p className="text-xs text-emerald-700">
              Decision path selected, draft ready to send
            </p>
          </div>
        </article>
      </div>

      <p className="text-sm text-slate-600">
        Start with 2 free real-message drafts. No subscription required.
      </p>
    </section>
  );
}
