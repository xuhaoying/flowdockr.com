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

import { Link } from '@/core/i18n/navigation';

type ToolResultProps = {
  reply: string;
  strategyBlock?: PresentableStrategyBlock;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion;
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

  return (
    <section
      id="tool-result-panel"
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Negotiation support for this situation
        </h3>
        <p className="max-w-xl text-sm text-slate-600">
          Review the suggested approach and choose the response that best fits
          your client conversation.
        </p>
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
          Suggested guidance, response options, and follow-up support will
          appear here after you generate a result.
        </div>
      ) : null}

      {hasResult ? (
        <>
          {primaryResponse ? (
            <ResultCard
              reply={primaryResponse}
              whyThisWorks={buildWhyThisWorks({
                strategyBlock,
                selectedTone,
                primaryVersionKey: primaryVersion?.key,
              })}
              toneLabel={getToneLabel(selectedTone, primaryVersion?.key)}
              suggestedNextStep={buildSuggestedNextStep(followUpSuggestion)}
              onCopy={() => onCopy?.('primary_response')}
              onRegenerate={onRegenerate}
              loading={loading}
            />
          ) : null}

          {strategyBlock ? (
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-900">
                Suggested approach
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                What this response is trying to achieve in the negotiation.
              </p>
              <div className="mt-3 space-y-3">
                {strategyBlock.sections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      {section.title}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li
                          key={`${section.title}-${bullet}`}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {alternateVersions.length > 0 ? (
            <section className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Alternate versions
                </h4>
                <p className="text-sm text-slate-600">
                  Compare additional tones before you send the reply.
                </p>
              </div>

              <div className="space-y-3">
                {alternateVersions.map((version) => (
                  <div
                    key={version.key}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900">
                          {version.label}
                        </h5>
                        <p className="mt-1 text-xs text-slate-600">
                          {getResponseUsageHint(version.key)}
                        </p>
                      </div>
                      <CopyButton
                        value={version.text}
                        idleLabel="Copy Reply"
                        copiedLabel="Reply copied"
                        onCopied={() => onCopy?.(version.key)}
                      />
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {version.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {riskInsights && riskInsights.length > 0 ? (
            <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 className="text-sm font-semibold text-amber-950">
                Things to watch out for
              </h4>
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
            <section className="rounded-lg border border-sky-200 bg-sky-50 p-4">
              <h4 className="text-sm font-semibold text-sky-950">
                If the client pushes again
              </h4>
              <p className="mt-1 text-sm text-sky-900/85">
                How you might respond if the negotiation continues.
              </p>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg border border-sky-200 bg-white/70 p-3">
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
                  <div>
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
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-900">Actions</h4>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/history"
                  className="inline-flex h-9 items-center rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-400"
                >
                  {savedHint
                    ? 'Saved to negotiation history'
                    : 'Save to negotiation history'}
                </Link>
              </div>
            </section>
          ) : null}

          {showUpgradeNudge ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
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
            </div>
          ) : null}
        </>
      ) : null}
    </section>
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
    return joinBullets(whySection.bullets);
  }

  const objectiveSection = params.strategyBlock?.sections.find((section) =>
    /objective|goal|approach/i.test(section.title)
  );
  if (objectiveSection?.bullets.length) {
    return joinBullets(objectiveSection.bullets);
  }

  if (params.primaryVersionKey === 'firm' || params.selectedTone === 'firm') {
    return 'This reply protects your pricing boundary, acknowledges the objection without sounding defensive, and avoids rewarding pushback with an immediate discount.';
  }

  if (
    params.primaryVersionKey === 'softer' ||
    params.selectedTone === 'friendly'
  ) {
    return 'This reply keeps the relationship warm, shows the client you heard the concern, and creates room to clarify priorities before changing the deal terms.';
  }

  return 'This reply acknowledges the concern, keeps the tone calm, and moves the conversation toward scope or budget clarity before you make concessions.';
}

function buildSuggestedNextStep(followUpSuggestion?: FollowUpSuggestion) {
  if (followUpSuggestion?.direction?.trim()) {
    return followUpSuggestion.direction.trim();
  }

  if (followUpSuggestion?.reply?.trim()) {
    return 'Use the follow-up reply below if the client pushes again and you need to keep the negotiation moving.';
  }

  return '';
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

function joinBullets(bullets: string[]) {
  const parts = bullets
    .slice(0, 2)
    .map((bullet) => bullet.trim().replace(/[.;:,\s]+$/, ''))
    .filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  return `${parts.join('. ')}.`;
}
