'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useToolGeneration } from '@/hooks/useToolGeneration';
import { trackEvent } from '@/lib/analytics-client';
import { saveDealRecord } from '@/lib/deals-history';
import { getScenarioBySlug, scenarios } from '@/lib/scenarios';
import { CreditPackageId } from '@/types/billing';
import { DealProjectType, DealTone } from '@/types/deals';
import { GenerateReplyRequest } from '@/types/generation';

import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

import { ScenarioSelector } from './ScenarioSelector';
import { ToolPaywall } from './ToolPaywall';
import { ToolResult } from './ToolResult';

type ToolFormProps = {
  defaultScenarioSlug?: string;
  showScenarioSelector?: boolean;
  placeholder?: string;
  sourcePage: 'home' | 'scenario' | 'tool';
};

type UsageState = {
  loggedIn: boolean;
  remainingFreeGenerations: number;
  creditsBalance: number;
};

const INITIAL_USAGE: UsageState = {
  loggedIn: false,
  remainingFreeGenerations: 2,
  creditsBalance: 0,
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
  defaultScenarioSlug,
  showScenarioSelector = true,
  placeholder,
  sourcePage,
}: ToolFormProps) {
  const fallbackSlug = scenarios[0]?.slug || 'lowball-offer';

  const [scenarioSlug, setScenarioSlug] = useState(defaultScenarioSlug || fallbackSlug);
  const [message, setMessage] = useState('');
  const [usage, setUsage] = useState<UsageState>(INITIAL_USAGE);
  const [upgradeVisible, setUpgradeVisible] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState<CreditPackageId | null>(null);
  const [projectType, setProjectType] = useState<DealProjectType>('other');
  const [tone, setTone] = useState<DealTone>('professional');
  const [savedHint, setSavedHint] = useState('');

  const resultRef = useRef<HTMLDivElement>(null);

  const { isLoading, error, result, submit, setResult } = useToolGeneration();

  const scenario = useMemo(() => getScenarioBySlug(scenarioSlug), [scenarioSlug]);

  const textareaPlaceholder =
    placeholder || scenario?.placeholder || 'Paste the exact message the client sent...';

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
  const canSaveResult = Boolean(result?.success && result.reply);

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
          | { loggedIn: true; creditsBalance: number; freeRepliesRemaining?: number }
          | { loggedIn: false; remainingFreeGenerations: number };

        if (!active) {
          return;
        }

        if (payload.loggedIn) {
          setUsage({
            loggedIn: true,
            creditsBalance: Math.max(0, payload.creditsBalance || 0),
            remainingFreeGenerations: Math.max(0, payload.freeRepliesRemaining || 0),
          });
          return;
        }

        setUsage({
          loggedIn: false,
          creditsBalance: 0,
          remainingFreeGenerations: Math.max(0, payload.remainingFreeGenerations || 0),
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
    if (!savedHint) {
      return;
    }

    const timeout = window.setTimeout(() => setSavedHint(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [savedHint]);

  const onGenerate = async () => {
    if (!canSubmit) {
      trackEvent('tool_submit_failed', {
        scenarioSlug,
        sourcePage,
        reason: validationError || 'INVALID_INPUT',
      });
      return;
    }

    if (isExhausted) {
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

    setUpgradeVisible(false);
    setSavedHint('');

    setUsage((prev) => {
      if (prev.loggedIn) {
        const nextCredits =
          typeof response.creditsRemaining === 'number'
            ? Math.max(0, response.creditsRemaining || 0)
            : prev.creditsBalance;

        if (prev.creditsBalance > 0) {
          return {
            ...prev,
            creditsBalance: nextCredits,
          };
        }

        return {
          ...prev,
          creditsBalance: nextCredits,
          remainingFreeGenerations: Math.max(0, prev.remainingFreeGenerations - 1),
        };
      }

      return {
        ...prev,
        remainingFreeGenerations: Math.max(0, prev.remainingFreeGenerations - 1),
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
  };

  const onSaveDeal = () => {
    if (!result?.success || !result.reply) {
      return;
    }

    const saved = saveDealRecord({
      scenarioSlug,
      scenarioTitle: scenario?.title || scenarioSlug,
      clientMessage: trimmedMessage,
      generatedReply: result.reply,
      alternativeReply: result.alternativeReply,
      strategy: result.strategy,
      tone,
      projectType,
      sourcePage,
      status: 'draft',
    });

    setSavedHint('Saved to deal history.');
    trackEvent('deal_saved', {
      dealId: saved.id,
      scenarioSlug,
      sourcePage,
      tone,
    });
  };

  const onCheckout = async (packageId: CreditPackageId) => {
    setCheckoutLoading(packageId);

    try {
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
        window.location.assign(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
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
      setCheckoutLoading(null);
    }
  };

  const onCopy = (target: 'reply' | 'alternative') => {
    trackEvent(target === 'reply' ? 'copy_reply_clicked' : 'copy_alt_reply_clicked', {
      scenarioSlug,
      sourcePage,
    });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Paste the client message</p>
          <p className="text-xs text-slate-600">2 free replies. No subscription required.</p>
        </div>

        {showScenarioSelector ? (
          <ScenarioSelector
            value={scenarioSlug}
            onChange={(slug) => {
              setScenarioSlug(slug);
              setResult(null);
              setSavedHint('');
            }}
            label="Scenario"
          />
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Project type</span>
          <select
            value={projectType}
            onChange={(event) => setProjectType(event.target.value as DealProjectType)}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-slate-500"
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
            onChange={(event) => setTone(event.target.value as DealTone)}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-slate-500"
          >
            {TONE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Client message</span>
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
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
          <Button type="button" onClick={onGenerate} disabled={!canSubmit}>
            {isLoading ? 'Generating...' : 'Generate reply'}
          </Button>
          {isExhausted ? (
            <Button type="button" variant="outline" onClick={() => window.location.assign('/pricing')}>
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

        {(upgradeVisible || isExhausted) && (
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
          alternativeReply={result?.alternativeReply || ''}
          strategy={result?.strategy || []}
          loading={isLoading}
          onRegenerate={onGenerate}
          onCopy={onCopy}
          onSave={onSaveDeal}
          canSave={canSaveResult}
          saveLabel="Save to deals"
          savedHint={savedHint}
        />
      </div>
    </div>
  );
}

function mapToneToApiTone(tone: DealTone): NonNullable<GenerateReplyRequest['tone']> {
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
      return "You've used your 2 free replies. Buy credits to keep generating.";
    case 'INSUFFICIENT_CREDITS':
      return 'No credits available. Buy credits to continue generating.';
    case 'PARSE_FAILED':
      return 'Generation format was invalid. Please try again.';
    case 'INTERNAL_ERROR':
      return 'Server error while generating. Please retry.';
    default:
      return 'Failed to generate a reply. Please try again.';
  }
}

function formatFreeReplies(value: number) {
  return `${value} free ${value === 1 ? 'reply' : 'replies'}`;
}
