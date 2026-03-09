import { Link } from '@/core/i18n/navigation';
import type { ScenarioNextDecisionLink } from '@/types/content';

type NextDecisionPathsProps = {
  links: ScenarioNextDecisionLink[];
};

export function NextDecisionPaths({ links }: NextDecisionPathsProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What to do next</h2>
      <p className="text-sm text-slate-700">
        Move to the next likely decision path instead of restarting from scratch.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/pricing" className="font-semibold text-slate-900 underline underline-offset-2">
          Back to pricing hub
        </Link>
        <Link
          href="/tools/price-negotiation-email-generator"
          className="font-semibold text-slate-900 underline underline-offset-2"
        >
          Open pricing email generator
        </Link>
      </div>
    </section>
  );
}
