import { Link } from '@/core/i18n/navigation';
import { getScenarioBySlug } from '@/lib/scenarios';

type RelatedScenariosProps = {
  slugs: string[];
};

export function RelatedScenarios({ slugs }: RelatedScenariosProps) {
  const items = slugs
    .map((slug) => getScenarioBySlug(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getScenarioBySlug>> =>
      Boolean(item)
    );

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related scenarios</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/scenarios/${item.slug}`}
            className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-700">{item.shortDescription}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/scenarios" className="text-slate-700 underline underline-offset-2">
          Browse all scenarios
        </Link>
        <Link href="/pricing" className="text-slate-700 underline underline-offset-2">
          View pricing
        </Link>
        <Link href="/tool" className="text-slate-700 underline underline-offset-2">
          Open generic tool
        </Link>
      </div>
    </section>
  );
}
