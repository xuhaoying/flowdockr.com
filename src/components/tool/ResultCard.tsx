'use client';

import { useState } from 'react';
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
        <Card className="border-border/80 bg-slate-50/80 py-0">
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
        <Card className="border-border/80 overflow-hidden bg-white py-0">
          <CardHeader className="border-border/70 gap-4 border-b bg-white px-5 py-5">
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
            <p className="text-sm leading-6 text-slate-600">
              This is the main send-ready draft. Adjust names, scope details, or
              timing, then copy it into your thread.
            </p>
          </CardHeader>

          <CardContent className="px-5 py-5">
            <div className="border-border/80 overflow-hidden rounded-[20px] border bg-slate-50/70 shadow-xs">
              <div className="border-border/70 flex flex-wrap items-center justify-between gap-3 border-b bg-white/90 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                    Message draft
                  </p>
                  <p className="text-sm text-slate-700">
                    Styled like a client-ready email, not raw output.
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  Review specifics before sending
                </p>
              </div>
              <div className="space-y-4 bg-white px-4 py-5 sm:px-5 sm:py-6">
                {renderReplyParagraphs(reply)}
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs leading-5 text-slate-500">
              <p>AI-generated draft. Please review and adapt before sending.</p>
              <p>
                Flowdockr provides communication suggestions, not legal or
                financial advice.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/80 bg-slate-50/50 py-0">
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

          <Card className="border-border/80 bg-white py-0">
            <CardContent className="space-y-3 px-5 py-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Lightbulb className="size-4" />
                <p className="text-xs font-semibold tracking-[0.16em] uppercase">
                  Why this works
                </p>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                {whyThisWorks.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-slate-50/50 py-0">
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

function renderReplyParagraphs(reply: string) {
  const paragraphs = reply
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return (
      <p className="text-[15px] leading-[1.6] whitespace-pre-wrap text-slate-800">
        {reply}
      </p>
    );
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph}-${index}`}
          className="text-[15px] leading-[1.6] whitespace-pre-line text-slate-800"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}
