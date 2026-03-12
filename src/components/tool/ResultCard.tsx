'use client';

import { CopyButton } from '@/components/tool/CopyButton';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

type ResultCardProps = {
  reply: string;
  whyThisWorks: string;
  toneLabel: string;
  suggestedNextStep?: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  loading?: boolean;
};

export function ResultCard({
  reply,
  whyThisWorks,
  toneLabel,
  suggestedNextStep,
  onCopy,
  onRegenerate,
  loading = false,
}: ResultCardProps) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-slate-900">
            AI Suggested Reply
          </h4>
          <p className="text-sm text-slate-600">
            A send-ready reply built for this negotiation moment.
          </p>
        </div>

        <Badge
          variant="outline"
          className="rounded-full border-slate-300 bg-white px-2.5 py-1 text-slate-700"
        >
          Tone: {toneLabel}
        </Badge>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {reply}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Why this works
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {whyThisWorks}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Suggested next step
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {suggestedNextStep ||
              'If the client pushes again, ask one clarifying question before making concessions or reshaping the scope.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CopyButton
          value={reply}
          idleLabel="Copy Reply"
          copiedLabel="Reply copied"
          onCopied={onCopy}
        />
        {onRegenerate ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={loading}
          >
            Try Another Version
          </Button>
        ) : null}
      </div>
    </section>
  );
}
