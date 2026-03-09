import { ToolForm } from '@/components/tool/ToolForm';
import type { PricingScenario } from '@/types/pricing-cluster';

type AIGeneratorToolProps = {
  scenario: PricingScenario;
};

export function AIGeneratorTool({ scenario }: AIGeneratorToolProps) {
  return (
    <section id="pricing-tool" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Generate a tailored reply</h2>
      <p className="text-sm text-slate-700">
        {scenario.toolCta ||
          'Paste the exact client message and project context. Flowdockr will draft a response that protects your rate and fits this negotiation stage.'}
      </p>
      <ToolForm
        sourcePage="scenario"
        defaultScenarioSlug={scenario.generatorScenarioSlug}
        showScenarioSelector={false}
        placeholder="Paste the exact prospect message and budget context..."
      />
    </section>
  );
}
