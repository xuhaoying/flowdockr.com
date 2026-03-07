export function CreditExplainer() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">How credits work</h2>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          1 generation = 1 credit.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          No monthly subscription required.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
          Buy only when you need more replies.
        </li>
      </ul>
    </section>
  );
}
