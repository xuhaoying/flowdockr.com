import { Link } from '@/core/i18n/navigation';

export function FinalCta() {
  return (
    <section className="border-brand-lavender/30 via-brand-bg text-brand-text rounded-2xl border bg-linear-to-br from-white to-white p-6 shadow-sm shadow-slate-950/5">
      <h2 className="text-2xl font-semibold tracking-tight">
        Paste the message before you answer
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-700">
        One rushed concession can reset your pricing for the whole deal. Draft a
        negotiation-aware reply first, then send with a clear position.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/scenario"
          className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex min-h-11 items-center rounded-md bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Browse reply scenarios
        </Link>
        <Link
          href="/tools/reply-generator"
          className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center rounded-md border bg-white px-4 py-2 text-sm font-semibold"
        >
          Open reply generator
        </Link>
      </div>
    </section>
  );
}
