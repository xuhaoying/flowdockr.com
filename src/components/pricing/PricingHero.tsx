import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function PricingHero() {
  return (
    <section className="border-brand-lavender/25 rounded-3xl border bg-white px-6 py-8 shadow-sm shadow-slate-950/5 md:px-8 md:py-10">
      <div className="max-w-3xl space-y-4">
        <p className="border-brand-lavender/40 bg-brand-bg text-brand-primary inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-medium">
          Reply support plans
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Pricing for difficult client messages
        </h1>
        <p className="text-base text-slate-700 md:text-lg">
          FlowDockr helps freelancers and agencies handle pricing pressure,
          discount requests, scope creep, demanding-client boundaries, and
          difficult no-thanks conversations with clearer professional replies.
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Review the situation, compare response strategies, and choose a reply
          that protects your position without turning the conversation into a
          generic writing exercise.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/tools/reply-generator">Try a scenario</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="#pricing-cards">View plans</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
