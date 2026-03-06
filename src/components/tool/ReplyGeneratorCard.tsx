'use client';

import { useEffect, useMemo, useState } from 'react';

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

    trackEvent('paywall_shown', {
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

      trackEvent('generation_success', {
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
    if (!usage.loggedIn && !checkoutEmail.trim()) {
      setError('Please enter an email before checkout.');
      return;
    }

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

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          email: usage.loggedIn ? undefined : checkoutEmail.trim(),
          anonymousSessionId: anonymousSessionId || undefined,
          scenarioSlug,
          returnTo: window.location.pathname + window.location.search,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        checkoutUrl?: string;
      };

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
    <div className="space-y-4" data-component="reply-generator">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Generate your reply</CardTitle>
              <CardDescription>
                Free 2 replies. Then unlock credits.
              </CardDescription>
            </div>
            <CreditsBadge
              loggedIn={usage.loggedIn}
              creditsBalance={usage.creditsBalance}
              remainingFreeGenerations={usage.remainingFreeGenerations}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ClientMessageInput
            value={clientMessage}
            onChange={handleClientMessageChange}
          />

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

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleGenerate} disabled={!canGenerate}>
              {isGenerating ? 'Generating...' : 'Generate reply'}
            </Button>

            {isExhausted ? (
              <Button type="button" variant="outline" onClick={() => setPaywallOpen(true)}>
                Unlock credits
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <OutputPanel result={result} />

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
