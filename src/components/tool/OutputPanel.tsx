'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

import { GeneratedReplyResult } from '@/types/generation';

import { StrategyPanel } from '@/components/tool/StrategyPanel';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type OutputPanelProps = {
  result: GeneratedReplyResult | null;
  isGenerating?: boolean;
};

function ReplyCard({
  title,
  content,
  copyKey,
  copiedKey,
  onCopy,
}: {
  title: string;
  content: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
}) {
  const copied = copiedKey === copyKey;

  return (
    <div className="space-y-2 rounded-md border bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => onCopy(copyKey, content)}
          disabled={!content}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export function OutputPanel({ result, isGenerating = false }: OutputPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1400);
    } catch {
      // no-op
    }
  };

  const emptyState = (
    <div className="rounded-md border border-dashed bg-muted/20 p-5 text-sm text-muted-foreground">
      Start by pasting a real client message on the left, then click
      <span className="px-1 font-medium text-foreground">Generate strategic reply</span>.
      You will get a send-ready reply plus strategy logic in one pass.
    </div>
  );

  return (
    <Card className="border-foreground/10">
      <CardHeader>
        <CardTitle>Generated output</CardTitle>
        <CardDescription>
          Structured for real client negotiations, not generic writing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating && !result ? (
          <div className="space-y-3 rounded-md border bg-muted/20 p-4">
            <p className="text-sm font-medium">Building your negotiation reply...</p>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
              <div className="h-3 w-10/12 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ) : null}

        {result ? (
          <>
            <ReplyCard
              title="Recommended Reply"
              content={result.recommendedReply}
              copyKey="recommended"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <StrategyPanel items={result.strategy} />
            <ReplyCard
              title="Alternative Version"
              content={result.alternativeReply}
              copyKey="alternative"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <div className="rounded-md border bg-muted/20 p-4 text-sm">
              <p>
                <span className="font-semibold">Confidence:</span>{' '}
                <span className="uppercase">{result.confidence}</span>
              </p>
              {result.caution ? (
                <p className="mt-1 text-muted-foreground">
                  <span className="font-semibold text-foreground">Note:</span>{' '}
                  {result.caution}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          emptyState
        )}
      </CardContent>
    </Card>
  );
}
