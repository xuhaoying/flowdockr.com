import type { ScenarioRelatedLink } from '@/types/scenario-catalog';

import { Link } from '@/core/i18n/navigation';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type RelatedScenariosProps = {
  items: ScenarioRelatedLink[];
};

export function RelatedScenarios({ items }: RelatedScenariosProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Related negotiation situations
        </h2>
        <p className="text-sm text-slate-700">
          Explore adjacent client conversations that often show up around the
          same negotiation pressure.
        </p>
      </CardHeader>

      <CardContent className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/scenario/${item.slug}`}
            className="border-border/80 rounded-[18px] border bg-slate-50/60 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-xs"
          >
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {item.description}
            </p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
