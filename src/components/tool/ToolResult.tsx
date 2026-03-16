'use client';

import { CopyButton } from '@/components/tool/CopyButton';
import { ResultCard } from '@/components/tool/ResultCard';
import { BillingSupportLevel } from '@/types/billing';
import { DealTone } from '@/types/deals';
import type {
  FollowUpSuggestion,
  PresentableStrategyBlock,
  ReplyVersion,
} from '@/types/generation';
import {
  ArrowUpRight,
  CornerDownRight,
  History,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type ToolResultProps = {
  reply: string;
  strategyBlock?: PresentableStrategyBlock;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion;
  scenarioContext?: {
    title?: string;
    clientMessage?: string;
    primaryGoal?: string;
  };
  historyEnabled?: boolean;
  supportLevel?: BillingSupportLevel;
  selectedTone?: DealTone;
  loading?: boolean;
  onRegenerate?: () => void;
  onCopy?: (target: string) => void;
  savedHint?: string;
};

export function ToolResult({
  reply,
  strategyBlock,
  replyVersions,
  riskInsights,
  followUpSuggestion,
  scenarioContext,
  historyEnabled = true,
  supportLevel = 'free',
  selectedTone = 'professional',
  loading = false,
  onRegenerate,
  onCopy,
  savedHint,
}: ToolResultProps) {
  const versions = normalizeReplyVersions(reply, replyVersions);
  const primaryVersion = versions[0];
  const primaryResponse = primaryVersion?.text || reply;
  const alternateVersions = versions.slice(1);
  const hasResult = Boolean(
    versions.length > 0 ||
      strategyBlock?.sections.length ||
      riskInsights?.length ||
      followUpSuggestion?.reply
  );
  const showUpgradeNudge =
    hasResult &&
    (supportLevel === 'free' ||
      supportLevel === 'quick_help' ||
      supportLevel === 'pro');
  const softerVersion = alternateVersions.find(
    (version) => version.key === 'softer'
  );
  const firmerVersion = alternateVersions.find(
    (version) => version.key === 'firm'
  );
  const followUpAvailable = Boolean(followUpSuggestion?.reply);

  return (
    <Card
      id="tool-result-panel"
      data-result-ready={hasResult ? 'true' : 'false'}
      className="border-border/80 overflow-hidden bg-white py-0"
    >
      <CardHeader className="border-border/70 gap-3 border-b bg-gradient-to-br from-white via-white to-slate-50/70 px-5 py-5 lg:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            Generated guidance
          </Badge>
        </div>
        <CardTitle className="text-lg tracking-tight text-slate-900">
          Negotiation support for this situation
        </CardTitle>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Review the suggested approach and choose the response that best fits
          your client conversation.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 px-5 py-5 lg:px-6 lg:py-6">
        {loading ? (
          <div className="border-border/80 space-y-3 rounded-[18px] border bg-slate-50/80 p-5">
            <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-9/12 animate-pulse rounded bg-slate-200" />
          </div>
        ) : null}

        {!hasResult && !loading ? (
          <div className="rounded-[18px] border border-dashed border-slate-300 bg-slate-50/80 p-5 text-sm text-slate-600">
            <div className="flex items-center gap-2 text-slate-900">
              <Sparkles className="size-4" />
              <p className="font-semibold">
                Your polished reply will appear here
              </p>
            </div>
            <p className="mt-2 leading-6">
              Generate a result to see the send-ready message, the reasoning
              behind it, and follow-up guidance if the client keeps pushing.
            </p>
          </div>
        ) : null}

        {hasResult ? (
          <>
            {primaryResponse ? (
              <ResultCard
                reply={primaryResponse}
                situationTitle={scenarioContext?.title}
                situationClientMessage={scenarioContext?.clientMessage}
                strategyInsight={buildStrategyInsight({
                  strategyBlock,
                  selectedTone,
                  primaryVersionKey: primaryVersion?.key,
                  scenarioGoal: scenarioContext?.primaryGoal,
                })}
                whyThisWorks={buildWhyThisWorks({
                  strategyBlock,
                  selectedTone,
                  primaryVersionKey: primaryVersion?.key,
                })}
                negotiationTip={buildNegotiationTip({
                  followUpSuggestion,
                  scenarioGoal: scenarioContext?.primaryGoal,
                })}
                toneLabel={getToneLabel(selectedTone, primaryVersion?.key)}
                onCopy={() => onCopy?.('primary_response')}
              />
            ) : null}

            <section className="border-border/70 space-y-3 border-t pt-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  More reply options
                </h4>
                <p className="text-sm leading-6 text-slate-600">
                  Generate or review additional versions before you send.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 justify-start rounded-xl border-slate-300 bg-white px-4 text-sm font-medium text-slate-900"
                  onClick={() =>
                    handleReplyAction({
                      targetId: softerVersion
                        ? `reply-version-${softerVersion.key}`
                        : null,
                      onFallback: onRegenerate,
                    })
                  }
                  disabled={!softerVersion && !onRegenerate}
                >
                  {softerVersion
                    ? 'View softer version'
                    : 'Generate softer version'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 justify-start rounded-xl border-slate-300 bg-white px-4 text-sm font-medium text-slate-900"
                  onClick={() =>
                    handleReplyAction({
                      targetId: firmerVersion
                        ? `reply-version-${firmerVersion.key}`
                        : null,
                      onFallback: onRegenerate,
                    })
                  }
                  disabled={!firmerVersion && !onRegenerate}
                >
                  {firmerVersion
                    ? 'View firmer version'
                    : 'Generate firmer version'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 justify-start rounded-xl border-slate-300 bg-white px-4 text-sm font-medium text-slate-900"
                  onClick={() =>
                    handleReplyAction({
                      targetId: followUpAvailable
                        ? 'tool-follow-up-reply'
                        : null,
                      onFallback: onRegenerate,
                    })
                  }
                  disabled={!followUpAvailable && !onRegenerate}
                >
                  {followUpAvailable
                    ? 'View follow-up reply'
                    : 'Generate follow-up reply'}
                </Button>
              </div>
            </section>

            {alternateVersions.length > 0 ? (
              <section className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Alternate versions
                  </h4>
                  <p className="text-sm leading-6 text-slate-600">
                    Compare tone-adjusted options without losing the negotiation
                    logic.
                  </p>
                </div>

                <div className="space-y-3">
                  {alternateVersions.map((version) => (
                    <Card
                      id={`reply-version-${version.key}`}
                      key={version.key}
                      className="border-border/80 overflow-hidden bg-white py-0"
                    >
                      <CardHeader className="border-border/70 gap-2 border-b bg-white px-5 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h5 className="text-sm font-semibold text-slate-900">
                              {version.label}
                            </h5>
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                              {getResponseUsageHint(version.key)}
                            </p>
                          </div>
                          <CopyButton
                            value={version.text}
                            idleLabel="Copy reply"
                            copiedLabel="Copied ✓"
                            onCopied={() => onCopy?.(version.key)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="px-5 py-5">
                        <div className="border-border/80 rounded-[18px] border bg-slate-50/70 p-4">
                          <p className="text-[15px] leading-[1.75] whitespace-pre-wrap text-slate-800">
                            {version.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            {riskInsights && riskInsights.length > 0 ? (
              <section className="rounded-[18px] border border-amber-200 bg-amber-50/80 p-5">
                <div className="flex items-center gap-2 text-amber-950">
                  <ShieldAlert className="size-4" />
                  <h4 className="text-sm font-semibold">
                    Things to watch out for
                  </h4>
                </div>
                <p className="mt-1 text-sm text-amber-900/85">
                  Common negotiation mistakes in this situation.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-amber-900">
                  {riskInsights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {followUpSuggestion ? (
              <section
                id="tool-follow-up-reply"
                className="rounded-[18px] border border-sky-200 bg-sky-50/80 p-5"
              >
                <div className="flex items-center gap-2 text-sky-950">
                  <CornerDownRight className="size-4" />
                  <h4 className="text-sm font-semibold">
                    If the client pushes again
                  </h4>
                </div>
                <p className="mt-1 text-sm text-sky-900/85">
                  How you might respond if the negotiation continues.
                </p>
                <div className="mt-3 space-y-3">
                  <div className="rounded-[18px] border border-sky-200 bg-white p-4 shadow-xs">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold tracking-wide text-sky-700 uppercase">
                        Suggested next-step reply
                      </p>
                      <CopyButton
                        value={followUpSuggestion.reply}
                        onCopied={() => onCopy?.('follow_up')}
                      />
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-sky-950">
                      {followUpSuggestion.reply}
                    </p>
                  </div>
                  {followUpSuggestion.direction ? (
                    <div className="rounded-[18px] border border-sky-200/70 bg-white/70 p-4">
                      <p className="text-xs font-semibold tracking-wide text-sky-700 uppercase">
                        Negotiation direction
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-sky-950">
                        {followUpSuggestion.direction}
                      </p>
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}

            {historyEnabled ? (
              <section className="border-border/80 rounded-[18px] border bg-slate-50/80 p-5">
                <div className="flex items-center gap-2 text-slate-900">
                  <History className="size-4" />
                  <h4 className="text-sm font-semibold">Actions</h4>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/history">
                      {savedHint
                        ? 'Saved to negotiation history'
                        : 'Save to negotiation history'}
                    </Link>
                  </Button>
                </div>
              </section>
            ) : null}

            {showUpgradeNudge ? (
              <div className="border-border/80 rounded-[18px] border bg-slate-50/80 p-5 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                  {supportLevel === 'quick_help'
                    ? 'Upgrade to Pro for deeper negotiation support.'
                    : supportLevel === 'pro'
                      ? 'Upgrade to Studio for follow-up support and advanced framing.'
                      : 'Upgrade for deeper negotiation support.'}
                </p>
                <p className="mt-1">
                  {supportLevel === 'quick_help'
                    ? 'Unlock three reply versions, risk insights, and saved negotiation history.'
                    : supportLevel === 'pro'
                      ? 'Unlock follow-up suggestions and the most advanced scenario support.'
                      : 'Unlock strategy explanations, response variants, risk alerts, and saved negotiation history.'}
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-xl">
                  <Link href="/pricing">
                    See plans
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

function normalizeReplyVersions(
  reply: string,
  replyVersions?: ReplyVersion[]
): ReplyVersion[] {
  if (replyVersions?.length) {
    return replyVersions;
  }

  if (!reply) {
    return [];
  }

  return [
    {
      key: 'suggested',
      label: 'Suggested reply',
      text: reply,
    },
  ];
}

function getResponseUsageHint(key: ReplyVersion['key']) {
  switch (key) {
    case 'professional':
      return 'Recommended when you want to keep the conversation collaborative.';
    case 'firm':
      return 'Recommended when you need to reinforce your pricing boundary.';
    case 'softer':
      return 'Recommended when you want to maintain a softer tone with the client.';
    default:
      return 'Recommended when you want a clear and balanced response.';
  }
}

function buildWhyThisWorks(params: {
  strategyBlock?: PresentableStrategyBlock;
  selectedTone: DealTone;
  primaryVersionKey?: ReplyVersion['key'];
}) {
  const whySection = params.strategyBlock?.sections.find((section) =>
    /why/i.test(section.title)
  );
  if (whySection?.bullets.length) {
    return whySection.bullets.slice(0, 3);
  }

  const objectiveSection = params.strategyBlock?.sections.find((section) =>
    /objective|goal|approach/i.test(section.title)
  );
  if (objectiveSection?.bullets.length) {
    return objectiveSection.bullets.slice(0, 3);
  }

  if (params.primaryVersionKey === 'firm' || params.selectedTone === 'firm') {
    return [
      "Acknowledges the client's pushback without sounding defensive.",
      'Protects your pricing boundary instead of rewarding the objection instantly.',
      'Keeps the discussion focused on scope, value, and next steps.',
    ];
  }

  if (
    params.primaryVersionKey === 'softer' ||
    params.selectedTone === 'friendly'
  ) {
    return [
      'Shows the client you heard the concern without agreeing to cut price immediately.',
      'Keeps the relationship collaborative and low-friction.',
      'Creates room to clarify priorities before changing the deal terms.',
    ];
  }

  return [
    "Acknowledges the client's concern in a calm way.",
    'Reframes the conversation around scope, budget, and value.',
    'Keeps the negotiation collaborative before you make concessions.',
  ];
}

function buildStrategyInsight(params: {
  strategyBlock?: PresentableStrategyBlock;
  selectedTone: DealTone;
  primaryVersionKey?: ReplyVersion['key'];
  scenarioGoal?: string;
}) {
  const objectiveSection = params.strategyBlock?.sections.find((section) =>
    /objective|goal|approach/i.test(section.title)
  );
  if (objectiveSection?.bullets[0]) {
    return objectiveSection.bullets[0];
  }

  if (params.scenarioGoal) {
    return params.scenarioGoal;
  }

  if (params.primaryVersionKey === 'firm' || params.selectedTone === 'firm') {
    return 'The goal here is to defend your price while keeping control of the negotiation.';
  }

  if (
    params.primaryVersionKey === 'softer' ||
    params.selectedTone === 'friendly'
  ) {
    return 'The goal here is to keep the conversation warm while guiding the client back to value and priorities.';
  }

  return 'The goal here is to acknowledge the concern, defend your value, and keep the conversation collaborative.';
}

function getToneLabel(
  selectedTone: DealTone,
  primaryVersionKey?: ReplyVersion['key']
) {
  if (primaryVersionKey === 'firm' || selectedTone === 'firm') {
    return 'Confident';
  }

  if (primaryVersionKey === 'softer' || selectedTone === 'friendly') {
    return 'Soft';
  }

  return 'Neutral';
}

function buildNegotiationTip(params: {
  followUpSuggestion?: FollowUpSuggestion;
  scenarioGoal?: string;
}) {
  if (params.followUpSuggestion?.direction?.trim()) {
    return params.followUpSuggestion.direction.trim();
  }

  if (params.scenarioGoal && /scope|phase|smaller/i.test(params.scenarioGoal)) {
    return params.scenarioGoal;
  }

  return 'If the client pushes again, offer a smaller scope or phased starting point instead of lowering the same price.';
}

function handleReplyAction(params: {
  targetId: string | null;
  onFallback?: () => void;
}) {
  if (params.targetId) {
    document.getElementById(params.targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    return;
  }

  params.onFallback?.();
}
