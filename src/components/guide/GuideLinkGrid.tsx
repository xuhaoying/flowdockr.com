import { Link } from '@/core/i18n/navigation';
import type { NextDecisionLink } from '@/types/content';

type GuideLinkGridProps = {
  title: string;
  description?: string;
  links: NextDecisionLink[];
};

export function GuideLinkGrid({
  title,
  description,
  links,
}: GuideLinkGridProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-relaxed text-slate-700">
            {description}
          </p>
        ) : null}
      </div>
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
