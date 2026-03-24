import type { ScenarioRelatedLink } from '@/types/scenario-catalog';

import { Link } from '@/core/i18n/navigation';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type RelatedScenariosProps = {
  items: ScenarioRelatedLink[];
  title: string;
  description: string;
};

export function RelatedScenarios({
  items,
  title,
  description,
}: RelatedScenariosProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/scenario/${item.slug}`}
                className="border-border/80 block rounded-[18px] border bg-slate-50/70 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
