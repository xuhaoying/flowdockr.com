import { CopyButton } from '@/components/tool/CopyButton';
import type { ScenarioCopyReadyTemplate } from '@/lib/content/scenarioDetailContent';

type ScenarioTemplatePreviewProps = {
  templates: ScenarioCopyReadyTemplate[];
};

export function ScenarioTemplatePreview({
  templates,
}: ScenarioTemplatePreviewProps) {
  if (templates.length === 0) {
    return null;
  }

  return (
    <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5 md:p-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Copy-ready templates
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Start with wording you can send
        </h2>
        <p className="text-sm leading-6 text-slate-700">
          Pick the closest version, copy it, then replace the names, invoice
          details, dates, and scope notes before sending.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {templates.map((template) => (
          <article
            key={template.title}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                {template.title}
              </h3>
              <CopyButton
                value={template.text}
                idleLabel="Copy"
                copiedLabel="Copied"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-800">
              {template.text}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              <span className="font-semibold text-slate-900">Best for:</span>{' '}
              {template.bestFor}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
