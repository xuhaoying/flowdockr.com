import { ScenarioContent } from '@/types/scenario';
import { AlertTriangle, ShieldCheck, Workflow } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';

type ScenarioHeroProps = {
  scenario: ScenarioContent;
};

const RISK_LABEL: Record<
  ScenarioContent['promptContext']['riskLevel'],
  string
> = {
  low: 'Low pressure',
  medium: 'Moderate pressure',
  high: 'High pressure',
};

export function ScenarioHero({ scenario }: ScenarioHeroProps) {
  return (
    <header className="space-y-4">
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/scenario">Scenarios</Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{scenario.h1}</li>
        </ol>
      </nav>

      <div className="border-brand-lavender/25 via-brand-bg rounded-2xl border bg-linear-to-br from-white to-white p-6 shadow-sm shadow-slate-950/5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-2.5">
                {RISK_LABEL[scenario.promptContext.riskLevel]}
              </Badge>
              <Badge variant="outline" className="rounded-full px-2.5">
                {scenario.promptContext.scenarioType.replaceAll('_', ' ')}
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {scenario.h1}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-base">
              {scenario.intro}
            </p>
          </div>

          <div className="bg-background/70 rounded-xl border p-4">
            <p className="text-sm font-semibold">What this page gives you</p>
            <ul className="mt-3 space-y-2">
              <li className="text-muted-foreground flex items-start gap-2 text-sm">
                <ShieldCheck className="text-primary mt-0.5 size-4" />
                Strategy-based reply, not generic text.
              </li>
              <li className="text-muted-foreground flex items-start gap-2 text-sm">
                <Workflow className="text-primary mt-0.5 size-4" />
                Recommended reply + alternative framing.
              </li>
              <li className="text-muted-foreground flex items-start gap-2 text-sm">
                <AlertTriangle className="text-primary mt-0.5 size-4" />
                Caution notes to avoid weak concessions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
