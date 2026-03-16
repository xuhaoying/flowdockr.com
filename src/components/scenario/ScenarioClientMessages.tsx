type ScenarioClientMessagesProps = {
  primaryClientMessage: string;
  clientMessageVariants: string[];
};

export function ScenarioClientMessages({
  primaryClientMessage,
  clientMessageVariants,
}: ScenarioClientMessagesProps) {
  const additionalVariants = clientMessageVariants.filter(
    (variant) => variant !== primaryClientMessage
  );

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Typical client message
        </h2>
        <p className="text-sm text-slate-700">
          These are the real wording patterns this scenario is built to handle.
        </p>
      </div>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Most typical phrasing
        </p>
        <blockquote className="mt-3 text-base leading-7 text-slate-800">
          &ldquo;{primaryClientMessage}&rdquo;
        </blockquote>
      </article>

      {additionalVariants.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">
            Other ways this shows up
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {additionalVariants.map((variant) => (
              <article
                key={variant}
                className="rounded-xl border border-slate-200 p-4"
              >
                <blockquote className="text-sm leading-6 text-slate-700">
                  &ldquo;{variant}&rdquo;
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
