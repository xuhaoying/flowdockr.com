'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useToolGeneration,
  type ToolGenerationState,
} from '@/hooks/useToolGeneration';
import { trackEvent } from '@/lib/analytics';
import {
  buildPricingScenarioAnalyticsParams,
  buildPricingScenarioAttribution,
} from '@/lib/analytics/pricingAttribution';
import { hasCanonicalScenarioFunnel } from '@/lib/analytics/scenarioFunnel';
import { getCreditPackageById } from '@/lib/credits/packages';
import { getScenarioBySlug, scenarios } from '@/lib/scenarios';
import {
  BillingSupportLevel,
  CreditPackageId,
  FeatureEntitlements,
} from '@/types/billing';
import { DealProjectType, DealTone } from '@/types/deals';
import {
  GenerateReplyRequest,
  type GenerationFeedbackReason,
  type GenerationFeedbackType,
} from '@/types/generation';
import type { PricingScenarioAttributionSeedInput } from '@/types/pricing-analytics';
import { useLocale } from 'next-intl';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Textarea } from '@/shared/components/ui/textarea';

import { ScenarioSelector } from './ScenarioSelector';
import { ToolPaywall } from './ToolPaywall';
import { ToolResult } from './ToolResult';

type ToolFormProps = {
  analyticsScenarioSlug?: string;
  funnelScenarioSlug?: string;
  defaultScenarioSlug?: string;
  pricingAttribution?: PricingScenarioAttributionSeedInput;
  showScenarioSelector?: boolean;
  showAdvancedFields?: boolean;
  placeholder?: string;
  rateContextLabel?: string;
  rateContextPlaceholder?: string;
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

const LIGHT_FIELD_STYLE = {
  backgroundColor: '#ffffff',
  color: '#0f172a',
  colorScheme: 'light' as const,
};

export function ToolForm({
  analyticsScenarioSlug: initialAnalyticsScenarioSlug,
  funnelScenarioSlug = '',
  defaultScenarioSlug,
  pricingAttribution: pricingAttributionSeed,
  showScenarioSelector = false,
  showAdvancedFields = false,
  placeholder,
  rateContextLabel = 'Quote / scope / deal context (optional)',
  rateContextPlaceholder = 'Example: Quote was $2,400 for strategy, copy, and 2 revision rounds over 10 days.',
  sourcePage,
  workspaceTitle = 'Paste the exact client message',
  workspaceDescription = '2 free negotiation credits. No subscription required.',
  submitLabel = 'Draft negotiation reply',
}: ToolFormProps) {
  const fallbackSlug = scenarios[0]?.slug || 'quote-too-high';
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
  const [userRateContext, setUserRateContext] = useState('');
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
  const pricingAttribution = useMemo(
    () => buildPricingScenarioAttribution(pricingAttributionSeed),
    [pricingAttributionSeed]
  );
  const pricingAnalyticsParams = useMemo(
    () => buildPricingScenarioAnalyticsParams(pricingAttribution),
    [pricingAttribution]
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
  const canonicalFunnelScenarioSlug = funnelScenarioSlug.trim();
  const isCanonicalScenarioFunnel = hasCanonicalScenarioFunnel({
    sourcePage,
    funnelScenarioSlug: canonicalFunnelScenarioSlug,
  });
  const canonicalScenarioSlugParams = useMemo(
    () =>
      isCanonicalScenarioFunnel
        ? { scenario_slug: canonicalFunnelScenarioSlug }
        : {},
    [canonicalFunnelScenarioSlug, isCanonicalScenarioFunnel]
  );
  const paywallVisible = upgradeVisible || isExhausted;
  const currentRemainingCredits = getRemainingCredits(usage);

  const trackToolOpen = () => {
    if (toolOpenTrackedRef.current) {
      return;
    }

    toolOpenTrackedRef.current = true;
    trackEvent('tool_open', {
      ...canonicalScenarioSlugParams,
      ...pricingAnalyticsParams,
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
    const paywallRemainingCredits =
      paywallTriggerTypeRef.current === 'usage_state'
        ? currentRemainingCredits
        : paywallRemainingCreditsRef.current;

    trackEvent('paywall_trigger', {
      ...canonicalScenarioSlugParams,
      ...pricingAnalyticsParams,
      locale,
      trigger_type: paywallTriggerTypeRef.current || 'usage_state',
    });

    if (isCanonicalScenarioFunnel) {
      trackEvent('fd_paywall_shown', {
        scenario_slug: canonicalFunnelScenarioSlug,
        support_level: usage.supportLevel,
        remaining_credits: paywallRemainingCredits,
        page_type: 'scenario',
      });
    }
  }, [
    currentRemainingCredits,
    locale,
    paywallVisible,
    canonicalScenarioSlugParams,
    canonicalFunnelScenarioSlug,
    isCanonicalScenarioFunnel,
    pricingAnalyticsParams,
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
    if (isCanonicalScenarioFunnel) {
      trackEvent('fd_generation_success', {
        scenario_slug: canonicalFunnelScenarioSlug,
        support_level: pendingGenerationSupportLevelRef.current,
        remaining_credits: pendingGenerationRemainingCreditsRef.current,
        page_type: 'scenario',
      });
    }

    if (pricingAttribution) {
      trackEvent('generate_success_from_pricing_scenario', {
        ...pricingAnalyticsParams,
        generation_id: result?.generationId || '',
        support_level:
          result?.supportLevel || pendingGenerationSupportLevelRef.current,
        remaining_credits: pendingGenerationRemainingCreditsRef.current,
      });

      const historyEnabled =
        result?.entitlements?.historyEnabled ?? usage.entitlements.historyEnabled;
      if (historyEnabled && result?.generationId) {
        trackEvent('save_history_from_pricing_scenario', {
          ...pricingAnalyticsParams,
          generation_id: result.generationId,
          support_level:
            result?.supportLevel || pendingGenerationSupportLevelRef.current,
        });
      }
    }
  }, [
    result,
    canonicalFunnelScenarioSlug,
    isCanonicalScenarioFunnel,
    pricingAnalyticsParams,
    pricingAttribution,
    trackedScenarioSlug,
    usage.entitlements.historyEnabled,
  ]);

  const onGenerate = async (
    trigger: 'main_button' | 'regenerate' = 'main_button'
  ) => {
    generationSuccessPendingRef.current = false;
    pendingGenerationScenarioSlugRef.current = trackedScenarioSlug;

    if (!canSubmit) {
      trackEvent('tool_submit_failed', {
        scenarioSlug,
        sourcePage,
        ...pricingAnalyticsParams,
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
        ...canonicalScenarioSlugParams,
        ...pricingAnalyticsParams,
        locale,
      });
      if (pricingAttribution) {
        trackEvent('click_generate_from_pricing_scenario', {
          ...pricingAnalyticsParams,
          trigger,
        });
      }
      if (isCanonicalScenarioFunnel && trigger === 'main_button') {
        trackEvent('fd_tool_start', {
          scenario_slug: canonicalFunnelScenarioSlug,
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
          ...pricingAnalyticsParams,
        });
        return;
      }

      trackEvent('tool_submit_started', {
        scenarioSlug,
        sourcePage,
        ...pricingAnalyticsParams,
      });

      const response = await submit({
        scenarioSlug,
        message: trimmedMessage,
        sourcePage,
        pricingAttribution: pricingAttributionSeed,
        serviceType: projectType,
        tone: mapToneToApiTone(tone),
        userRateContext: userRateContext.trim() || undefined,
      });

      if (!response) {
        trackEvent('tool_submit_failed', {
          scenarioSlug,
          sourcePage,
          ...pricingAnalyticsParams,
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
            ...pricingAnalyticsParams,
          });
        }

        trackEvent('tool_submit_failed', {
          scenarioSlug,
          sourcePage,
          ...pricingAnalyticsParams,
          reason: response.error || 'GENERATION_FAILED',
        });
        return;
      }

      generationSuccessPendingRef.current =
        hasRenderableGenerationResult(response);
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
        ...pricingAnalyticsParams,
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
        ...canonicalScenarioSlugParams,
        ...pricingAnalyticsParams,
        locale,
        plan_id: pack?.id || packageId,
        price_id: pack?.stripePriceId || undefined,
      });
      if (pricingAttribution) {
        trackEvent('click_checkout_from_pricing_scenario', {
          ...pricingAnalyticsParams,
          plan_id: pack?.id || packageId,
          price_id: pack?.stripePriceId || undefined,
        });
      }
      trackEvent('pricing_card_clicked', {
        packageId,
        scenarioSlug,
        sourcePage,
        ...pricingAnalyticsParams,
      });
      trackEvent('checkout_started', {
        packageId,
        scenarioSlug,
        sourcePage,
        ...pricingAnalyticsParams,
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
          pricingAttribution: pricingAttributionSeed,
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
        ...pricingAnalyticsParams,
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
      ...pricingAnalyticsParams,
    });
  };

  const onFeedback = async (params: {
    type: GenerationFeedbackType;
    reason?: GenerationFeedbackReason;
  }) => {
    if (!result?.generationId) {
      return;
    }

    try {
      await fetch('/api/generate/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generationId: result.generationId,
          type: params.type,
          reason: params.reason,
        }),
      });
    } catch {
      // no-op
    }

    trackEvent('generation_feedback_submitted', {
      generation_id: result.generationId,
      ...canonicalScenarioSlugParams,
      ...pricingAnalyticsParams,
      source_page: sourcePage,
      feedback_type: params.type,
      feedback_reason: params.reason,
    });
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
      <Card
        id="tool-workspace"
        className="border-border/80 overflow-hidden bg-white py-0"
      >
        <CardHeader className="border-border/70 gap-3 border-b bg-gradient-to-br from-white via-white to-slate-50/80 px-5 py-5 lg:px-6 lg:py-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl tracking-tight text-slate-900">
                {workspaceTitle}
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-slate-600">
                {workspaceDescription}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="rounded-full border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700"
            >
              {usageText}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-5 py-5 lg:px-6 lg:py-6">
          {showScenarioSelector ? (
            <ScenarioSelector
              value={scenarioSlug}
              onChange={(slug) => {
                setScenarioSlug(slug);
                setAnalyticsScenarioSlug(slug);
                trackToolOpen();
                setResult(null);
                setSavedHint('');
              }}
              label="Pricing situation"
            />
          ) : null}

          <label className="block space-y-2.5">
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-800">
                Client message
              </span>
              <p className="text-xs text-slate-600">
                Paste the exact wording so the reply matches the pressure in the
                conversation.
              </p>
            </div>
            <Textarea
              value={message}
              onChange={(event) => {
                trackToolOpen();
                setMessage(event.target.value);
              }}
              rows={10}
              maxLength={4000}
              placeholder={textareaPlaceholder}
              className="min-h-[220px] resize-y rounded-xl border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-xs placeholder:text-slate-500 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-500"
              style={LIGHT_FIELD_STYLE}
            />
            <div className="flex items-center justify-end text-xs text-slate-500">
              <span>{trimmedMessage.length}/4000</span>
            </div>
          </label>

          {showAdvancedFields ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-800">
                    Tone
                  </span>
                  <select
                    value={tone}
                    onChange={(event) => {
                      trackToolOpen();
                      setTone(event.target.value as DealTone);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs transition outline-none focus:border-slate-500 dark:bg-white dark:text-slate-900"
                    style={LIGHT_FIELD_STYLE}
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
                    Project type
                  </span>
                  <select
                    value={projectType}
                    onChange={(event) => {
                      trackToolOpen();
                      setProjectType(event.target.value as DealProjectType);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs transition outline-none focus:border-slate-500 dark:bg-white dark:text-slate-900"
                    style={LIGHT_FIELD_STYLE}
                  >
                    {PROJECT_TYPE_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block space-y-2.5">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-slate-800">
                    {rateContextLabel}
                  </span>
                  <p className="text-xs text-slate-600">
                    Add your quote, scope, timing, or constraints so the draft
                    protects the right boundary.
                  </p>
                </div>
                <Textarea
                  value={userRateContext}
                  onChange={(event) => {
                    trackToolOpen();
                    setUserRateContext(event.target.value);
                  }}
                  rows={4}
                  maxLength={500}
                  placeholder={rateContextPlaceholder}
                  className="resize-y rounded-xl border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-xs placeholder:text-slate-500 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-500"
                  style={LIGHT_FIELD_STYLE}
                />
              </label>
            </>
          ) : null}

          <div className="border-border/70 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto"
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
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.location.assign('/pricing')}
              >
                View pricing
              </Button>
            ) : null}
          </div>

          {validationError && trimmedMessage ? (
            <div className="rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {validationError}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
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
        </CardContent>
      </Card>

      <div ref={resultRef} className="min-w-0">
        <ToolResult
          reply={result?.reply || ''}
          strategyBlock={result?.strategyBlock}
          replyVersions={result?.replyVersions}
          riskInsights={result?.riskInsights}
          followUpSuggestion={result?.followUpSuggestion}
          generationId={result?.generationId}
          scenarioContext={
            scenario
              ? {
                  title: scenario.title,
                  clientMessage: scenario.exampleClientMessage,
                  primaryGoal: scenario.primaryGoal,
                }
              : undefined
          }
          historyEnabled={
            result?.entitlements?.historyEnabled ??
            usage.entitlements.historyEnabled
          }
          supportLevel={result?.supportLevel || usage.supportLevel}
          selectedTone={tone}
          loading={isLoading}
          onRegenerate={() => {
            void onGenerate('regenerate');
          }}
          onCopy={onCopy}
          onFeedback={onFeedback}
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
    | 'reply'
    | 'replyVersions'
    | 'strategyBlock'
    | 'riskInsights'
    | 'followUpSuggestion'
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
