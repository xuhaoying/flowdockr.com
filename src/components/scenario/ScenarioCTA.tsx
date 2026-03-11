import { Button } from '@/shared/components/ui/button';
import type { ScenarioPageCta } from '@/types/scenario-page';

type ScenarioCTAProps = {
  cta: ScenarioPageCta;
};

export function ScenarioCTA({ cta }: ScenarioCTAProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {cta.title}
        </h2>
        <p className="text-sm leading-6 text-slate-700">{cta.description}</p>
        <Button asChild>
          <a href="#scenario-inline-tool">{cta.buttonLabel}</a>
        </Button>
      </div>
    </section>
  );
}
