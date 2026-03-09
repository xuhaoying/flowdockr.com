'use client';

import { Link } from '@/core/i18n/navigation';
import { CopyButton } from '@/components/tool/CopyButton';
import { Button } from '@/shared/components/ui/button';

type ToolResultProps = {
  reply: string;
  alternativeReply: string;
  strategy: string[];
  loading?: boolean;
  onRegenerate?: () => void;
  onCopy?: (target: 'reply' | 'alternative') => void;
  onSave?: () => void;
  canSave?: boolean;
  saveLabel?: string;
  savedHint?: string;
};

export function ToolResult({
  reply,
  alternativeReply,
  strategy,
  loading = false,
  onRegenerate,
  onCopy,
  onSave,
  canSave = false,
  saveLabel = 'Save to deals',
  savedHint,
}: ToolResultProps) {
  const hasResult = Boolean(reply || alternativeReply || strategy.length > 0);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">Generated reply</h3>
        <div className="flex items-center gap-2">
          {onSave ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={!canSave || loading}
            >
              {saveLabel}
            </Button>
          ) : null}
          {onRegenerate ? (
            <Button type="button" variant="outline" size="sm" onClick={onRegenerate} disabled={loading}>
              Regenerate
            </Button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-9/12 animate-pulse rounded bg-slate-200" />
        </div>
      ) : null}

      {!hasResult && !loading ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          Your recommended reply and alternative version will appear here after you click
          Generate reply.
        </div>
      ) : null}

      {savedHint ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {savedHint}{' '}
          <Link href="/history" className="font-semibold underline underline-offset-2">
            Open history
          </Link>
        </div>
      ) : null}

      {hasResult ? (
        <>
          <ResultBlock
            title="Recommended reply"
            content={reply}
            onCopied={() => onCopy?.('reply')}
          />

          <ResultBlock
            title="Alternative reply"
            content={alternativeReply}
            onCopied={() => onCopy?.('alternative')}
          />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-slate-900">Why this works</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {strategy.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </section>
  );
}

type ResultBlockProps = {
  title: string;
  content: string;
  onCopied: () => void;
};

function ResultBlock({ title, content, onCopied }: ResultBlockProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        <CopyButton value={content} onCopied={onCopied} />
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{content}</p>
    </div>
  );
}
