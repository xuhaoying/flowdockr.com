const DIFFERENTIATORS = [
  {
    title: 'Scenario-specific context',
    description:
      'Each page starts from a real negotiation pressure, not a generic writing prompt.',
  },
  {
    title: 'Negotiation-aware framing',
    description:
      'Replies are tuned to protect pricing, boundaries, and deal momentum without sounding defensive.',
  },
  {
    title: 'Saved deal history',
    description:
      'Keep useful replies and context so future conversations get faster and more consistent.',
  },
];

export function WhyNotGenericAI() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why Flowdockr instead of generic AI
        </h2>
        <p className="text-sm text-slate-700">
          Built for real client negotiation decisions, not one-off copy generation.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {DIFFERENTIATORS.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-700">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
