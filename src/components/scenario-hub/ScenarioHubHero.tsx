import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import type { ScenarioHubHero as ScenarioHubHeroData } from '@/types/scenario-hub';

type ScenarioHubHeroProps = {
  hero: ScenarioHubHeroData;
};

export function ScenarioHubHero({ hero }: ScenarioHubHeroProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
      <div className="max-w-3xl space-y-4">
        <p className="inline-flex w-fit rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          Scenario-based negotiation support
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          {hero.title}
        </h1>
        <p className="text-base leading-7 text-slate-700 md:text-lg">
          {hero.subtitle}
        </p>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          {hero.supportingText}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="#scenario-clusters">{hero.primaryCtaLabel}</a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/reply-generator">{hero.secondaryCtaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
