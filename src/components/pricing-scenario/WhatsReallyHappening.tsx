import type { PricingScenario } from '@/types/pricing-cluster';

type WhatsReallyHappeningProps = {
  scenario: PricingScenario;
};

const DEFAULT_HAPPENING_BY_TIER: Record<PricingScenario['tier'], string[]> = {
  tier1: [
    'The client may still want to proceed but is testing your pricing flexibility.',
    'The pressure may be budget-based, tactical, or a value-confidence gap.',
    'Your response should protect position while creating a clear next decision.',
  ],
  tier2: [
    'This pressure point usually appears as a tactical request, not a full rejection.',
    'If you respond without structure, scope and pricing boundaries blur quickly.',
    'A short, calm, options-based reply keeps momentum without weak concessions.',
  ],
};

export function WhatsReallyHappening({ scenario }: WhatsReallyHappeningProps) {
  const items =
    scenario.whatsReallyHappening && scenario.whatsReallyHappening.length > 0
      ? scenario.whatsReallyHappening
      : DEFAULT_HAPPENING_BY_TIER[scenario.tier];

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        What might actually be happening
      </h2>
      <ul className="space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
