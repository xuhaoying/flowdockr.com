import { Link } from '@/core/i18n/navigation';
import type { PricingGuideLink } from '@/types/pricing-cluster';

type RelatedGuidesProps = {
  items: PricingGuideLink[];
};

export function RelatedGuides({ items }: RelatedGuidesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related guides</h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-semibold text-slate-900 underline underline-offset-2"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
