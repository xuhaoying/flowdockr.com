import { Link } from '@/core/i18n/navigation';

type ScenarioHeroProps = {
  title: string;
  archetypeLabel: string;
  negotiationStageLabel: string;
  primaryClientMessage: string;
};

export function ScenarioHero({
  title,
  archetypeLabel,
  negotiationStageLabel,
  primaryClientMessage,
}: ScenarioHeroProps) {
  return (
    <section className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/scenario">Negotiation situations</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900">{title}</li>
        </ol>
      </nav>

      <div className="flex flex-wrap gap-2 text-xs font-medium tracking-wide text-slate-600 uppercase">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
          {archetypeLabel}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
          {negotiationStageLabel}
        </span>
      </div>

      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Typical client message
          </p>
          <blockquote className="mt-3 text-base leading-7 text-slate-800">
            &ldquo;{primaryClientMessage}&rdquo;
          </blockquote>
        </div>
      </div>

      <a
        href="#scenario-inline-tool"
        className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
      >
        Try this scenario
      </a>
    </section>
  );
}
