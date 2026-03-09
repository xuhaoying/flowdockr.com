export function ExampleConversation() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Example conversation
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Can you lower the rate a bit? My budget is tight.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Flowdockr reply
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            I understand the budget concern. To keep the quality of the work, I
            usually keep the current rate. If needed, we can reduce scope slightly to
            fit your budget.
          </p>
        </article>
      </div>
    </section>
  );
}
