import type { ToolPageData } from '@/types/content';

import { Link } from '@/core/i18n/navigation';

type RelatedScenariosProps = {
  links: ToolPageData['relatedScenarios'];
};

export function RelatedScenarios({ links }: RelatedScenariosProps) {
  return (
    <section className="border-brand-lavender/25 space-y-3 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-xl font-semibold text-slate-900">
        Related scenarios
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border-brand-lavender/20 text-brand-text hover:border-brand-primary/45 hover:bg-brand-bg/45 hover:text-brand-primary rounded-lg border bg-white p-4 text-sm font-semibold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
