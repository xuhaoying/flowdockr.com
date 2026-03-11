export function ConversationSurfaces() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Where Flowdockr helps today
      </h2>
      <p className="text-sm text-slate-700">
        Pricing conversations are live now. Scope, payment, and proposal follow-up
        workflows are next.
      </p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-medium text-slate-700">
          Pricing conversations (live)
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
          Scope workflow (next)
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
          Payment workflow (next)
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
          Proposal follow-up (next)
        </span>
      </div>
    </section>
  );
}
