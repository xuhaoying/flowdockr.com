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
    active_plan: 'free' | 'paid_pack';
    free: {
      used: number;
      limit: number;
      remaining: number;
    };
    paid_pack: {
      remaining: number;
      pack_size: number;
      price_usd: number;
    };
  };
};

type NegotiationToolProps = {
  scenarioSlug: ScenarioSlug;
};

type PackCheckoutResponse = {
  checkout_url: string;
};

const MAX_MESSAGE_LENGTH = 1200;
const MIN_MESSAGE_LENGTH = 10;
const FREE_LIMIT = 2;
const PACK_SIZE = 20;
const PACK_PRICE_USD = 5;
const COPY_TIMEOUT_MS = 1500;
const FREE_COUNT_KEY = 'flowdockr_scenario_free_count';
const PAID_REMAINING_KEY = 'flowdockr_scenario_paid_remaining_hint';

export function NegotiationTool({ scenarioSlug }: NegotiationToolProps) {
  const [clientMessage, setClientMessage] = useState('');
  const [result, setResult] = useState<GenerateScenarioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);
  const [paidRemaining, setPaidRemaining] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const freeParsed = parseSafeInt(window.localStorage.getItem(FREE_COUNT_KEY), 0, FREE_LIMIT);
    setFreeUsed(freeParsed);

    const paidFromCookie = parseSafeInt(
      getCookieValue(PAID_REMAINING_KEY),
      0,
      10_000
    );
    const paidFromStorage = parseSafeInt(
      window.localStorage.getItem(PAID_REMAINING_KEY),
      0,
      10_000
    );
    setPaidRemaining(Math.max(paidFromCookie, paidFromStorage));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const packPaid = searchParams.get('pack_paid');
    const packError = searchParams.get('pack_error');

    if (packPaid === '1') {
      const paidFromCookie = parseSafeInt(
        getCookieValue(PAID_REMAINING_KEY),
        0,
        10_000
      );
      setPaidRemaining((prev) => {
        const nextValue = Math.max(prev, paidFromCookie);
        window.localStorage.setItem(PAID_REMAINING_KEY, String(nextValue));
        return nextValue;
      });
      toast.success('Reply pack activated.');
      searchParams.delete('pack_paid');
    }

    if (packError) {
      toast.error('Pack checkout was not completed.');
      searchParams.delete('pack_error');
    }

    if (packPaid === '1' || packError) {
      const nextQuery = searchParams.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, []);

  const messageLength = clientMessage.trim().length;
  const freeRemaining = Math.max(0, FREE_LIMIT - freeUsed);
  const quotaExhausted = freeRemaining <= 0 && paidRemaining <= 0;

  const validationMessage = useMemo(() => {
    if (messageLength < MIN_MESSAGE_LENGTH) {
      return `Client message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    if (messageLength > MAX_MESSAGE_LENGTH) {
      return `Client message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
    }

    if (quotaExhausted) {
      return 'Free quota reached. Buy reply pack: $5 for 20 replies (no subscription).';
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
        if (response.status === 402) {
          setFreeUsed(FREE_LIMIT);
          setPaidRemaining(0);
          window.localStorage.setItem(FREE_COUNT_KEY, String(FREE_LIMIT));
          window.localStorage.setItem(PAID_REMAINING_KEY, '0');
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
      const nextPaidRemaining = parseSafeInt(
        String(payload.quota.paid_pack.remaining),
        0,
        10_000
      );

      setFreeUsed(nextFreeUsed);
      setPaidRemaining(nextPaidRemaining);
      window.localStorage.setItem(FREE_COUNT_KEY, String(nextFreeUsed));
      window.localStorage.setItem(PAID_REMAINING_KEY, String(nextPaidRemaining));

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

  const onBuyPack = async () => {
    setCheckoutLoading(true);
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
        }),
      });

      const payload = (await response.json()) as Partial<PackCheckoutResponse> & {
        message?: string;
      };
      if (!response.ok || !payload.checkout_url) {
        throw new Error(payload.message || 'Failed to start pack checkout.');
      }

      window.location.assign(payload.checkout_url);
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Failed to start pack checkout.';
      setError(message);
      toast.error(message);
    } finally {
      setCheckoutLoading(false);
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
            <p>
              Free: {freeRemaining}/{FREE_LIMIT} total replies left (no login)
            </p>
            <p>Paid pack remaining: {paidRemaining}/{PACK_SIZE} replies</p>
            <p className="text-muted-foreground">
              Paid pack: $5 for 20 replies (one-time, no subscription)
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
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
            <Button
              type="button"
              variant="outline"
              onClick={onBuyPack}
              disabled={checkoutLoading}
              className="w-full sm:w-auto"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                `Buy $${PACK_PRICE_USD} pack (${PACK_SIZE} replies)`
              )}
            </Button>
          </div>

          {quotaExhausted ? (
            <p className="text-sm text-muted-foreground">
              Free quota reached. Buy a $5 pack to continue (20 replies, no subscription).
            </p>
          ) : null}
        </CardContent>
      </Card>

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
    (data.quota?.active_plan === 'free' || data.quota?.active_plan === 'paid_pack') &&
    typeof data.quota?.free?.used === 'number' &&
    typeof data.quota?.free?.limit === 'number' &&
    typeof data.quota?.free?.remaining === 'number' &&
    typeof data.quota?.paid_pack?.remaining === 'number' &&
    typeof data.quota?.paid_pack?.pack_size === 'number' &&
    typeof data.quota?.paid_pack?.price_usd === 'number'
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

function getCookieValue(name: string): string | null {
  const entries = document.cookie.split(';');
  const matched = entries.find((item) => item.trim().startsWith(`${name}=`));
  if (!matched) {
    return null;
  }

  return matched.split('=').slice(1).join('=').trim();
}
