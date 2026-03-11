import { Link } from '@/core/i18n/navigation';

export function FinalCta() {
  return (
    <section className="rounded-2xl border border-slate-900 bg-slate-900 p-6 text-white shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">Paste the message before you answer</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-200">
        One rushed concession can reset your pricing for the whole deal. Draft a
        negotiation-aware reply first, then send with a clear position.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/tools/price-negotiation-email-generator"
          className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Draft my pricing reply
        </Link>
        <Link
          href="/pricing"
          className="inline-flex rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-white"
        >
          Open pricing decision paths
        </Link>
      </div>
    </section>
  );
}
