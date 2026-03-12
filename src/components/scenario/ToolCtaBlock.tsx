import { getToolBySlug } from '@/lib/content/getToolBySlug';
import type { ScenarioPageData } from '@/types/content';

import { Link } from '@/core/i18n/navigation';

type ToolCtaBlockProps = {
  scenario: ScenarioPageData;
};

export function ToolCtaBlock({ scenario }: ToolCtaBlockProps) {
  const tool = getToolBySlug(scenario.toolCta.toolSlug);
  const baseToolHref = tool?.url ?? `/tools/${scenario.toolCta.toolSlug}/`;
  const pricingToolHref = `${baseToolHref}?scenario=${encodeURIComponent(scenario.slug)}`;

  return (
    <section
      id="scenario-tool-cta"
      className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-sm"
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        {scenario.toolCta.title}
      </h2>
      <p className="text-sm leading-relaxed text-slate-200">
        {scenario.toolCta.body}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#scenario-inline-tool"
          className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          {scenario.toolCta.buttonLabel}
        </a>
        <Link
          href={pricingToolHref}
          className="inline-flex items-center rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
        >
          Open full workspace
        </Link>
      </div>
    </section>
  );
}
