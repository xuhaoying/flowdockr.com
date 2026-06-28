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
      className="border-brand-lavender/30 via-brand-bg text-brand-text space-y-4 rounded-2xl border bg-linear-to-br from-white to-white p-5 shadow-sm shadow-slate-950/5"
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        {scenario.toolCta.title}
      </h2>
      <p className="text-sm leading-relaxed text-slate-700">
        {scenario.toolCta.body}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#scenario-inline-tool"
          className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex min-h-11 items-center rounded-md bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          {scenario.toolCta.buttonLabel}
        </a>
        <Link
          href={pricingToolHref}
          className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center rounded-md border bg-white px-4 py-2 text-sm font-semibold"
        >
          Open full workspace
        </Link>
      </div>
    </section>
  );
}
