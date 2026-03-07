import { Scenario } from '@/lib/scenarios';

type ScenarioFaqProps = {
  scenario: Scenario;
};

export function ScenarioFaq({ scenario }: ScenarioFaqProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
      <div className="space-y-2">
        {scenario.faq.map((item) => (
          <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              {item.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
