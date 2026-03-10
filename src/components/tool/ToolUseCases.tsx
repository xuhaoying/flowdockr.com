import type { ToolPageData } from '@/types/content';

type ToolUseCasesProps = {
  useCases: ToolPageData['exampleUseCases'];
};

export function ToolUseCases({ useCases }: ToolUseCasesProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Example use cases</h2>
      <ul className="space-y-2 text-sm text-slate-700">
        {useCases.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
