import { Link } from '@/core/i18n/navigation';
import type { GuidePageData } from '@/types/content';

type RecommendedScenariosProps = {
  links: GuidePageData['recommendedScenarios'];
};

export function RecommendedScenarios({ links }: RecommendedScenariosProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Recommended scenarios</h2>
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
