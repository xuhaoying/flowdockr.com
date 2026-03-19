'use client';

import { useEffect, useState } from 'react';
import type {
  GenerationFeedbackReason,
  GenerationFeedbackType,
} from '@/types/generation';
import { Lightbulb, Mail, ShieldCheck } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type ResultCardProps = {
  reply: string;
  situationTitle?: string;
  situationClientMessage?: string;
  strategyInsight: string;
  whyThisWorks: string[];
  negotiationTip: string;
  toneLabel: string;
  onCopy?: () => void;
  feedbackKey?: string;
  onFeedback?: (params: {
    type: GenerationFeedbackType;
    reason?: GenerationFeedbackReason;
  }) => Promise<void> | void;
  onRegenerate?: () => void;
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
  feedbackKey,
  onFeedback,
  onRegenerate,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<GenerationFeedbackType | null>(null);
  const [showReasonPicker, setShowReasonPicker] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    setSelectedFeedback(null);
    setShowReasonPicker(false);
    setSubmittingFeedback(false);
  }, [feedbackKey]);

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

  const handleFeedback = async (
    type: GenerationFeedbackType,
    reason?: GenerationFeedbackReason
  ) => {
    if (!onFeedback) {
      if (type === 'regenerated') {
        onRegenerate?.();
      }
      return;
    }

    if (type === 'not_useful' && !reason) {
      setSelectedFeedback(type);
      setShowReasonPicker(true);
      return;
    }

    setSubmittingFeedback(true);
    try {
      await onFeedback({ type, reason });
      setSelectedFeedback(type);
      setShowReasonPicker(false);

      if (type === 'regenerated') {
        onRegenerate?.();
      }
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <section className="space-y-4">
      {situationTitle || situationClientMessage ? (
        <Card className="border-slate-200 bg-white py-0 shadow-xs">
          <CardContent className="space-y-2 px-5 py-4">
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
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
        <Card className="overflow-hidden border-slate-200 bg-white py-0 shadow-xs">
          <CardHeader className="gap-4 border-b border-slate-200 bg-slate-50 px-5 py-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-slate-900">
                  <Mail className="size-4 text-slate-900" />
                  <CardTitle className="text-lg tracking-tight">
                    Main suggested reply
                  </CardTitle>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-slate-900 bg-slate-900 px-2.5 py-1 text-white"
                  >
                    Main suggestion
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-slate-300 bg-white px-2.5 py-1 text-slate-700"
                  >
                    Tone: {toneLabel}
                  </Badge>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleCopy}
                className="h-10 w-full rounded-xl px-4 sm:w-auto"
              >
                {copied ? 'Copied ✓' : 'Copy main reply'}
              </Button>
            </div>
            <p className="text-sm leading-6 text-slate-700">
              This is the main send-ready draft. Adjust names, scope details, or
              timing, then copy it into your thread.
            </p>
          </CardHeader>

          <CardContent className="px-5 py-5">
            <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3.5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                    Message draft
                  </p>
                  <p className="text-sm text-slate-800">
                    Styled like a client-ready email, not raw output.
                  </p>
                </div>
                <p className="text-xs text-slate-600">
                  Review specifics before sending
                </p>
              </div>
              <div className="space-y-4 bg-white px-5 py-6 sm:px-6 sm:py-7">
                {renderReplyParagraphs(reply)}
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs leading-5 text-slate-600">
              <p>AI-generated draft. Please review and adapt before sending.</p>
              <p>
                Flowdockr provides communication suggestions, not legal or
                financial advice.
              </p>
            </div>
            {onFeedback ? (
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                  Quick feedback
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FEEDBACK_BUTTONS.map((item) => (
                    <Button
                      key={item.type}
                      type="button"
                      variant={
                        selectedFeedback === item.type ? 'default' : 'outline'
                      }
                      size="sm"
                      className="rounded-full"
                      disabled={submittingFeedback}
                      onClick={() => void handleFeedback(item.type)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
                {showReasonPicker ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {NOT_USEFUL_REASONS.map((item) => (
                      <Button
                        key={item.reason}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        disabled={submittingFeedback}
                        onClick={() =>
                          void handleFeedback('not_useful', item.reason)
                        }
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200 bg-white py-0 shadow-xs">
            <CardContent className="space-y-2 px-5 py-4">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="size-4" />
                <p className="text-xs font-semibold tracking-[0.16em] uppercase">
                  Strategy insight
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-800">
                {strategyInsight}
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white py-0 shadow-xs">
            <CardContent className="space-y-3 px-5 py-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Lightbulb className="size-4" />
                <p className="text-xs font-semibold tracking-[0.16em] uppercase">
                  Why this works
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-slate-800">
                {whyThisWorks.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-600" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white py-0 shadow-xs">
            <CardContent className="space-y-2 px-5 py-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-slate-900 uppercase">
                Negotiation tip
              </p>
              <p className="text-sm leading-6 text-slate-800">
                {negotiationTip}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const FEEDBACK_BUTTONS: Array<{
  type: GenerationFeedbackType;
  label: string;
}> = [
  {
    type: 'sent_as_is',
    label: 'Sent as-is',
  },
  {
    type: 'edited_before_send',
    label: 'Edited before send',
  },
  {
    type: 'not_useful',
    label: 'Not useful',
  },
  {
    type: 'regenerated',
    label: 'Regenerated',
  },
];

const NOT_USEFUL_REASONS: Array<{
  reason: GenerationFeedbackReason;
  label: string;
}> = [
  {
    reason: 'too_generic',
    label: 'Too generic',
  },
  {
    reason: 'too_soft',
    label: 'Too soft',
  },
  {
    reason: 'too_aggressive',
    label: 'Too aggressive',
  },
  {
    reason: 'missed_context',
    label: 'Missed context',
  },
  {
    reason: 'not_my_style',
    label: 'Not my style',
  },
];

function renderReplyParagraphs(reply: string) {
  const paragraphs = reply
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return (
      <p className="text-[15px] leading-7 whitespace-pre-wrap text-slate-900 sm:text-base">
        {reply}
      </p>
    );
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph}-${index}`}
          className="text-[15px] leading-7 whitespace-pre-line text-slate-900 sm:text-base"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}
