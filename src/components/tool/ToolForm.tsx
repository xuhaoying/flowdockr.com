'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

import { useToolGeneration, type ToolGenerationState } from '@/hooks/useToolGeneration';
import { trackEvent } from '@/lib/analytics';
import { getCreditPackageById } from '@/lib/credits/packages';
import { getScenarioBySlug, scenarios } from '@/lib/scenarios';
import {
  BillingSupportLevel,
  CreditPackageId,
  FeatureEntitlements,
} from '@/types/billing';
import { DealProjectType, DealTone } from '@/types/deals';
import { GenerateReplyRequest } from '@/types/generation';

import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

import { ScenarioSelector } from './ScenarioSelector';
import { ToolPaywall } from './ToolPaywall';
import { ToolResult } from './ToolResult';

type ToolFormProps = {
  analyticsScenarioSlug?: string;
  defaultScenarioSlug?: string;
  showScenarioSelector?: boolean;
  placeholder?: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  workspaceTitle?: string;
  workspaceDescription?: string;
  submitLabel?: string;
};

type UsageState = {
  loggedIn: boolean;
  remainingFreeGenerations: number;
  creditsBalance: number;
  supportLevel: BillingSupportLevel;
  entitlements: FeatureEntitlements;
};

const FREE_ENTITLEMENTS: FeatureEntitlements = {
  multiVersionEnabled: false,
  strategyExplanationEnabled: false,
  riskAlertEnabled: false,
  historyEnabled: false,
  followUpEnabled: false,
  advancedModesEnabled: false,
};

const INITIAL_USAGE: UsageState = {
  loggedIn: false,
  remainingFreeGenerations: 2,
  creditsBalance: 0,
  supportLevel: 'free',
  entitlements: FREE_ENTITLEMENTS,
};

const TONE_OPTIONS: Array<{ value: DealTone; label: string }> = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'firm', label: 'Firm' },
];

const PROJECT_TYPE_OPTIONS: Array<{ value: DealProjectType; label: string }> = [
  { value: 'designer', label: 'Design' },
  { value: 'developer', label: 'Development' },
  { value: 'copywriter', label: 'Copywriting' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'video_editor', label: 'Video editing' },
  { value: 'consultant', label: 'Consulting' },
  { value: 'other', label: 'Other services' },
];

export function ToolForm({
  analyticsScenarioSlug: initialAnalyticsScenarioSlug,
  defaultScenarioSlug,
  showScenarioSelector = true,
  placeholder,
  sourcePage,
  workspaceTitle = 'Paste the exact pricing message',
  workspaceDescription = '2 free negotiation credits. No subscription required.',
  submitLabel = 'Draft negotiation reply',
}: ToolFormProps) {
  const fallbackSlug = scenarios[0]?.slug || 'lowball-offer';
  const locale = useLocale();

  const [scenarioSlug, setScenarioSlug] = useState(
    defaultScenarioSlug || fallbackSlug
  );
  const [analyticsScenarioSlug, setAnalyticsScenarioSlug] = useState(
    initialAnalyticsScenarioSlug || defaultScenarioSlug || fallbackSlug
  );
  const [message, setMessage] = useState('');
  const [usage, setUsage] = useState<UsageState>(INITIAL_USAGE);
  const [upgradeVisible, setUpgradeVisible] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutLoading, setCheckoutLoading] =
    useState<CreditPackageId | null>(null);
  const [projectType, setProjectType] = useState<DealProjectType>('other');
  const [tone, setTone] = useState<DealTone>('professional');
  const [savedHint, setSavedHint] = useState('');

  const resultRef = useRef<HTMLDivElement>(null);
  const toolOpenTrackedRef = useRef(false);
  const paywallWasVisibleRef = useRef(false);
  const paywallTriggerTypeRef = useRef('usage_state');
  const generationSuccessPendingRef = useRef(false);
  const pendingGenerationScenarioSlugRef = useRef('');
  const pendingGenerationSupportLevelRef = useRef<BillingSupportLevel>('free');
  const pendingGenerationRemainingCreditsRef = useRef(0);
  const generateInFlightRef = useRef(false);
  const lastGenerateAttemptAtRef = useRef(0);
  const checkoutInFlightRef = useRef(false);
  const paywallRemainingCreditsRef = useRef(0);

  const { isLoading, error, result, submit, setResult } = useToolGeneration();

  const scenario = useMemo(
    () => getScenarioBySlug(scenarioSlug),
    [scenarioSlug]
  );

  const textareaPlaceholder =
    placeholder ||
    scenario?.placeholder ||
    'Paste the exact message the client sent...';

  const usageText = usage.loggedIn
    ? usage.creditsBalance > 0
      ? `${Math.max(0, usage.creditsBalance)} credits left`
      : `${formatFreeReplies(Math.max(0, usage.remainingFreeGenerations))} left`
    : `${formatFreeReplies(Math.max(0, usage.remainingFreeGenerations))} left`;

  const isExhausted = usage.loggedIn
    ? usage.creditsBalance <= 0 && usage.remainingFreeGenerations <= 0
    : usage.remainingFreeGenerations <= 0;

  const trimmedMessage = message.trim();

  const validationError = useMemo(() => {
    if (!trimmedMessage) {
      return 'Message is required.';
    }

    if (trimmedMessage.length < 6) {
      return 'Message must be at least 6 characters.';
    }

    if (trimmedMessage.length > 4000) {
      return 'Message must be 4000 characters or fewer.';
    }

    return '';
  }, [trimmedMessage]);

  const canSubmit = !validationError && !isLoading;
  const trackedScenarioSlug = analyticsScenarioSlug || scenarioSlug;
  const paywallVisible = upgradeVisible || isExhausted;
  const currentRemainingCredits = getRemainingCredits(usage);

  const trackToolOpen = (scenarioSlugOverride?: string) => {
    if (toolOpenTrackedRef.current) {
      return;
    }

    toolOpenTrackedRef.current = true;
    trackEvent('tool_open', {
      scenario_slug: scenarioSlugOverride || trackedScenarioSlug,
      locale,
    });
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        await fetch('/api/session', { method: 'POST' });
      } catch {
        // no-op
      }

      try {
        const response = await fetch('/api/credits');
        const payload = (await response.json()) as
          | {
              loggedIn: true;
              creditsBalance: number;
              freeRepliesRemaining?: number;
              supportLevel?: BillingSupportLevel;
              entitlements?: FeatureEntitlements;
            }
          | {
              loggedIn: false;
              remainingFreeGenerations: number;
              supportLevel?: BillingSupportLevel;
              entitlements?: FeatureEntitlements;
            };

        if (!active) {
          return;
        }

        if (payload.loggedIn) {
          setUsage({
            loggedIn: true,
            creditsBalance: Math.max(0, payload.creditsBalance || 0),
            remainingFreeGenerations: Math.max(
              0,
              payload.freeRepliesRemaining || 0
            ),
            supportLevel: payload.supportLevel || 'free',
            entitlements: payload.entitlements || FREE_ENTITLEMENTS,
          });
          return;
        }

        setUsage({
          loggedIn: false,
          creditsBalance: 0,
          remainingFreeGenerations: Math.max(
            0,
            payload.remainingFreeGenerations || 0
          ),
          supportLevel: payload.supportLevel || 'free',
          entitlements: payload.entitlements || FREE_ENTITLEMENTS,
        });
      } catch {
        // no-op
      }
    };

    void bootstrap();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!paywallVisible) {
      paywallWasVisibleRef.current = false;
      paywallTriggerTypeRef.current = 'usage_state';
      return;
    }

    if (paywallWasVisibleRef.current) {
      return;
    }

    paywallWasVisibleRef.current = true;
    const paywallScenarioSlug =
      paywallTriggerTypeRef.current === 'usage_state'
        ? trackedScenarioSlug
        : pendingGenerationScenarioSlugRef.current || trackedScenarioSlug;
    const paywallRemainingCredits =
      paywallTriggerTypeRef.current === 'usage_state'
        ? currentRemainingCredits
        : paywallRemainingCreditsRef.current;

    trackEvent('paywall_trigger', {
      scenario_slug: paywallScenarioSlug,
      locale,
      trigger_type: paywallTriggerTypeRef.current || 'usage_state',
    });

    if (sourcePage === 'scenario') {
      trackEvent('fd_paywall_shown', {
        scenario_slug: paywallScenarioSlug,
        support_level: usage.supportLevel,
        remaining_credits: paywallRemainingCredits,
        page_type: 'scenario',
      });
    }
  }, [
    currentRemainingCredits,
    locale,
    paywallVisible,
    sourcePage,
    trackedScenarioSlug,
    usage.supportLevel,
  ]);

  useEffect(() => {
    if (
      !generationSuccessPendingRef.current ||
      !hasRenderableGenerationResult(result)
    ) {
      return;
    }

    generationSuccessPendingRef.current = false;
    if (sourcePage !== 'scenario') {
      return;
    }

    trackEvent('fd_generation_success', {
      scenario_slug:
        pendingGenerationScenarioSlugRef.current || trackedScenarioSlug,
      support_level: pendingGenerationSupportLevelRef.current,
      remaining_credits: pendingGenerationRemainingCreditsRef.current,
      page_type: 'scenario',
    });
  }, [result, sourcePage, trackedScenarioSlug]);

  const onGenerate = async (
    trigger: 'main_button' | 'regenerate' = 'main_button'
  ) => {
    generationSuccessPendingRef.current = false;
    pendingGenerationScenarioSlugRef.current = trackedScenarioSlug;

    if (!canSubmit) {
      trackEvent('tool_submit_failed', {
        scenarioSlug,
        sourcePage,
        reason: validationError || 'INVALID_INPUT',
      });
      return;
    }

    const now = Date.now();
    if (
      generateInFlightRef.current ||
      isLoading ||
      now - lastGenerateAttemptAtRef.current < 500
    ) {
      return;
    }

    lastGenerateAttemptAtRef.current = now;
    generateInFlightRef.current = true;
    paywallRemainingCreditsRef.current = currentRemainingCredits;

    try {
      trackToolOpen();
      trackEvent('generate_click', {
        scenario_slug: trackedScenarioSlug,
        locale,
      });
      if (sourcePage === 'scenario' && trigger === 'main_button') {
        trackEvent('fd_tool_start', {
          scenario_slug: trackedScenarioSlug,
          project_type: projectType,
          tone,
          page_type: 'scenario',
        });
      }

      if (isExhausted) {
        paywallTriggerTypeRef.current = 'free_limit_precheck';
        paywallRemainingCreditsRef.current = currentRemainingCredits;
        setUpgradeVisible(true);
        trackEvent('free_limit_reached', {
          scenarioSlug,
          sourcePage,
        });
        return;
      }

      trackEvent('tool_submit_started', {
        scenarioSlug,
        sourcePage,
      });

      const response = await submit({
        scenarioSlug,
        message: trimmedMessage,
        sourcePage,
        serviceType: projectType,
        tone: mapToneToApiTone(tone),
      });

      if (!response) {
        trackEvent('tool_submit_failed', {
          scenarioSlug,
          sourcePage,
          reason: 'NETWORK_ERROR',
        });
        return;
      }

      if (!response.success) {
        if (response.requiresUpgrade) {
          paywallTriggerTypeRef.current = 'free_limit_response';
          paywallRemainingCreditsRef.current = Math.max(
            0,
            response.creditsRemaining || 0
          );
          setUpgradeVisible(true);
          trackEvent('free_limit_reached', {
            scenarioSlug,
            sourcePage,
          });
        }

        trackEvent('tool_submit_failed', {
          scenarioSlug,
          sourcePage,
          reason: response.error || 'GENERATION_FAILED',
        });
        return;
      }

      generationSuccessPendingRef.current = hasRenderableGenerationResult(response);
      pendingGenerationSupportLevelRef.current =
        response.supportLevel || usage.supportLevel;
      pendingGenerationRemainingCreditsRef.current = Math.max(
        0,
        response.creditsRemaining || 0
      );
      setUpgradeVisible(false);
      setSavedHint(
        response.entitlements?.historyEnabled
          ? 'Saved to negotiation history.'
          : ''
      );

      setUsage((prev) => {
        const nextSupportLevel = response.supportLevel || prev.supportLevel;
        const nextEntitlements = response.entitlements || prev.entitlements;

        if (prev.loggedIn) {
          const nextCredits =
            typeof response.creditsRemaining === 'number'
              ? Math.max(0, response.creditsRemaining || 0)
              : prev.creditsBalance;

          if (prev.creditsBalance > 0) {
            return {
              ...prev,
              creditsBalance: nextCredits,
              supportLevel: nextSupportLevel,
              entitlements: nextEntitlements,
            };
          }

          return {
            ...prev,
            creditsBalance: nextCredits,
            remainingFreeGenerations: Math.max(
              0,
              prev.remainingFreeGenerations - 1
            ),
            supportLevel: nextSupportLevel,
            entitlements: nextEntitlements,
          };
        }

        return {
          ...prev,
          remainingFreeGenerations: Math.max(
            0,
            prev.remainingFreeGenerations - 1
          ),
          supportLevel: nextSupportLevel,
          entitlements: nextEntitlements,
        };
      });

      trackEvent('tool_submit_success', {
        scenarioSlug,
        sourcePage,
      });

      window.requestAnimationFrame(() => {
        const node = resultRef.current;
        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.88) {
          node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } finally {
      generateInFlightRef.current = false;
    }
  };

  const onCheckout = async (packageId: CreditPackageId) => {
    if (checkoutInFlightRef.current || checkoutLoading) {
      return;
    }

    checkoutInFlightRef.current = true;
    setCheckoutLoading(packageId);

    try {
      const pack = getCreditPackageById(packageId);

      trackEvent('checkout_click', {
        scenario_slug: trackedScenarioSlug,
        locale,
        plan_id: pack?.id || packageId,
        price_id: pack?.stripePriceId || undefined,
      });
      trackEvent('pricing_card_clicked', {
        packageId,
        scenarioSlug,
        sourcePage,
      });
      trackEvent('checkout_started', {
        packageId,
        scenarioSlug,
        sourcePage,
      });

      const checkoutResponse = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packCode: packageId,
          scenarioSlug,
          returnTo: `${window.location.pathname}${window.location.search}`,
        }),
      });

      const payload = (await checkoutResponse.json()) as {
        ok: boolean;
        message?: string;
        checkoutUrl?: string;
        error?: string;
      };

      if (checkoutResponse.status === 401 || payload.error === 'UNAUTHORIZED') {
        const callbackUrl = `${window.location.pathname}${window.location.search}`;
        window.location.assign(
          `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
        );
        return;
      }

      if (!checkoutResponse.ok || !payload.ok || !payload.checkoutUrl) {
        throw new Error(payload.message || 'Failed to start checkout.');
      }

      window.location.assign(payload.checkoutUrl);
    } catch {
      trackEvent('tool_submit_failed', {
        scenarioSlug,
        sourcePage,
        reason: 'CHECKOUT_FAILED',
      });
    } finally {
      checkoutInFlightRef.current = false;
      setCheckoutLoading(null);
    }
  };

  const onCopy = (target: string) => {
    trackEvent('copy_reply_clicked', {
      target,
      scenarioSlug,
      sourcePage,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <section
        id="tool-workspace"
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">
            {workspaceTitle}
          </p>
          <p className="text-xs text-slate-600">
            {workspaceDescription}
          </p>
        </div>

        {showScenarioSelector ? (
          <ScenarioSelector
            value={scenarioSlug}
            onChange={(slug) => {
              setScenarioSlug(slug);
              setAnalyticsScenarioSlug(slug);
              trackToolOpen(slug);
              setResult(null);
              setSavedHint('');
            }}
            label="Pricing situation"
          />
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">
            Project type
          </span>
          <select
            value={projectType}
            onChange={(event) => {
              trackToolOpen();
              setProjectType(event.target.value as DealProjectType);
            }}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 transition outline-none focus:border-slate-500"
          >
            {PROJECT_TYPE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Tone</span>
          <select
            value={tone}
            onChange={(event) => {
              trackToolOpen();
              setTone(event.target.value as DealTone);
            }}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 transition outline-none focus:border-slate-500"
          >
            {TONE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">
            Client message
          </span>
          <Textarea
            value={message}
            onChange={(event) => {
              trackToolOpen();
              setMessage(event.target.value);
            }}
            rows={9}
            maxLength={4000}
            placeholder={textareaPlaceholder}
            className="resize-y border-slate-300"
          />
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>{usageText}</span>
            <span>{trimmedMessage.length}/4000</span>
          </div>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={() => {
              void onGenerate('main_button');
            }}
            disabled={!canSubmit}
          >
            {isLoading ? 'Preparing guidance...' : submitLabel}
          </Button>
          {isExhausted ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.assign('/pricing')}
            >
              View pricing
            </Button>
          ) : null}
        </div>

        {validationError && trimmedMessage ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {validationError}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {toUserErrorMessage(error)}
          </div>
        ) : null}

        {paywallVisible && (
          <ToolPaywall
            loggedIn={usage.loggedIn}
            email={checkoutEmail}
            onEmailChange={setCheckoutEmail}
            loadingPackageId={checkoutLoading}
            onCheckout={onCheckout}
          />
        )}
      </section>

      <div ref={resultRef}>
        <ToolResult
          reply={result?.reply || ''}
          strategyBlock={result?.strategyBlock}
          replyVersions={result?.replyVersions}
          riskInsights={result?.riskInsights}
          followUpSuggestion={result?.followUpSuggestion}
          historyEnabled={
            result?.entitlements?.historyEnabled ??
            usage.entitlements.historyEnabled
          }
          supportLevel={result?.supportLevel || usage.supportLevel}
          loading={isLoading}
          onRegenerate={() => {
            void onGenerate('regenerate');
          }}
          onCopy={onCopy}
          savedHint={savedHint}
        />
      </div>
    </div>
  );
}

function mapToneToApiTone(
  tone: DealTone
): NonNullable<GenerateReplyRequest['tone']> {
  switch (tone) {
    case 'friendly':
      return 'warm_confident';
    case 'firm':
      return 'direct';
    case 'professional':
    default:
      return 'professional_firm';
  }
}

function toUserErrorMessage(errorCode: string) {
  switch (errorCode) {
    case 'INVALID_INPUT':
      return 'Message is required and must be valid.';
    case 'SCENARIO_NOT_FOUND':
      return 'Scenario not found. Please select another scenario.';
    case 'FREE_LIMIT_REACHED':
      return "You've used your 2 free negotiation credits. Buy more credits to keep generating.";
    case 'INSUFFICIENT_CREDITS':
      return 'No credits available. Buy more negotiation credits to continue generating.';
    case 'PARSE_FAILED':
      return 'Generation format was invalid. Please try again.';
    case 'INTERNAL_ERROR':
      return 'Server error while generating. Please retry.';
    default:
      return 'Failed to generate a reply. Please try again.';
  }
}

function formatFreeReplies(value: number) {
  return `${value} free ${value === 1 ? 'credit' : 'credits'}`;
}

function getRemainingCredits(usage: UsageState) {
  return Math.max(
    0,
    usage.loggedIn ? usage.creditsBalance : usage.remainingFreeGenerations
  );
}

function hasRenderableGenerationResult(
  result: Pick<
    NonNullable<ToolGenerationState['result']>,
    'reply' | 'replyVersions' | 'strategyBlock' | 'riskInsights' | 'followUpSuggestion'
  > | null
) {
  if (!result) {
    return false;
  }

  return Boolean(
    result.reply.trim() ||
      result.replyVersions?.some((version) => version.text.trim()) ||
      result.strategyBlock?.sections?.length ||
      result.riskInsights?.length ||
      result.followUpSuggestion?.reply?.trim()
  );
}
