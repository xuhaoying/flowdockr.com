import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioOverviewProps = {
  userSituation: string;
  replyGoal: string;
};

export function ScenarioOverview({
  userSituation,
  replyGoal,
}: ScenarioOverviewProps) {
  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Situation snapshot
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why this reply gets tricky
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="max-w-3xl text-base leading-7 text-slate-700">
          {userSituation}
        </p>
        <div className="border-border/80 rounded-[18px] border bg-slate-50/80 p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Reply goal
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{replyGoal}</p>
        </div>
      </CardContent>
    </Card>
  );
}
