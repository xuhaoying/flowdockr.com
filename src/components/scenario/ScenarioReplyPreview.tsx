import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioReplyPreviewProps = {
  reply?: string | null;
  ctaHref?: string;
  ctaLabel?: string;
};

export function ScenarioReplyPreview({
  reply,
  ctaHref = '#scenario-inline-tool',
  ctaLabel = 'Generate a better reply',
}: ScenarioReplyPreviewProps) {
  if (!reply?.trim()) {
    return null;
  }

  return (
    <Card className="border-border/80 bg-white shadow-sm">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Reply preview
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Preview a stronger reply
        </h2>
      </CardHeader>

      <CardContent className="space-y-4">
        <article className="border-border/80 rounded-[18px] border bg-slate-50/80 p-5">
          <p className="text-sm leading-7 text-slate-800 md:text-[15px]">
            {reply}
          </p>
        </article>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Use the generator to tailor this reply to the exact client message.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full bg-slate-900 text-white hover:bg-slate-800 sm:w-auto"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
