import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioClientMessagesProps = {
  primaryClientMessage: string;
  clientMessageVariants: string[];
};

export function ScenarioClientMessages({
  primaryClientMessage,
  clientMessageVariants,
}: ScenarioClientMessagesProps) {
  const additionalVariants = clientMessageVariants.filter(
    (variant) => variant !== primaryClientMessage
  );

  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Typical client message
        </h2>
        <p className="text-sm text-slate-700">
          These are the real wording patterns this scenario is built to handle.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <article className="border-border/80 rounded-[18px] border bg-slate-50/80 p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Most typical phrasing
          </p>
          <blockquote className="mt-3 text-base leading-7 text-slate-800 md:text-[17px]">
            &ldquo;{primaryClientMessage}&rdquo;
          </blockquote>
        </article>

        {additionalVariants.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Other ways this shows up
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {additionalVariants.map((variant) => (
                <article
                  key={variant}
                  className="border-border/80 rounded-[18px] border bg-white p-4 shadow-xs"
                >
                  <blockquote className="text-sm leading-6 text-slate-700">
                    &ldquo;{variant}&rdquo;
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
