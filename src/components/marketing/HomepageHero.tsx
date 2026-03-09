import { Link } from '@/core/i18n/navigation';

export function HomepageHero() {
  return (
    <section className="space-y-2">
      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.08fr_0.92fr] lg:p-6">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            Built for freelancers and agencies
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Handle difficult client messages without weakening your position.
          </h1>
          <p className="max-w-3xl text-base text-slate-700 md:text-lg">
            Scenario-based AI negotiation support for pricing pressure, scope creep,
            lowball offers, delayed decisions, and difficult deal conversations.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/scenario"
              className="inline-flex rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800"
            >
              Browse scenarios
            </Link>
            <Link
              href="/tool"
              className="inline-flex rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-800 transition-colors hover:border-slate-400"
            >
              Try a real message
            </Link>
          </div>
        </div>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Product preview
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Client message</p>
              <p className="mt-1 text-sm text-slate-700">
                Can you lower the rate? My budget is tight this month.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-500">Flowdockr reply</p>
              <p className="mt-1 text-sm text-slate-700">
                I understand the budget concern. To keep quality, I usually keep the
                current rate, but I can reduce scope slightly to fit your budget.
              </p>
            </div>
            <p className="text-xs text-emerald-700">Saved to deal history</p>
          </div>
        </article>
      </div>

      <p className="text-sm text-slate-600">2 free replies. No subscription required.</p>
    </section>
  );
}
