import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function PricingCTA() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-sm md:px-8 md:py-10">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Start with a real client scenario
        </h2>
        <p className="text-sm leading-relaxed text-slate-200">
          If you are deciding whether Flowdockr fits your workflow, the fastest
          way to tell is to run one real negotiation situation through the tool.
        </p>
        <Button asChild variant="secondary">
          <Link href="/tools/reply-generator">Start with a scenario</Link>
        </Button>
      </div>
    </section>
  );
}
