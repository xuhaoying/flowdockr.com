import { Button } from '@/shared/components/ui/button';

type ScenarioCTAProps = {
  title: string;
  description: string;
  ctaLabel: string;
};

export function ScenarioCTA({
  title,
  description,
  ctaLabel,
}: ScenarioCTAProps) {
  return (
    <section className="border-brand-lavender/30 via-brand-bg text-brand-text rounded-[24px] border bg-linear-to-br from-white to-white p-6 shadow-sm shadow-slate-950/5 lg:p-7">
      <div className="max-w-3xl space-y-4">
        <p className="text-brand-primary text-xs font-semibold tracking-[0.16em] uppercase">
          Ready to reply
        </p>
        <h2 className="text-brand-text text-2xl font-semibold tracking-tight">
          Generate a stronger reply for this situation
        </h2>
        <p className="text-sm leading-6 text-slate-700">
          Use the embedded tool to handle &ldquo;{title}&rdquo; with wording you
          can adapt and send. {description}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#scenario-inline-tool">{ctaLabel}</a>
          </Button>
          <p className="text-sm text-slate-600">
            2 free drafts. No subscription required.
          </p>
        </div>
      </div>
    </section>
  );
}
