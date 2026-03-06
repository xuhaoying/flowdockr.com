import { Link } from '@/core/i18n/navigation';
import { scenarios } from '@/lib/scenarios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function ScenarioHubContent() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="space-y-3">
        <p className="inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Flowdockr
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Scenario-driven freelance negotiation assistant
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Pick the exact client situation, paste the message, and generate a professional reply instantly.
          This product is not a general AI chat tool.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Choose your negotiation scenario</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link key={scenario.slug} href={`/scenarios/${scenario.slug}`}>
              <Card className="h-full transition-colors hover:border-primary/60">
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.h1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{scenario.seoDescription}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
