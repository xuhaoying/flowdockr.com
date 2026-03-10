import type { ScenarioPageData } from '@/types/content';

type ScenarioFaqProps = {
  scenario: ScenarioPageData;
};

export function ScenarioFaq({ scenario }: ScenarioFaqProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
      <div className="space-y-2">
        {scenario.faq.map((item) => (
          <details
            key={item.question}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
