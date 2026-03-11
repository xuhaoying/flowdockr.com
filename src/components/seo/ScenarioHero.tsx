import { AlertTriangle, ShieldCheck, Workflow } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { ScenarioContent } from '@/types/scenario';
import { Badge } from '@/shared/components/ui/badge';

type ScenarioHeroProps = {
  scenario: ScenarioContent;
};

const RISK_LABEL: Record<ScenarioContent['promptContext']['riskLevel'], string> = {
  low: 'Low pressure',
  medium: 'Moderate pressure',
  high: 'High pressure',
};

export function ScenarioHero({ scenario }: ScenarioHeroProps) {
  return (
    <header className="space-y-4">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
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

      <div className="rounded-2xl border bg-gradient-to-br from-indigo-50 via-background to-blue-50 p-6 md:p-7">
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
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{scenario.h1}</h1>
            <p className="max-w-3xl text-base text-muted-foreground">{scenario.intro}</p>
          </div>

          <div className="rounded-xl border bg-background/70 p-4">
            <p className="text-sm font-semibold">What this page gives you</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                Strategy-based reply, not generic text.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Workflow className="mt-0.5 size-4 text-primary" />
                Recommended reply + alternative framing.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-4 text-primary" />
                Caution notes to avoid weak concessions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
