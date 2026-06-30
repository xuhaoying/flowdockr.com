export function CreditExplainer() {
  return (
    <section className="border-brand-lavender/25 space-y-3 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-xl font-semibold text-slate-900">
        What is a message credit?
      </h2>
      <p className="text-sm text-slate-700">
        A message credit is used when you generate a client-facing response or
        strategy output. Most real situations use 2 to 3 credits because users
        usually compare multiple tones before sending a final reply.
      </p>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <span className="bg-brand-primary mt-1 inline-block h-1.5 w-1.5 rounded-full" />
          Credits never expire.
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-brand-primary mt-1 inline-block h-1.5 w-1.5 rounded-full" />
          You only pay when you need reply support.
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-brand-primary mt-1 inline-block h-1.5 w-1.5 rounded-full" />
          Higher plans unlock deeper support, not just more credits.
        </li>
      </ul>
    </section>
  );
}
