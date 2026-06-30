import type { PricingRelatedScenarioScript } from '@/lib/content/pricingRelatedScenarios';

import { Link } from '@/core/i18n/navigation';

type RelatedScenarioScriptsProps = {
  items: PricingRelatedScenarioScript[];
};

export function RelatedScenarioScripts({ items }: RelatedScenarioScriptsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Related reply scripts
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-700">
          Use these scenario pages when you need the exact wording for a live
          client message, not just the pricing decision framework.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300 hover:bg-white"
          >
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
