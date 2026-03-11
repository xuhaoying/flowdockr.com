import { ToolForm } from '@/components/tool/ToolForm';
import type { ScenarioToolPreset } from '@/types/scenario-page';

type ScenarioInlineToolProps = {
  analyticsScenarioSlug: string;
  toolPreset: ScenarioToolPreset;
};

export function ScenarioInlineTool({
  analyticsScenarioSlug,
  toolPreset,
}: ScenarioInlineToolProps) {
  return (
    <section
      id="scenario-inline-tool"
      className="scroll-mt-24 rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6"
    >
      <div className="max-w-3xl space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {toolPreset.title}
        </h2>
        <p className="text-sm leading-6 text-slate-700">
          {toolPreset.description}
        </p>
      </div>

      <div className="mt-5">
        <ToolForm
          analyticsScenarioSlug={analyticsScenarioSlug}
          sourcePage="scenario"
          defaultScenarioSlug={toolPreset.scenarioSlug}
          showScenarioSelector={false}
          placeholder={toolPreset.inputPlaceholder}
          submitLabel={toolPreset.ctaLabel}
          workspaceTitle="Client message"
          workspaceDescription="Paste the exact wording from the conversation and review the suggested approach before you reply."
        />
      </div>
    </section>
  );
}
