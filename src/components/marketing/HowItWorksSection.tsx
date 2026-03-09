export function HowItWorksSection() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How it works</h2>
      <ol className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">1. Pick a client situation</p>
          <p className="mt-1">Choose a scenario that matches your negotiation pressure.</p>
        </li>
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">2. Paste the client message</p>
          <p className="mt-1">Use the exact wording for better context and stronger output.</p>
        </li>
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">3. Generate a smarter reply</p>
          <p className="mt-1">Get a send-ready version plus an alternative and strategy notes.</p>
        </li>
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">4. Save to your deal history</p>
          <p className="mt-1">Keep reusable records for future negotiations.</p>
        </li>
      </ol>
    </section>
  );
}
