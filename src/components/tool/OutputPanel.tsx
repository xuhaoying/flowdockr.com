'use client';

import { useState } from 'react';
import { StrategyPanel } from '@/components/tool/StrategyPanel';
import { GeneratedReplyResult } from '@/types/generation';
import { Check, Copy } from 'lucide-react';

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
    <div className="border-brand-lavender/20 space-y-2 rounded-[18px] border bg-white p-4 shadow-xs sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
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
      <p className="text-[15px] leading-7 whitespace-pre-wrap text-slate-900 sm:text-base">
        {content}
      </p>
    </div>
  );
}

export function OutputPanel({
  result,
  isGenerating = false,
}: OutputPanelProps) {
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
    <div className="border-brand-lavender/45 rounded-[18px] border border-dashed bg-white p-5 text-sm text-slate-700 shadow-xs">
      Start by pasting a real client message on the left, then click
      <span className="px-1 font-medium text-slate-900">
        Generate professional reply
      </span>
      You will get a send-ready reply plus strategy logic in one pass.
    </div>
  );

  return (
    <Card className="border-brand-lavender/25 bg-white shadow-sm shadow-slate-950/5">
      <CardHeader>
        <CardTitle>Generated output</CardTitle>
        <CardDescription>
          Structured for difficult client conversations, not generic writing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating && !result ? (
          <div className="border-brand-lavender/20 space-y-3 rounded-[18px] border bg-white p-4 shadow-xs sm:p-5">
            <p className="text-sm font-medium text-slate-900">
              Building your professional reply...
            </p>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-10/12 animate-pulse rounded bg-slate-200" />
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
            <div className="border-brand-lavender/20 rounded-[18px] border bg-white p-4 text-sm text-slate-800 shadow-xs sm:p-5">
              <p className="text-slate-900">
                <span className="font-semibold">Confidence:</span>{' '}
                <span className="uppercase">{result.confidence}</span>
              </p>
              {result.caution ? (
                <p className="mt-1 text-slate-700">
                  <span className="font-semibold text-slate-900">Note:</span>{' '}
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
