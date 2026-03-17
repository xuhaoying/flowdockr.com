'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
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
import { Textarea } from '@/shared/components/ui/textarea';

type GenerateResponse = {
  instant_reply: string;
  strategy: {
    label: string;
    why: string;
  };
  price_range: {
    ideal: number;
    negotiable: number;
    bottom: number;
    currency: 'USD';
  };
  safety_checks: {
    min_price_respected: boolean;
    no_discount_promise: boolean;
  };
};

type FormState = {
  client_message: string;
  your_quote: string;
  your_min_price: string;
};

const MAX_PRICE = 1_000_000;
const COPY_TIMEOUT_MS = 1500;

const INITIAL_FORM: FormState = {
  client_message: '',
  your_quote: '',
  your_min_price: '',
};

export function FlowDockrLandingContent() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const messageLength = form.client_message.trim().length;

  const validationMessage = useMemo(() => {
    const quote = Number(form.your_quote);
    const minPrice = Number(form.your_min_price);

    if (messageLength < 10) return 'Client message must be at least 10 characters.';
    if (messageLength > 800) return 'Client message must be 800 characters or fewer.';

    if (!Number.isFinite(quote) || quote <= 0) {
      return 'Your quote must be a number greater than 0.';
    }
    if (!Number.isFinite(minPrice) || minPrice <= 0) {
      return 'Your minimum price must be a number greater than 0.';
    }
    if (quote > MAX_PRICE || minPrice > MAX_PRICE) {
      return `Quote and minimum must be <= ${MAX_PRICE.toLocaleString('en-US')}.`;
    }
    if (minPrice > quote) {
      return 'Your minimum price must be less than or equal to your quote.';
    }

    return '';
  }, [form.your_min_price, form.your_quote, messageLength]);

  const canSubmit = !loading && !validationMessage;

  const onFieldChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onGenerate = async () => {
    if (validationMessage) {
      setError(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_message: form.client_message.trim(),
          your_quote: Number(form.your_quote),
          your_min_price: Number(form.your_min_price),
        }),
      });

      const payload = (await response.json()) as Partial<GenerateResponse> & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to generate a response. Please retry.');
      }

      if (!isGenerateResponse(payload)) {
        throw new Error('Invalid response shape. Please retry.');
      }

      setResult(payload);
      toast.success('Reply generated.');
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Failed to generate a response. Please retry.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    if (!result?.instant_reply) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result.instant_reply);
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
    <main className="mx-auto flex w-full max-w-[720px] flex-col gap-6 px-4 py-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Flowdockr</h1>
        <p className="text-base text-muted-foreground">
          Paste a client&apos;s message. Get a professional reply in seconds.
        </p>
        <p className="text-xs text-muted-foreground">
          This is not legal advice. Use your judgment.
        </p>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-4 w-4" />
              Negotiation Copilot
            </CardTitle>
            <CardDescription>
              Add the client message, your quote, and your minimum acceptable price.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client_message">Client message</Label>
              <Textarea
                id="client_message"
                value={form.client_message}
                onChange={(e) => onFieldChange('client_message', e.target.value)}
                placeholder="Paste the client message here..."
                rows={8}
                maxLength={800}
              />
              <p className="text-xs text-muted-foreground">{messageLength}/800</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="your_quote">Your quote (USD)</Label>
                <Input
                  id="your_quote"
                  type="number"
                  min="1"
                  max={String(MAX_PRICE)}
                  value={form.your_quote}
                  onChange={(e) => onFieldChange('your_quote', e.target.value)}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="your_min_price">Your minimum price (USD)</Label>
                <Input
                  id="your_min_price"
                  type="number"
                  min="1"
                  max={String(MAX_PRICE)}
                  value={form.your_min_price}
                  onChange={(e) => onFieldChange('your_min_price', e.target.value)}
                  placeholder="300"
                />
              </div>
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
      </section>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <section>
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>Instant reply</CardTitle>
              <CardDescription>Copy and paste this directly to your client.</CardDescription>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCopy}
              disabled={!result?.instant_reply}
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md border bg-muted/40 p-4 text-sm leading-relaxed">
              {result?.instant_reply ||
                'Your generated reply will appear here after you click Generate reply.'}
            </div>

            {result ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="strategy">
                  <AccordionTrigger>Strategy</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Label:</span> {result.strategy.label}
                      </p>
                      <p>
                        <span className="font-medium">Why:</span> {result.strategy.why}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price-range">
                  <AccordionTrigger>Price range</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      <p>
                        <span className="font-medium">Ideal:</span>{' '}
                        {formatUsd(result.price_range.ideal)}
                      </p>
                      <p>
                        <span className="font-medium">Negotiable:</span>{' '}
                        {formatUsd(result.price_range.negotiable)}
                      </p>
                      <p>
                        <span className="font-medium">Bottom:</span>{' '}
                        {formatUsd(result.price_range.bottom)}
                      </p>
                      <p>
                        <span className="font-medium">Currency:</span> {result.price_range.currency}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <footer className="flex flex-wrap items-center gap-4 border-t pt-5 text-sm text-muted-foreground">
        <Link href="/privacy" className="hover:text-foreground">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-foreground">
          Terms
        </Link>
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
      </footer>
    </main>
  );
}

function formatUsd(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function isGenerateResponse(value: unknown): value is GenerateResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const data = value as Partial<GenerateResponse>;

  return (
    typeof data.instant_reply === 'string' &&
    typeof data.strategy?.label === 'string' &&
    typeof data.strategy?.why === 'string' &&
    typeof data.price_range?.ideal === 'number' &&
    typeof data.price_range?.negotiable === 'number' &&
    typeof data.price_range?.bottom === 'number' &&
    data.price_range?.currency === 'USD' &&
    typeof data.safety_checks?.min_price_respected === 'boolean' &&
    typeof data.safety_checks?.no_discount_promise === 'boolean'
  );
}
