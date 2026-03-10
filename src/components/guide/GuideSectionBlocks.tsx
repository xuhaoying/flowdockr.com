import type { GuidePageData } from '@/types/content';

type GuideSectionBlocksProps = {
  sections: GuidePageData['sections'];
};

export function GuideSectionBlocks({ sections }: GuideSectionBlocksProps) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{section.summary}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {section.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
