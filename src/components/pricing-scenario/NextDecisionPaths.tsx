import { Link } from '@/core/i18n/navigation';
import type { PricingScenario } from '@/types/pricing-cluster';

type NextDecisionPathsProps = {
  items: PricingScenario[];
};

export function NextDecisionPaths({ items }: NextDecisionPathsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What to do next</h2>
      <p className="text-sm text-slate-700">
        Move to the next likely decision path instead of restarting from scratch.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/pricing/${item.slug}`}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-700">{item.shortDescription}</p>
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
