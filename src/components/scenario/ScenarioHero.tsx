import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioHeroProps = {
  title: string;
  archetypeLabel: string;
  negotiationStageLabel: string;
  primaryClientMessage: string;
};

export function ScenarioHero({
  title,
  archetypeLabel,
  negotiationStageLabel,
  primaryClientMessage,
}: ScenarioHeroProps) {
  return (
    <Card className="border-border/80 overflow-hidden rounded-[24px] bg-white py-0 shadow-sm">
      <CardHeader className="border-border/70 gap-6 border-b bg-gradient-to-br from-white via-white to-slate-50/80 px-6 py-6 lg:px-8 lg:py-7">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/scenario">Negotiation situations</Link>
            </li>
            <li>/</li>
            <li className="text-slate-900">{title}</li>
          </ol>
        </nav>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-700 uppercase"
          >
            {archetypeLabel}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-700 uppercase"
          >
            {negotiationStageLabel}
          </Badge>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
            Review the pressure behind this objection, then draft a send-ready
            reply from the exact client wording.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#scenario-inline-tool" id="scenario-hero-primary-cta">
              Draft a reply for this scenario
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/scenario">Browse all situations</Link>
          </Button>
        </div>

        <p className="text-sm text-slate-600">
          Start with 2 free drafts. No subscription required.
        </p>
      </CardHeader>

      <CardContent className="px-6 py-6 lg:px-8">
        <div className="border-border/80 rounded-[20px] border bg-slate-50/80 p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Typical client message
          </p>
          <blockquote className="mt-3 max-w-3xl text-base leading-7 text-slate-800 md:text-[17px]">
            &ldquo;{primaryClientMessage}&rdquo;
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
}
