import { GeneratedReplyResult } from '@/types/generation';

import { StrategyPanel } from '@/components/tool/StrategyPanel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type OutputPanelProps = {
  result: GeneratedReplyResult | null;
};

function ReplyCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-2 rounded-md border bg-muted/30 p-4">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export function OutputPanel({ result }: OutputPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated output</CardTitle>
        <CardDescription>Strategic reply suggestions, ready to send or edit.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReplyCard
          title="Recommended Reply"
          content={
            result?.recommendedReply || 'Your recommended reply will appear here after generation.'
          }
        />
        <StrategyPanel
          items={
            result?.strategy || [
              'Your strategy bullets will appear here.',
              'Flowdockr focuses on negotiation positioning, not generic writing.',
              'Use the recommendation as a draft and adjust to your context.',
            ]
          }
        />
        <ReplyCard
          title="Alternative Version"
          content={result?.alternativeReply || 'Alternative framing will appear here.'}
        />
        <div className="rounded-md border bg-muted/30 p-4 text-sm">
          <p>
            <span className="font-semibold">Confidence:</span>{' '}
            {result?.confidence || 'N/A'}
          </p>
          {result?.caution ? (
            <p className="mt-1 text-muted-foreground">
              <span className="font-semibold text-foreground">Note:</span>{' '}
              {result.caution}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
