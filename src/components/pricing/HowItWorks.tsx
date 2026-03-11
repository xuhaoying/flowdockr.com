const STEPS = [
  {
    step: '1',
    title: 'Describe the situation',
    description:
      'Paste the client message and choose the negotiation scenario you are dealing with.',
  },
  {
    step: '2',
    title: 'Review the strategy',
    description:
      'See the suggested approach before you decide how hard or soft to respond.',
  },
  {
    step: '3',
    title: 'Compare response styles',
    description:
      'Check the tone options that best fit the client relationship and pricing pressure.',
  },
  {
    step: '4',
    title: 'Respond with confidence',
    description:
      'Send the version that matches the moment, with clearer boundaries and less second-guessing.',
  },
];

export function HowItWorks() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            How Flowdockr Helps
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            A simple workflow for high-stakes client conversations
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((item) => (
            <article
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-900">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
