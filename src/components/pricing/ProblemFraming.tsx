const PROBLEM_BULLETS = [
  'A client asks for a discount right before signing.',
  'A lead compares your quote with a cheaper freelancer.',
  'A project starts expanding without a budget change.',
  'A client pushes for faster delivery or instant replies as if it is included.',
  'You need to say no to a client or project without burning the bridge.',
];

export function ProblemFraming() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Problem Framing
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Most pricing conversations break down in familiar ways
          </h2>
        </div>
        <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {PROBLEM_BULLETS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-slate-600">
          Flowdockr is designed for these exact moments. It helps you think
          through the negotiation, compare response styles, and keep the client
          conversation moving without giving away leverage too early.
        </p>
      </div>
    </section>
  );
}
