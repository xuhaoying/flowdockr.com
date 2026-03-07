import { Scenario } from '@/types/scenario';

type ScenarioExampleMessageProps = {
  message: Scenario['exampleClientMessage'];
};

export function ScenarioExampleMessage({ message }: ScenarioExampleMessageProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Example client message</h2>
      <blockquote className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
        {message}
      </blockquote>
    </section>
  );
}
