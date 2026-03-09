import { Link } from '@/core/i18n/navigation';

export function ExampleConversation() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Live example
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client message</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Your quote is higher than expected. Another freelancer can do this for
            $300.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suggested reply
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Thanks for sharing that. Pricing differences usually come down to scope and
            delivery quality. If budget is the main constraint, I can suggest a
            reduced-scope option so we keep the work effective without forcing a blind
            discount.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Why this works: protects pricing anchor, avoids defensiveness, and gives a
            clear next step.
          </p>
        </article>
      </div>
      <Link href="/scenario/lowball-offer" className="inline-flex text-sm font-semibold text-slate-900 underline">
        See full scenario
      </Link>
    </section>
  );
}
