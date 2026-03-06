import { ArrowRight, Sparkles } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { scenarios } from '@/lib/scenarios';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function ScenarioHubContent() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-indigo-50 via-background to-sky-50 p-6 md:p-10">
        <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -bottom-16 left-24 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit gap-1 text-xs">
              <Sparkles className="size-3.5" />
              Scenario-first negotiation copilot
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Reply like a strategist, not a generic AI writer.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Open a real client scenario, paste the exact message, and generate a
              response that protects your pricing position while keeping the deal alive.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild>
                <Link href="/scenarios/how-to-respond-to-a-lowball-offer">
                  Start with lowball offer
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                2 free replies, then credit packs.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Card className="border-foreground/10 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">1. Pick scenario</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Match the exact client pressure: discount, lowball, scope creep.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-foreground/10 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">2. Paste message</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use your real client text to avoid generic outputs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-foreground/10 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">3. Send confidently</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get a recommended reply, strategy logic, and an alternative version.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Choose your negotiation scenario
          </h2>
          <p className="text-sm text-muted-foreground">
            {scenarios.length} launch scenarios with buying intent
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link key={scenario.slug} href={`/scenarios/${scenario.slug}`} className="group">
              <Card className="h-full border-foreground/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/60 group-hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                      {scenario.promptContext.riskLevel} risk
                    </Badge>
                    <ArrowRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <CardTitle className="text-lg">{scenario.h1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-3">
                    {scenario.seoDescription}
                  </CardDescription>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {scenario.problemSummary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
