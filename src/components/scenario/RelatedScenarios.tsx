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
          Related situations
        </h2>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-2 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/scenario/${item.slug}`}
                className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-700"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
