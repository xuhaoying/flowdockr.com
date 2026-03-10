import type { ToolPageData } from '@/types/content';

type ToolInputPreviewProps = {
  inputs: ToolPageData['inputs'];
};

export function ToolInputPreview({ inputs }: ToolInputPreviewProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Expected inputs</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {inputs.map((input) => (
          <article key={input.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">{input.label}</h3>
            <p className="mt-1 text-sm text-slate-700">{input.placeholder}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-600">
              {input.required ? 'Required' : 'Optional'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
