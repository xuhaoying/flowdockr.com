import { Scenario } from '@/types/scenario';

type ScenarioProblemProps = {
  paragraphs: Scenario['problemText'];
};

export function ScenarioProblem({ paragraphs }: ScenarioProblemProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why this happens</h2>
      <div className="space-y-2 text-sm text-slate-700">
        {paragraphs.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
