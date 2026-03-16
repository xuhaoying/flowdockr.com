type ScenarioOverviewProps = {
  userSituation: string;
};

export function ScenarioOverview({ userSituation }: ScenarioOverviewProps) {
  return (
    <section className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Situation snapshot
      </h2>
      <p className="text-base leading-7 text-slate-700">{userSituation}</p>
    </section>
  );
}
