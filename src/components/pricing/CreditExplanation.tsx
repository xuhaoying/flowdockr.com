const FLOW_STEPS = [
  'Client message',
  'Review strategy',
  'Compare responses',
  'Send reply',
];

export function CreditExplanation() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            How Negotiation Credits Work
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            One credit covers one full generation
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          A negotiation credit is used when you generate a complete support
          output for one situation. That includes the suggested approach, the
          visible response options, and any plan-specific guidance shown on the
          result page. Credits do not expire.
        </p>
        <div className="flex flex-col gap-2 text-sm text-slate-700 md:flex-row md:items-center">
          {FLOW_STEPS.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                {step}
              </div>
              {index < FLOW_STEPS.length - 1 ? (
                <span className="hidden text-slate-400 md:inline">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
