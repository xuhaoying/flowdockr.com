import { ToolForm } from '@/components/tool/ToolForm';
import { Link } from '@/core/i18n/navigation';
import type { ToolCTA } from '@/types/content';
import type { PricingScenario } from '@/types/pricing-cluster';

type AIGeneratorToolProps = {
  scenario: PricingScenario;
  scenarioSlug: string;
  cta: ToolCTA;
};

export function AIGeneratorTool({ scenario, scenarioSlug, cta }: AIGeneratorToolProps) {
  const toolHref = `/tools/${cta.toolSlug}?scenario=${encodeURIComponent(scenarioSlug)}`;

  return (
    <section id="pricing-tool" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{cta.title}</h2>
      <p className="text-sm text-slate-700">{cta.body}</p>
      <ToolForm
        analyticsScenarioSlug={scenarioSlug}
        sourcePage="scenario"
        defaultScenarioSlug={scenario.generatorScenarioSlug}
        showScenarioSelector={false}
        placeholder="Paste the exact prospect message and budget context..."
      />
      <Link
        href={toolHref}
        className="inline-flex rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 hover:border-slate-500"
      >
        {cta.buttonLabel}
      </Link>
    </section>
  );
}
