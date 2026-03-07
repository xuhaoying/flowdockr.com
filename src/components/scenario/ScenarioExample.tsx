import { Scenario } from '@/lib/scenarios';

type ScenarioExampleProps = {
  scenario: Scenario;
};

export function ScenarioExample({ scenario }: ScenarioExampleProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Example input and output</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Example client message</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{scenario.exampleClientMessage}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Example generated reply</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{scenario.exampleReply}</p>
        </article>
      </div>

      <article className="rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Alternative version</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{scenario.exampleAltReply}</p>
      </article>
    </section>
  );
}
