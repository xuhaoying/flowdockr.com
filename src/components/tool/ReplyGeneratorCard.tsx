'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

import { trackEvent } from '@/lib/analytics-client';
import { CreditPackageId } from '@/types/billing';
import { GeneratedReplyResult } from '@/types/generation';

import { ClientMessageInput } from '@/components/tool/ClientMessageInput';
import { CreditsBadge } from '@/components/tool/CreditsBadge';
import { GoalSelect } from '@/components/tool/GoalSelect';
import { OutputPanel } from '@/components/tool/OutputPanel';
import { PaywallModal } from '@/components/tool/PaywallModal';
import { ServiceTypeSelect } from '@/components/tool/ServiceTypeSelect';
import { ToneSelect } from '@/components/tool/ToneSelect';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

type UsageState = {
  loggedIn: boolean;
  remainingFreeGenerations: number;
  creditsBalance: number;
};

type ReplyGeneratorCardProps = {
  scenarioSlug: string;
  defaultTone?: 'professional_firm' | 'warm_confident' | 'direct' | 'diplomatic';
};

const DEFAULT_SUGGESTIONS = [
  'We can only do $300 for this. Can you lower your rate?',
  'Another freelancer quoted lower. Can you match it?',
  'Could you include this extra deliverable for free?',
] as const;

const SUGGESTIONS_BY_SCENARIO: Record<string, string[]> = {
  'how-to-respond-to-a-lowball-offer': [
    'We only have $200 for this project. Can you make it work?',
    'Your quote is above our budget. We expected something much lower.',
  ],
  'client-asks-for-a-discount': [
    'Can you do 20% off if we start this week?',
    'If you can reduce the price, I can approve today.',
  ],
  'client-says-another-freelancer-is-cheaper': [
    'Another freelancer offered half your rate for similar work.',
    'Why should we pay your price when someone else is cheaper?',
  ],
  'client-asks-for-free-sample-work': [
    'Can you do a quick sample first so we can evaluate fit?',
    'Please send a free test task before we commit.',
  ],
};

export function ReplyGeneratorCard({
  scenarioSlug,
  defaultTone = 'professional_firm',
}: ReplyGeneratorCardProps) {
  const [clientMessage, setClientMessage] = useState('');
  const [serviceType, setServiceType] = useState('designer');
  const [tone, setTone] = useState(defaultTone);
  const [goal, setGoal] = useState('protect_price');
  const [userRateContext, setUserRateContext] = useState('');

  const [result, setResult] = useState<GeneratedReplyResult | null>(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputStarted, setInputStarted] = useState(false);

  const [usage, setUsage] = useState<UsageState>({
    loggedIn: false,
    remainingFreeGenerations: 2,
    creditsBalance: 0,
  });
  const [anonymousSessionId, setAnonymousSessionId] = useState<string>('');

  const [paywallOpen, setPaywallOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutLoadingPackageId, setCheckoutLoadingPackageId] =
    useState<CreditPackageId | null>(null);

  useEffect(() => {
    trackEvent('scenario_page_view', { scenarioSlug });
  }, [scenarioSlug]);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        const sessionResp = await fetch('/api/session', { method: 'POST' });
        const sessionJson = (await sessionResp.json()) as {
          anonymousSessionId?: string;
          remainingFreeGenerations?: number;
        };
        if (active && typeof sessionJson.anonymousSessionId === 'string') {
          setAnonymousSessionId(sessionJson.anonymousSessionId);
        }
      } catch {
        // no-op
      }

      try {
        const creditsResp = await fetch('/api/credits');
        const creditsJson = (await creditsResp.json()) as
          | {
              loggedIn: true;
              creditsBalance: number;
            }
          | {
              loggedIn: false;
              remainingFreeGenerations: number;
            };

        if (!active) {
          return;
        }

        if (creditsJson.loggedIn) {
          setUsage({
            loggedIn: true,
            creditsBalance: Math.max(0, creditsJson.creditsBalance || 0),
            remainingFreeGenerations: 0,
          });
          return;
        }

        setUsage({
          loggedIn: false,
          creditsBalance: 0,
          remainingFreeGenerations: Math.max(
            0,
            creditsJson.remainingFreeGenerations || 0
          ),
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
    if (!paywallOpen) {
      return;
    }

    trackEvent('fd_paywall_shown', {
      scenarioSlug,
      serviceType,
      tone,
      goal,
      loggedIn: usage.loggedIn,
    });
  }, [goal, paywallOpen, scenarioSlug, serviceType, tone, usage.loggedIn]);

  const canGenerate = useMemo(() => {
    const hasMessage = clientMessage.trim().length >= 8;
    return hasMessage && !isGenerating;
  }, [clientMessage, isGenerating]);

  const isExhausted = useMemo(() => {
    if (usage.loggedIn) {
      return usage.creditsBalance <= 0;
    }
    return usage.remainingFreeGenerations <= 0;
  }, [usage]);

  const suggestionRows =
    SUGGESTIONS_BY_SCENARIO[scenarioSlug] || Array.from(DEFAULT_SUGGESTIONS);

  const usageHelperText = usage.loggedIn
    ? `${Math.max(0, usage.creditsBalance)} credits available`
    : `${Math.max(0, usage.remainingFreeGenerations)} free replies left`;

  const handleClientMessageChange = (value: string) => {
    if (!inputStarted && value.trim().length > 0) {
      setInputStarted(true);
      trackEvent('tool_input_started', {
        scenarioSlug,
        loggedIn: usage.loggedIn,
      });
    }
    setClientMessage(value);
  };

  const applySuggestion = (message: string) => {
    handleClientMessageChange(message);
  };

  const handleGenerate = async () => {
    if (!canGenerate) {
      return;
    }

    if (isExhausted) {
      setPaywallOpen(true);
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      trackEvent('generation_submitted', {
        scenarioSlug,
        serviceType,
        tone,
        goal,
        loggedIn: usage.loggedIn,
      });

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioSlug,
          clientMessage: clientMessage.trim(),
          serviceType,
          tone,
          goal,
          userRateContext: userRateContext.trim() || undefined,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        code?: string;
        message?: string;
        data?: GeneratedReplyResult;
        usage?: {
          isFreeGeneration?: boolean;
          remainingFreeGenerations?: number;
          creditsBalance?: number | null;
        };
      };

      if (!response.ok || !payload.ok) {
        if (payload.code === 'PAYWALL_REQUIRED') {
          setUsage((prev) => ({
            ...prev,
            remainingFreeGenerations:
              payload.usage?.remainingFreeGenerations ?? prev.remainingFreeGenerations,
            creditsBalance:
              typeof payload.usage?.creditsBalance === 'number'
                ? payload.usage.creditsBalance
                : prev.creditsBalance,
          }));
          setPaywallOpen(true);
        }

        throw new Error(payload.message || 'Failed to generate reply.');
      }

      if (!payload.data) {
        throw new Error('No generation result returned.');
      }

      setResult(payload.data);
      setUsage((prev) => ({
        ...prev,
        remainingFreeGenerations:
          payload.usage?.remainingFreeGenerations ?? prev.remainingFreeGenerations,
        creditsBalance:
          typeof payload.usage?.creditsBalance === 'number'
            ? payload.usage.creditsBalance
            : prev.creditsBalance,
      }));

      trackEvent('fd_generation_success', {
        scenarioSlug,
        serviceType,
        tone,
        goal,
        loggedIn: usage.loggedIn,
      });
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : 'Failed to generate reply.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckout = async (packageId: CreditPackageId) => {
    setCheckoutLoadingPackageId(packageId);
    setError('');

    try {
      trackEvent('checkout_started', {
        scenarioSlug,
        serviceType,
        tone,
        goal,
        loggedIn: usage.loggedIn,
      });

      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packCode: packageId,
          anonymousSessionId: anonymousSessionId || undefined,
          scenarioSlug,
          returnTo: window.location.pathname + window.location.search,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        checkoutUrl?: string;
        error?: string;
      };

      if (response.status === 401 || payload.error === 'UNAUTHORIZED') {
        const callbackUrl = `${window.location.pathname}${window.location.search}`;
        window.location.assign(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }

      if (!response.ok || !payload.ok || !payload.checkoutUrl) {
        throw new Error(payload.message || 'Failed to start checkout.');
      }

      window.location.assign(payload.checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Failed to start checkout.'
      );
    } finally {
      setCheckoutLoadingPackageId(null);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]" data-component="reply-generator">
      <Card className="border-foreground/10">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl">Generate your reply</CardTitle>
              <CardDescription>
                Paste real client wording, then send a strategy-grade response.
              </CardDescription>
            </div>
            <CreditsBadge
              loggedIn={usage.loggedIn}
              creditsBalance={usage.creditsBalance}
              remainingFreeGenerations={usage.remainingFreeGenerations}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="gap-1 rounded-full px-2.5">
              <Sparkles className="size-3" />
              Scenario tuned
            </Badge>
            <span>{usageHelperText}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <ClientMessageInput value={clientMessage} onChange={handleClientMessageChange} />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Quick start examples</p>
            <div className="flex flex-wrap gap-2">
              {suggestionRows.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="outline"
                  className="h-8 max-w-full px-3 text-xs"
                  onClick={() => applySuggestion(item)}
                >
                  {truncateForChip(item)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ServiceTypeSelect value={serviceType} onValueChange={setServiceType} />
            <ToneSelect
              value={tone}
              onValueChange={(value) =>
                setTone(
                  value as 'professional_firm' | 'warm_confident' | 'direct' | 'diplomatic'
                )
              }
            />
            <GoalSelect value={goal} onValueChange={setGoal} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate_context">Rate context (optional)</Label>
            <Input
              id="rate_context"
              value={userRateContext}
              onChange={(event) => setUserRateContext(event.target.value)}
              placeholder="Example: My usual range is $800-$1200"
              maxLength={500}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" onClick={handleGenerate} disabled={!canGenerate}>
              {isGenerating ? 'Generating...' : 'Generate strategic reply'}
            </Button>

            {isExhausted ? (
              <Button type="button" variant="outline" onClick={() => setPaywallOpen(true)}>
                Unlock credits
              </Button>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <OutputPanel result={result} isGenerating={isGenerating} />

      <PaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        loggedIn={usage.loggedIn}
        email={checkoutEmail}
        onEmailChange={setCheckoutEmail}
        checkoutLoadingPackageId={checkoutLoadingPackageId}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function truncateForChip(input: string) {
  if (input.length <= 58) {
    return input;
  }

  return `${input.slice(0, 55)}...`;
}
