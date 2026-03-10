import { Link } from '@/core/i18n/navigation';
import type { ToolPageData } from '@/types/content';

type RelatedScenariosProps = {
  links: ToolPageData['relatedScenarios'];
};

export function RelatedScenarios({ links }: RelatedScenariosProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Related scenarios</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 p-4 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
