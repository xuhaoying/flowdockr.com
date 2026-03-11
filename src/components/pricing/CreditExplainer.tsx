export function CreditExplainer() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        What is a negotiation credit?
      </h2>
      <p className="text-sm text-slate-700">
        A negotiation credit is used when you generate a client-facing response or
        strategy output. Most real situations use 2 to 3 credits because users
        usually compare multiple tones before sending a final reply.
      </p>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          Credits never expire.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          You only pay when you need negotiation support.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          Higher plans unlock deeper support, not just more credits.
        </li>
      </ul>
    </section>
  );
}
