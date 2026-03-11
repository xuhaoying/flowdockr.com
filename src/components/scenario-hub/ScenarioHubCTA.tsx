import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import type { ScenarioHubCta } from '@/types/scenario-hub';

type ScenarioHubCTAProps = {
  cta: ScenarioHubCta;
};

export function ScenarioHubCTA({ cta }: ScenarioHubCTAProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {cta.title}
        </h2>
        <p className="text-sm leading-6 text-slate-700">{cta.description}</p>
        <Button asChild>
          <Link href="/tools/reply-generator">{cta.buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
