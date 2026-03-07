import { Scenario } from '@/types/scenario';

type ScenarioOutputPreviewProps = {
  exampleReply: Scenario['exampleReply'];
  exampleAltReply: Scenario['exampleAltReply'];
};

export function ScenarioOutputPreview({
  exampleReply,
  exampleAltReply,
}: ScenarioOutputPreviewProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Example output</h2>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Recommended reply</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{exampleReply}</p>
      </article>

      <article className="rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Alternative reply</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{exampleAltReply}</p>
      </article>
    </section>
  );
}
