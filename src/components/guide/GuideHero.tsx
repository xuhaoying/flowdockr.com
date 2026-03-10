import type { GuidePageData } from '@/types/content';

type GuideHeroProps = {
  guide: Pick<GuidePageData, 'h1' | 'heroSubheading' | 'intro'>;
};

export function GuideHero({ guide }: GuideHeroProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {guide.h1}
      </h1>
      <p className="max-w-4xl text-base text-slate-700">{guide.heroSubheading}</p>
      <p className="max-w-4xl text-sm leading-relaxed text-slate-700">{guide.intro}</p>
    </section>
  );
}
