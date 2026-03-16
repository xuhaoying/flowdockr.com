'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

type ResultCardProps = {
  reply: string;
  situationTitle?: string;
  situationClientMessage?: string;
  strategyInsight: string;
  whyThisWorks: string[];
  negotiationTip: string;
  toneLabel: string;
  onCopy?: () => void;
};

export function ResultCard({
  reply,
  situationTitle,
  situationClientMessage,
  strategyInsight,
  whyThisWorks,
  negotiationTip,
  toneLabel,
  onCopy,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!reply) {
      return;
    }

    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      onCopy?.();
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <section className="space-y-4">
      {situationTitle || situationClientMessage ? (
        <section className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Situation
          </p>
          {situationTitle ? (
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {situationTitle}
            </p>
          ) : null}
          {situationClientMessage ? (
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {situationClientMessage}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-xl bg-[#EEF2FF] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.16em] text-indigo-700 uppercase">
              Strategy insight
            </p>
            <p className="text-sm leading-6 text-slate-800">{strategyInsight}</p>
          </div>
          <Badge
            variant="outline"
            className="rounded-full border-indigo-200 bg-white/70 px-2.5 py-1 text-slate-700"
          >
            Tone: {toneLabel}
          </Badge>
        </div>
      </section>

      <section className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Mail className="size-4 text-indigo-600" />
              <h4 className="text-base font-semibold">
                Suggested reply you can send
              </h4>
            </div>
            <p className="text-sm text-slate-600">
              Clear enough to use now, with room to adjust the tone before you
              send it.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleCopy}
            className="h-10 rounded-lg bg-[#4F46E5] px-4 text-sm font-medium text-white hover:bg-[#4338CA]"
          >
            {copied ? 'Copied ✓' : 'Copy reply'}
          </Button>
        </div>

        <div className="mt-5 space-y-4 rounded-xl border border-[#E2E8F0] bg-white p-5">
          {renderReplyParagraphs(reply)}
        </div>
      </section>

      <section className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Why this works
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {whyThisWorks.map((reason) => (
            <li key={reason} className="flex items-start gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-[#FFF7ED] p-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-amber-800 uppercase">
          Negotiation tip
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-800">
          {negotiationTip}
        </p>
      </section>
    </section>
  );
}

function renderReplyParagraphs(reply: string) {
  const paragraphs = reply
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return (
      <p className="text-[15px] leading-[1.6] text-slate-800 whitespace-pre-wrap">
        {reply}
      </p>
    );
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph}-${index}`}
          className="text-[15px] leading-[1.6] text-slate-800 whitespace-pre-line"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}
