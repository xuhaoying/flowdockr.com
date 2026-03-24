import { ToolForm } from '@/components/tool/ToolForm';

import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

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
    <Card
      id="scenario-inline-tool"
      className="border-border/80 scroll-mt-24 overflow-hidden rounded-[24px] bg-white py-0 shadow-sm"
    >
      <CardHeader className="border-border/70 gap-2 border-b bg-gradient-to-br from-white via-white to-slate-50/80 px-5 py-5 lg:px-6 lg:py-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Reply generator
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-700">{description}</p>
      </CardHeader>

      <CardContent className="px-5 py-5 lg:px-6 lg:py-6">
        <ToolForm
          analyticsScenarioSlug={analyticsScenarioSlug}
          funnelScenarioSlug={analyticsScenarioSlug}
          sourcePage="scenario"
          defaultScenarioSlug={defaultScenarioSlug}
          showScenarioSelector={false}
          placeholder={`Paste the exact version of "${primaryClientMessage}" or the closest message from the thread...`}
          submitLabel="Generate reply"
          workspaceTitle="Client message"
          workspaceDescription="Paste the exact wording from the conversation and generate a stronger reply you can edit before sending."
        />
      </CardContent>
    </Card>
  );
}
