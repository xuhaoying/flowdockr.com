import type { PricingScenario } from '@/types/pricing-cluster';

type FAQBlockProps = {
  scenario: PricingScenario;
};

export function FAQBlock({ scenario }: FAQBlockProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common questions</h2>
      <div className="space-y-2">
        {scenario.faq.map((item) => (
          <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.q}</summary>
            <p className="mt-2 text-sm text-slate-700">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
