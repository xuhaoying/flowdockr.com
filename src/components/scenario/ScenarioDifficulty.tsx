import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioDifficultyProps = {
  title?: string;
  points: string[];
};

export function ScenarioDifficulty({
  title = 'Best response strategy',
  points,
}: ScenarioDifficultyProps) {
  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Recommended approach
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 md:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="border-border/80 flex items-start gap-3 rounded-[18px] border bg-slate-50/70 p-4 text-sm leading-6 text-slate-700"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-slate-900" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
