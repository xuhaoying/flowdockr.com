'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { ScenarioSlug } from '@/lib/promptTemplates';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { useAppContext } from '@/shared/contexts/app';

type GenerateScenarioResponse = {
  reply: string;
  framework: {
    label: string;
    why: string;
  };
  quality: {
    maintains_value: boolean;
    keeps_conversation_open: boolean;
    avoids_defensive_tone: boolean;
  };
  scenario: {
    slug: ScenarioSlug;
    title: string;
  };
  quota: {
    active_plan: 'free' | 'credits';
    free: {
      used: number;
      limit: number;
      remaining: number;
    };
    credits: {
      remaining: number;
    };
  };
};

type NegotiationToolProps = {
  scenarioSlug: ScenarioSlug;
};

type PackCheckoutResponse = {
  checkout_url: string;
};

type PackId = 'flowdockr_10_replies' | 'flowdockr_50_replies' | 'flowdockr_200_replies';

const CREDIT_PACKS: Array<{
  id: PackId;
  replies: number;
  priceUsd: number;
  isMostPopular?: boolean;
}> = [
  { id: 'flowdockr_10_replies', replies: 10, priceUsd: 5 },
  { id: 'flowdockr_50_replies', replies: 50, priceUsd: 15, isMostPopular: true },
  { id: 'flowdockr_200_replies', replies: 200, priceUsd: 40 },
];

const MAX_MESSAGE_LENGTH = 1200;
const MIN_MESSAGE_LENGTH = 10;
const FREE_LIMIT = 2;
const COPY_TIMEOUT_MS = 1500;
const FREE_COUNT_KEY = 'flowdockr_scenario_free_count';

export function NegotiationTool({ scenarioSlug }: NegotiationToolProps) {
  const { user, setIsShowSignModal, fetchUserCredits } = useAppContext();

  const [clientMessage, setClientMessage] = useState('');
  const [result, setResult] = useState<GenerateScenarioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);
  const [creditsRemaining, setCreditsRemaining] = useState(0);
  const [checkoutLoadingPackId, setCheckoutLoadingPackId] = useState<PackId | null>(null);

  useEffect(() => {
    const freeParsed = parseSafeInt(window.localStorage.getItem(FREE_COUNT_KEY), 0, FREE_LIMIT);
    setFreeUsed(freeParsed);
  }, []);

  useEffect(() => {
    if (user && !user.credits) {
      void fetchUserCredits();
    }
  }, [fetchUserCredits, user]);

  useEffect(() => {
    setCreditsRemaining(Math.max(0, user?.credits?.remainingCredits || 0));
  }, [user?.credits?.remainingCredits]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const packPaid = searchParams.get('pack_paid');
    const packError = searchParams.get('pack_error');

    if (packPaid === '1') {
      void fetchUserCredits();
      toast.success('Credits added to your account.');
      searchParams.delete('pack_paid');
      searchParams.delete('pack_replies');
    }

    if (packError) {
      toast.error('Checkout was not completed.');
      searchParams.delete('pack_error');
    }

    if (packPaid === '1' || packError) {
      const nextQuery = searchParams.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, [fetchUserCredits]);

  const messageLength = clientMessage.trim().length;
  const freeRemaining = Math.max(0, FREE_LIMIT - freeUsed);
  const quotaExhausted = freeRemaining <= 0 && creditsRemaining <= 0;

  const validationMessage = useMemo(() => {
    if (messageLength < MIN_MESSAGE_LENGTH) {
      return `Client message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    if (messageLength > MAX_MESSAGE_LENGTH) {
      return `Client message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
    }

    if (quotaExhausted) {
      return "You've used your 2 free replies. Unlock more replies to continue.";
    }

    return '';
  }, [messageLength, quotaExhausted]);

  const canSubmit = !loading && !validationMessage;

  const onGenerate = async () => {
    if (validationMessage) {
      setError(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/scenarios/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: scenarioSlug,
          client_message: clientMessage.trim(),
        }),
      });

      const payload = (await response.json()) as Partial<GenerateScenarioResponse> & {
        message?: string;
      };

      if (!response.ok) {
        if (response.status === 401) {
          setIsShowSignModal(true);
        }
        throw new Error(payload.message || 'Failed to generate a reply. Please retry.');
      }

      if (!isGenerateScenarioResponse(payload)) {
        throw new Error('Invalid output format. Please retry.');
      }

      setResult(payload);

      const nextFreeUsed = parseSafeInt(
        String(payload.quota.free.used),
        0,
        payload.quota.free.limit || FREE_LIMIT
      );
      const nextCreditsRemaining = parseSafeInt(
        String(payload.quota.credits.remaining),
        0,
        100_000
      );

      setFreeUsed(nextFreeUsed);
      setCreditsRemaining(nextCreditsRemaining);
      window.localStorage.setItem(FREE_COUNT_KEY, String(nextFreeUsed));

      if (user) {
        void fetchUserCredits();
      }
      toast.success('Reply generated.');
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Failed to generate a reply. Please retry.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    if (!result?.reply) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.reply);
      setCopied(true);
      toast.success('Copied');
      window.setTimeout(() => {
        setCopied(false);
      }, COPY_TIMEOUT_MS);
    } catch {
      toast.error('Copy failed. Please try again.');
    }
  };

  const onBuyPack = async (packId: PackId) => {
    if (!user) {
      setIsShowSignModal(true);
      return;
    }

    setCheckoutLoadingPackId(packId);
    setError('');

    try {
      const returnPath = `${window.location.pathname}${window.location.search}`;
      const response = await fetch('/api/scenarios/pack/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          return_to: returnPath,
          pack_id: packId,
        }),
      });

      const payload = (await response.json()) as Partial<PackCheckoutResponse> & {
        message?: string;
      };
      if (response.status === 401) {
        setIsShowSignModal(true);
      }
      if (!response.ok || !payload.checkout_url) {
        throw new Error(payload.message || 'Failed to start checkout.');
      }

      window.location.assign(payload.checkout_url);
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Failed to start checkout.';
      setError(message);
      toast.error(message);
    } finally {
      setCheckoutLoadingPackId(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-4 w-4" />
            Generate a professional reply
          </CardTitle>
          <CardDescription>
            Scenario context is preloaded. You only need to paste the client message.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client_message">Client message</Label>
            <Textarea
              id="client_message"
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder="Paste the exact message from your client..."
              rows={7}
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <p className="text-xs text-muted-foreground">
              {messageLength}/{MAX_MESSAGE_LENGTH}
            </p>
          </div>

          <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
            <p>Free replies left: {freeRemaining}/2</p>
            <p>Paid replies left: {creditsRemaining}</p>
          </div>

          <Button onClick={onGenerate} disabled={!canSubmit} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate reply'
            )}
          </Button>
        </CardContent>
      </Card>

      {quotaExhausted ? (
        <Card>
          <CardHeader>
            <CardTitle>You&apos;ve used your 2 free replies</CardTitle>
            <CardDescription>
              You&apos;re about to send a message to your client. Make sure it&apos;s the right one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!user ? (
              <Button type="button" onClick={() => setIsShowSignModal(true)} className="w-full sm:w-auto">
                Sign in to unlock credits packs
              </Button>
            ) : null}
            <div className="grid gap-2 md:grid-cols-3">
              {CREDIT_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className={`rounded-md border p-3 ${pack.isMostPopular ? 'border-primary' : ''}`}
                >
                  <p className="text-sm font-medium">
                    {pack.replies} replies - ${pack.priceUsd}
                  </p>
                  {pack.isMostPopular ? (
                    <p className="text-xs text-muted-foreground">Most popular</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Credits pack</p>
                  )}
                  <Button
                    type="button"
                    variant={pack.isMostPopular ? 'default' : 'outline'}
                    className="mt-2 w-full"
                    onClick={() => onBuyPack(pack.id)}
                    disabled={checkoutLoadingPackId !== null}
                  >
                    {checkoutLoadingPackId === pack.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      'Unlock more replies'
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Generated reply</CardTitle>
            <CardDescription>Copy this and send to your client.</CardDescription>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopy}
            disabled={!result?.reply}
          >
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted/40 p-4 text-sm leading-relaxed">
            {result?.reply || 'Your generated reply will appear here.'}
          </div>

          {result ? (
            <div className="space-y-2 rounded-md border p-3 text-sm">
              <p>
                <span className="font-medium">Framework:</span> {result.framework.label}
              </p>
              <p>
                <span className="font-medium">Why:</span> {result.framework.why}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function isGenerateScenarioResponse(value: unknown): value is GenerateScenarioResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const data = value as Partial<GenerateScenarioResponse>;

  return (
    typeof data.reply === 'string' &&
    typeof data.framework?.label === 'string' &&
    typeof data.framework?.why === 'string' &&
    typeof data.quality?.maintains_value === 'boolean' &&
    typeof data.quality?.keeps_conversation_open === 'boolean' &&
    typeof data.quality?.avoids_defensive_tone === 'boolean' &&
    typeof data.scenario?.slug === 'string' &&
    typeof data.scenario?.title === 'string' &&
    (data.quota?.active_plan === 'free' || data.quota?.active_plan === 'credits') &&
    typeof data.quota?.free?.used === 'number' &&
    typeof data.quota?.free?.limit === 'number' &&
    typeof data.quota?.free?.remaining === 'number' &&
    typeof data.quota?.credits?.remaining === 'number'
  );
}

function parseSafeInt(value: string | null, min: number, max: number): number {
  if (!value) {
    return min;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.floor(parsed)));
}
