'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type ScopePolicyOutput = {
  revision_policy: string;
  scope_rule: string;
  client_message: string;
  contract_clause: string;
};

type Usage = {
  limit: number | null;
  used: number;
  remaining: number | null;
  is_paid: boolean;
};

type FormState = {
  project_type: string;
  project_price: string;
  revision_count: string;
  client_type: string;
};

const PROJECT_TYPE_OPTIONS = [
  'logo',
  'website',
  'video',
  'writing',
  'marketing',
  'other',
];
const CLIENT_TYPE_OPTIONS = [
  'startup',
  'small_business',
  'agency',
  'enterprise',
];
const REVISION_OPTIONS = ['1', '2', '3', '4', '5'];
const FORM_STORAGE_KEY = 'flowdockr_scope_form_v1';
const COPY_FEEDBACK_MS = 1400;

const DEFAULT_FORM: FormState = {
  project_type: '',
  project_price: '',
  revision_count: '3',
  client_type: '',
};

export function ScopePolicyGenerator() {
  const t = useTranslations('pages.scope.scope_guard');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScopePolicyOutput | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const copyTimerRef = useRef<number | null>(null);
  const resultAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const savedRaw = window.localStorage.getItem(FORM_STORAGE_KEY);
      if (!savedRaw) {
        return;
      }

      const saved = JSON.parse(savedRaw) as Partial<FormState>;
      setForm({
        project_type: String(saved.project_type || ''),
        project_price: String(saved.project_price || ''),
        revision_count: REVISION_OPTIONS.includes(String(saved.revision_count))
          ? String(saved.revision_count)
          : DEFAULT_FORM.revision_count,
        client_type: String(saved.client_type || ''),
      });
    } catch {
      // Ignore malformed local storage data and continue with defaults.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore local storage persistence errors.
    }
  }, [form]);

  useEffect(() => {
    if (!result || !resultAnchorRef.current) {
      return;
    }
    resultAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [result]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const canSubmit = useMemo(() => {
    return (
      Boolean(form.project_type) &&
      Boolean(form.client_type) &&
      Number(form.project_price) > 0 &&
      Number(form.revision_count) >= 1 &&
      Number(form.revision_count) <= 5
    );
  }, [form]);

  const setField = (key: keyof FormState, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('scope_form_started');
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setCopyFeedback = (target: string) => {
    setCopiedTarget(target);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedTarget((current) => (current === target ? null : current));
      copyTimerRef.current = null;
    }, COPY_FEEDBACK_MS);
  };

  const copyText = async (text: string, target: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(target);
      trackEvent('scope_block_copied', { block: target });
      toast.success(t('messages.copied'));
    } catch {
      toast.error(t('errors.copy_failed'));
    }
  };

  const copyAll = async () => {
    if (!result) return;

    const all = [
      `${t('result.revision_policy')}:\n${result.revision_policy}`,
      `${t('result.scope_rule')}:\n${result.scope_rule}`,
      `${t('result.client_message')}:\n${result.client_message}`,
      `${t('result.contract_clause')}:\n${result.contract_clause}`,
    ].join('\n\n');

    await copyText(all, 'all');
  };

  const onSubmit = async () => {
    if (!canSubmit) {
      toast.error(t('errors.invalid_input'));
      return;
    }

    setLoading(true);
    setLimitReached(false);
    try {
      const response = await fetch('/api/generate-scope-policy', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          project_type: form.project_type,
          project_price: Number(form.project_price),
          revision_count: Number(form.revision_count),
          client_type: form.client_type,
        }),
      });

      const json = await response.json();
      if (json.code !== 0) {
        setLimitReached(Boolean(json?.data?.upgrade_required));
        if (json?.data?.usage) {
          setUsage(json.data.usage as Usage);
        }
        throw new Error(json.message || t('errors.request_failed'));
      }

      setResult(json.data.output as ScopePolicyOutput);
      setUsage(json.data.usage as Usage);
      trackEvent('scope_output_generated', {
        project_type: form.project_type,
        revision_count: Number(form.revision_count),
      });
      toast.success(t('messages.generated'));
    } catch (e: any) {
      toast.error(e?.message || t('errors.request_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="scope-generator" className="py-12 md:py-16">
      <div className="container max-w-4xl">
        <Card className="rounded-[14px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-5 w-5" />
              {t('title')}
            </CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm font-medium text-muted-foreground">
              {t('steps.describe')}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t('fields.project_type')}</Label>
                <Select
                  value={form.project_type}
                  onValueChange={(v) => setField('project_type', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.project_type_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPE_OPTIONS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`options.project_type.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('fields.project_price')}</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.project_price}
                  onChange={(e) => setField('project_price', e.target.value)}
                  placeholder={t('fields.project_price_placeholder')}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('fields.revision_count')}</Label>
                <Select
                  value={form.revision_count}
                  onValueChange={(v) => setField('revision_count', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.revision_count_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {REVISION_OPTIONS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>{t('fields.client_type')}</Label>
                <Select
                  value={form.client_type}
                  onValueChange={(v) => setField('client_type', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('fields.client_type_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {CLIENT_TYPE_OPTIONS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`options.client_type.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className="w-full sm:w-fit"
                onClick={onSubmit}
                disabled={loading || !canSubmit}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('actions.generating')}
                  </>
                ) : (
                  t('actions.generate')
                )}
              </Button>
              {usage ? (
                <p className="text-sm text-muted-foreground">
                  {usage.is_paid
                    ? t('usage.paid')
                    : t('usage.free_left', {
                        remaining: usage.remaining ?? 0,
                        limit: usage.limit ?? 0,
                      })}
                </p>
              ) : null}
            </div>

            {limitReached ? (
              <div className="rounded-md border border-dashed p-4 text-sm">
                <p className="mb-3">{t('usage.limit_reached')}</p>
                <Button asChild className="w-full sm:w-fit">
                  <Link
                    href="/pricing"
                    onClick={() => trackEvent('scope_upgrade_clicked')}
                  >
                    {t('actions.upgrade')}
                  </Link>
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {result ? (
          <div ref={resultAnchorRef} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('result.title')}</CardTitle>
                <CardDescription>{t('result.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm font-medium text-muted-foreground">
                  {t('steps.copy')}
                </p>

                <div className="flex justify-start sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAll}
                    className={
                      copiedTarget === 'all'
                        ? 'border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10'
                        : ''
                    }
                  >
                    {copiedTarget === 'all' ? (
                      <Check className="mr-1 h-4 w-4" />
                    ) : (
                      <Copy className="mr-1 h-4 w-4" />
                    )}
                    {copiedTarget === 'all'
                      ? t('actions.copied')
                      : t('actions.copy_all')}
                  </Button>
                </div>

                <OutputBlock
                  title={t('result.revision_policy')}
                  value={result.revision_policy}
                  onCopy={() =>
                    copyText(result.revision_policy, 'revision_policy')
                  }
                  copyLabel={t('actions.copy')}
                  copiedLabel={t('actions.copied')}
                  isCopied={copiedTarget === 'revision_policy'}
                />
                <OutputBlock
                  title={t('result.scope_rule')}
                  value={result.scope_rule}
                  onCopy={() => copyText(result.scope_rule, 'scope_rule')}
                  copyLabel={t('actions.copy')}
                  copiedLabel={t('actions.copied')}
                  isCopied={copiedTarget === 'scope_rule'}
                />
                <OutputBlock
                  title={t('result.client_message')}
                  value={result.client_message}
                  onCopy={() =>
                    copyText(result.client_message, 'client_message')
                  }
                  copyLabel={t('actions.copy')}
                  copiedLabel={t('actions.copied')}
                  isCopied={copiedTarget === 'client_message'}
                />
                <OutputBlock
                  title={t('result.contract_clause')}
                  value={result.contract_clause}
                  onCopy={() =>
                    copyText(result.contract_clause, 'contract_clause')
                  }
                  copyLabel={t('actions.copy')}
                  copiedLabel={t('actions.copied')}
                  isCopied={copiedTarget === 'contract_clause'}
                />
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return;
  }

  const dataLayer = (window as any).dataLayer;
  if (!Array.isArray(dataLayer)) {
    return;
  }

  dataLayer.push({
    event,
    ...(payload || {}),
  });
}

function OutputBlock({
  title,
  value,
  onCopy,
  copyLabel,
  copiedLabel,
  isCopied,
}: {
  title: string;
  value: string;
  onCopy: () => Promise<void>;
  copyLabel: string;
  copiedLabel: string;
  isCopied: boolean;
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void onCopy()}
          className={
            isCopied
              ? 'border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10'
              : ''
          }
        >
          {isCopied ? (
            <Check className="mr-1 h-4 w-4" />
          ) : (
            <Copy className="mr-1 h-4 w-4" />
          )}
          {isCopied ? copiedLabel : copyLabel}
        </Button>
      </div>
      <div className="rounded-md border p-3 text-sm whitespace-pre-wrap">
        {value}
      </div>
    </section>
  );
}
