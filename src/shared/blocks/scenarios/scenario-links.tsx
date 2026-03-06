import { Link } from '@/core/i18n/navigation';
import { ScenarioDefinition } from '@/lib/promptTemplates';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type ScenarioLinksProps = {
  items: ScenarioDefinition[];
};

export function ScenarioLinks({ items }: ScenarioLinksProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">Related negotiation scenarios</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`/scenarios/${item.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/60">
              <CardHeader>
                <CardTitle className="text-base">{item.h1}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.shortExplanation}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
