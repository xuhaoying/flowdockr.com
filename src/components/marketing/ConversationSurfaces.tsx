export function ConversationSurfaces() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Where Flowdockr helps today
      </h2>
      <p className="text-sm text-slate-700">
        Pricing, payment, scope, and proposal follow-up scenarios are live now.
        Start from the situation that matches the conversation you are in.
      </p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-medium text-slate-700">
          Pricing conversations (live)
        </span>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-medium text-slate-700">
          Scope scenarios (live)
        </span>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-medium text-slate-700">
          Payment scenarios (live)
        </span>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 font-medium text-slate-700">
          Proposal follow-up (live)
        </span>
      </div>
    </section>
  );
}
