import type { ToolPageData } from '@/types/content';

type ToolBestForProps = {
  items: ToolPageData['bestFor'];
};

export function ToolBestFor({ items }: ToolBestForProps) {
  return (
    <section className="border-brand-lavender/25 space-y-3 rounded-2xl border bg-white p-4 shadow-sm shadow-slate-950/5 md:p-5">
      <h2 className="text-lg font-semibold text-slate-900">Best for</h2>
      <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="border-brand-lavender/20 bg-brand-bg/55 rounded-xl border px-3 py-2.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
