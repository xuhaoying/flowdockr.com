export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How it works</h2>
      <ol className="grid gap-3 text-sm text-slate-700 md:grid-cols-3">
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">1. Find your situation</p>
          <p className="mt-1">Open the scenario that matches your exact client pressure.</p>
        </li>
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">2. Generate a structured reply</p>
          <p className="mt-1">Paste the exact message and get a send-ready response with strategy notes.</p>
        </li>
        <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">3. Save what works</p>
          <p className="mt-1">Keep useful replies in deal history so future negotiations are faster.</p>
        </li>
      </ol>
    </section>
  );
}
