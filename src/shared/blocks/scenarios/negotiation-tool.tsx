'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
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
    plan: 'free';
    used: number;
    limit: number;
    remaining: number;
  };
};

type NegotiationToolProps = {
  scenarioSlug: ScenarioSlug;
};

const MAX_MESSAGE_LENGTH = 1200;
const MIN_MESSAGE_LENGTH = 10;
const FREE_LIMIT = 2;
const COPY_TIMEOUT_MS = 1500;
const FREE_COUNT_KEY = 'flowdockr_scenario_free_count';

export function NegotiationTool({ scenarioSlug }: NegotiationToolProps) {
  const [clientMessage, setClientMessage] = useState('');
  const [result, setResult] = useState<GenerateScenarioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);

  useEffect(() => {
    const raw = window.localStorage.getItem(FREE_COUNT_KEY);
    const parsed = Number(raw);

    if (Number.isFinite(parsed) && parsed > 0) {
      setFreeUsed(Math.min(FREE_LIMIT, Math.floor(parsed)));
    }
  }, []);

  const messageLength = clientMessage.trim().length;
  const freeRemaining = Math.max(0, FREE_LIMIT - freeUsed);
  const freeExhausted = freeRemaining <= 0;

  const validationMessage = useMemo(() => {
    if (messageLength < MIN_MESSAGE_LENGTH) {
      return `Client message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    if (messageLength > MAX_MESSAGE_LENGTH) {
      return `Client message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
    }

    if (freeExhausted) {
      return 'Free quota reached. Buy reply pack: $5 for 20 replies (no subscription).';
    }

    return '';
  }, [freeExhausted, messageLength]);

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
          window.localStorage.setItem(FREE_COUNT_KEY, String(FREE_LIMIT));
        }
        throw new Error(payload.message || 'Failed to generate a reply. Please retry.');
      }

      if (!isGenerateScenarioResponse(payload)) {
        throw new Error('Invalid output format. Please retry.');
      }

      setResult(payload);

      const nextFreeUsed = Math.min(
        payload.quota.limit,
        Math.max(0, Math.floor(payload.quota.used))
      );
      setFreeUsed(nextFreeUsed);
      window.localStorage.setItem(FREE_COUNT_KEY, String(nextFreeUsed));

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
            <p className="text-muted-foreground">
              Paid pack: $5 for 20 replies (one-time, no subscription)
            </p>
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

          {freeExhausted ? (
            <p className="text-sm text-muted-foreground">
              Free quota reached. Continue with{' '}
              <Link href="/pricing" className="underline">
                $5 / 20 reply pack
              </Link>
              .
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
    data.quota?.plan === 'free' &&
    typeof data.quota?.used === 'number' &&
    typeof data.quota?.limit === 'number' &&
    typeof data.quota?.remaining === 'number'
  );
}
