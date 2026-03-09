import { Link } from '@/core/i18n/navigation';

export function FinalCta() {
  return (
    <section className="rounded-2xl border border-slate-900 bg-slate-900 p-6 text-white shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">Start with a real client message</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-200">
        See how Flowdockr would reply, then save the result into your deal history to
        build reusable negotiation patterns.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/scenario"
          className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Try a scenario
        </Link>
        <Link
          href="/tool"
          className="inline-flex rounded-md border border-slate-400 px-4 py-2 text-sm font-semibold text-white"
        >
          Try a real message
        </Link>
      </div>
    </section>
  );
}
