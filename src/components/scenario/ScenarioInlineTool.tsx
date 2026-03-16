import { ToolForm } from '@/components/tool/ToolForm';

type ScenarioInlineToolProps = {
  analyticsScenarioSlug: string;
  defaultScenarioSlug: string;
  title: string;
  description: string;
  primaryClientMessage: string;
};

export function ScenarioInlineTool({
  analyticsScenarioSlug,
  defaultScenarioSlug,
  title,
  description,
  primaryClientMessage,
}: ScenarioInlineToolProps) {
  return (
    <section
      id="scenario-inline-tool"
      className="scroll-mt-24 rounded-[28px] border border-slate-300 bg-slate-50 p-5 shadow-sm lg:p-6"
    >
      <div className="max-w-3xl space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-700">{description}</p>
      </div>

      <div className="mt-5">
        <ToolForm
          analyticsScenarioSlug={analyticsScenarioSlug}
          funnelScenarioSlug={analyticsScenarioSlug}
          sourcePage="scenario"
          defaultScenarioSlug={defaultScenarioSlug}
          showScenarioSelector={false}
          placeholder={`Paste the exact version of "${primaryClientMessage}" or the closest message from the thread...`}
          submitLabel="Draft reply"
          workspaceTitle="Client message"
          workspaceDescription="Paste the exact wording from the conversation and review the suggested approach before you reply."
        />
      </div>
    </section>
  );
}
