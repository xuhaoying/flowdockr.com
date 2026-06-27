import { scenarios } from '@/lib/scenarios';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
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
      <section className="border-brand-lavender/25 via-brand-bg relative overflow-hidden rounded-3xl border bg-linear-to-br from-white to-white p-6 shadow-sm shadow-slate-950/5 md:p-10">
        <svg
          aria-hidden="true"
          className="text-brand-lavender/35 pointer-events-none absolute top-8 -right-10 h-44 w-80"
          viewBox="0 0 320 176"
          fill="none"
        >
          <path
            d="M8 104C68 42 128 42 190 88C234 121 268 116 313 62"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M27 135C85 83 139 80 198 113C239 136 273 130 306 96"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.65"
          />
        </svg>
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit gap-1 text-xs">
              <Sparkles className="size-3.5" />
              Scenario-first negotiation copilot
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Reply like a strategist, not a generic AI writer.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
              Open a real client scenario, paste the exact message, and generate
              a response that protects your pricing position while keeping the
              deal alive.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild>
                <Link href="/scenarios/lowball-offer">
                  Start with lowball offer
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="text-muted-foreground text-sm">
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
                  Match the exact client pressure: discount, lowball, scope
                  creep.
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
                  Get a recommended reply, strategy logic, and an alternative
                  version.
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
          <p className="text-muted-foreground text-sm">
            {scenarios.length} launch scenarios with buying intent
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              className="group"
            >
              <Card className="border-foreground/10 group-hover:border-primary/60 h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-[10px] tracking-wide uppercase"
                    >
                      {scenario.riskLevel} risk
                    </Badge>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{scenario.h1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-3">
                    {scenario.metaDescription}
                  </CardDescription>
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {scenario.shortDescription}
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
