export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        How it works
      </h2>
      <ol className="grid gap-3 text-sm text-slate-700 md:grid-cols-3">
        <li className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-3">
          <p className="font-semibold text-slate-900">
            Find your pricing situation
          </p>
          <p className="mt-1">
            Open the page that matches your exact pricing pressure.
          </p>
        </li>
        <li className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-3">
          <p className="font-semibold text-slate-900">
            Generate a structured reply
          </p>
          <p className="mt-1">
            Paste the exact message and get a send-ready response with strategy
            notes.
          </p>
        </li>
        <li className="border-brand-lavender/20 bg-brand-bg/55 rounded-lg border p-3">
          <p className="font-semibold text-slate-900">Save what works</p>
          <p className="mt-1">
            Keep useful replies in deal history so future negotiations are
            faster.
          </p>
        </li>
      </ol>
    </section>
  );
}
