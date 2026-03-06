import { Link } from '@/core/i18n/navigation';
import { ScenarioContent } from '@/types/scenario';

type ScenarioHeroProps = {
  scenario: ScenarioContent;
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
            <Link href="/scenarios">Scenarios</Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{scenario.h1}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{scenario.h1}</h1>
      <p className="max-w-3xl text-base text-muted-foreground">{scenario.intro}</p>
    </header>
  );
}
