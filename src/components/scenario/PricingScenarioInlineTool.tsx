import { ToolForm } from '@/components/tool/ToolForm';
import { getDefaultGeneratorScenarioSlug } from '@/lib/content/getScenarioBySlug';
import { getToolBySlug } from '@/lib/content/getToolBySlug';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';
import type { ScenarioPageData } from '@/types/content';

import { Link } from '@/core/i18n/navigation';

type PricingScenarioInlineToolProps = {
  scenario: ScenarioPageData;
};

export function PricingScenarioInlineTool({
  scenario,
}: PricingScenarioInlineToolProps) {
  const generatorScenarioSlug = getDefaultGeneratorScenarioSlug(scenario.slug);
  const generatorScenario = getGeneratorScenarioBySlug(generatorScenarioSlug);
  const tool = getToolBySlug(scenario.toolCta.toolSlug);
  const fullWorkspaceHref = `${
    tool?.url ?? `/tools/${scenario.toolCta.toolSlug}/`
  }?scenario=${encodeURIComponent(scenario.slug)}`;

  return (
    <section
      id="scenario-inline-tool"
      className="scroll-mt-24 space-y-4 rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-sm lg:p-6"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-100">
            Start here on this page
          </p>
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-100">
            2 free drafts
          </p>
        </div>
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            {scenario.toolCta.title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-200">
            {scenario.toolCta.body} Start with the exact message, add your quote
            or scope context, choose the tone, and generate without leaving this
            scenario page.
          </p>
        </div>
      </div>

      <ToolForm
        analyticsScenarioSlug={scenario.slug}
        defaultScenarioSlug={generatorScenarioSlug}
        showScenarioSelector={false}
        sourcePage="scenario"
        placeholder={
          generatorScenario?.placeholder ||
          'Paste the exact prospect message that pushed back on price...'
        }
        workspaceTitle="Start with the real client message"
        workspaceDescription="Paste the prospect's wording, add your quote or scope context, and generate a reply tuned for this pricing situation."
        submitLabel={scenario.toolCta.buttonLabel}
      />

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
        <span>Need the dedicated tool page instead?</span>
        <Link
          href={fullWorkspaceHref}
          className="font-semibold text-white underline underline-offset-2"
        >
          Open full workspace
        </Link>
      </div>
    </section>
  );
}
