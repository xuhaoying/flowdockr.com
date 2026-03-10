import type { ToolPageData } from '@/types/content';

type ToolHeroProps = {
  tool: Pick<ToolPageData, 'h1' | 'heroSubheading' | 'intro'>;
};

export function ToolHero({ tool }: ToolHeroProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{tool.h1}</h1>
      <p className="max-w-4xl text-base text-slate-700">{tool.heroSubheading}</p>
      <p className="max-w-4xl text-sm leading-relaxed text-slate-700">{tool.intro}</p>
    </section>
  );
}
