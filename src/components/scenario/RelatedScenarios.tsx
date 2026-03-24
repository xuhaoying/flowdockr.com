import type {
  ScenarioRelatedGroup,
  ScenarioRelatedLink,
} from '@/types/scenario-catalog';

import { Link } from '@/core/i18n/navigation';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type RelatedScenariosProps = {
  items?: ScenarioRelatedLink[];
  groups?: ScenarioRelatedGroup[];
  title: string;
  description: string;
};

export function RelatedScenarios({
  items = [],
  groups = [],
  title,
  description,
}: RelatedScenariosProps) {
  const sections =
    groups.length > 0
      ? groups.filter((group) => group.items.length > 0)
      : items.length > 0
        ? [{ id: 'related' as const, title, description, items }]
        : [];

  if (sections.length === 0) {
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

      <CardContent className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            {groups.length > 0 ? (
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  {section.title}
                </h3>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  {section.description}
                </p>
              </div>
            ) : null}
            <ul className="grid gap-3 md:grid-cols-2">
              {section.items.map((item) => (
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
