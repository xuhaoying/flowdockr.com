import { ToolForm } from '@/components/tool/ToolForm';

export function HomepageHero() {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Paste the client message. Get a reply you can send today.
        </h1>
        <p className="max-w-4xl text-base text-slate-700 md:text-lg">
          Flowdockr helps freelancers respond to lowball offers, discount requests,
          scope creep, and pricing pressure with replies that protect value and keep
          the deal alive.
        </p>
        <p className="text-sm text-slate-600">2 free replies. No subscription required.</p>
      </div>

      <ToolForm sourcePage="home" showScenarioSelector defaultScenarioSlug="lowball-offer" />
    </section>
  );
}
