import type { PricingScenario } from '@/types/pricing-cluster';

type CopyReadyRepliesProps = {
  scenario: PricingScenario;
};

export function CopyReadyReplies({ scenario }: CopyReadyRepliesProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Copy-ready replies</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.copyReadyExamples.map((example) => (
          <article key={`${example.tone}-${example.text}`} className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900">{example.tone}</h3>
            <p className="mt-2 text-sm text-slate-700">{example.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
