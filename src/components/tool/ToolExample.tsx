import { Scenario } from '@/types/scenario';

type ToolExampleProps = {
  scenario: Scenario;
  title?: string;
};

export function ToolExample({
  scenario,
  title = 'Example input and output',
}: ToolExampleProps) {
  return (
    <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Client message
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {scenario.exampleClientMessage}
          </p>
        </article>
        <article className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Recommended reply
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {scenario.exampleReply}
          </p>
        </article>
      </div>
      <article className="rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Alternative reply
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {scenario.exampleAltReply}
        </p>
      </article>
    </section>
  );
}
