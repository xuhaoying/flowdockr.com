import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioOverviewProps = {
  userSituation: string;
};

export function ScenarioOverview({ userSituation }: ScenarioOverviewProps) {
  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Situation snapshot
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          What is happening in this negotiation
        </h2>
      </CardHeader>
      <CardContent>
        <p className="max-w-3xl text-base leading-7 text-slate-700">
          {userSituation}
        </p>
      </CardContent>
    </Card>
  );
}
