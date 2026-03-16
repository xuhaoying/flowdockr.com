import type { ToolPageData } from '@/types/content';

type ToolBestForProps = {
  items: ToolPageData['bestFor'];
};

export function ToolBestFor({ items }: ToolBestForProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h2 className="text-lg font-semibold text-slate-900">Best for</h2>
      <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
