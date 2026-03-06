'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { useRouter } from '@/core/i18n/navigation';
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
import { useAppContext } from '@/shared/contexts/app';
import {
  DealContractResult,
  DealFallbackReason,
  isDealContractResult,
} from '@/shared/types/deal-contract';

type GenerationMode = 'ai' | 'rules';

function i18nText(locale: string, text: { en: string; zh: string; es: string }) {
  if (locale.startsWith('zh')) return text.zh;
  if (locale.startsWith('es')) return text.es;
  return text.en;
}

function formatPrice(value: number | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '-';
  }
  return String(value);
}

function fallbackNotice(locale: string, reason?: DealFallbackReason): string | null {
  if (!reason || reason === 'missing_api_key') return null;

  if (reason === 'parse_failed') {
    return i18nText(locale, {
      en: 'Model output parsing failed. Showing safe fallback strategy. Refine context for a better result.',
      zh: '模型输出解析失败，已展示安全兜底策略。建议补充更具体上下文后重试。',
      es: 'Fallo al parsear la salida del modelo. Mostrando estrategia de respaldo segura.',
    });
  }

  if (reason === 'upstream_error') {
    return i18nText(locale, {
      en: 'AI model is temporarily unavailable. Showing rules fallback.',
      zh: 'AI 模型暂时不可用，当前展示规则兜底结果。',
      es: 'El modelo de AI no está disponible temporalmente. Se muestra fallback por reglas.',
    });
  }

  return i18nText(locale, {
    en: 'Using fallback strategy due to generation issue.',
    zh: '因生成异常，当前展示兜底策略。',
    es: 'Usando estrategia de respaldo por un problema de generación.',
  });
}

export function DealStrategyGenerator() {
  const t = useTranslations('pages.create.deal_strategy');
  const locale = useLocale();
  const router = useRouter();
  const {
    user,
    setIsShowSignModal,
    fetchUserCredits,
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [needTopup, setNeedTopup] = useState(false);

  const [strategyId, setStrategyId] = useState<string>('');
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState<DealContractResult | null>(null);
  const [generationMode, setGenerationMode] = useState<GenerationMode>('rules');
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  const [form, setForm] = useState({
    client_need: '',
    your_quote: '',
    client_objection: '',
    your_floor_price: '',
  });

  const [feedback, setFeedback] = useState({
    adopted_script: 'instant_reply',
    outcome: 'pending',
    rating: '',
    note: '',
  });

  useEffect(() => {
    if (user && !user.credits) {
      fetchUserCredits();
    }
  }, [user, fetchUserCredits]);

  const canSubmit = useMemo(() => {
    return (
      form.client_need.trim().length > 0 &&
      form.client_objection.trim().length > 0 &&
      Number(form.your_quote) > 0 &&
      Number(form.your_floor_price) > 0
    );
  }, [form]);

  const onChange = (k: keyof typeof form, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const onSubmit = async () => {
    if (!user) {
      setIsShowSignModal(true);
      toast.error(t('errors.sign_in_required'));
      return;
    }

    if (!canSubmit) {
      toast.error(t('errors.invalid_input'));
      return;
    }

    setLoading(true);
    setNeedTopup(false);
    setGenerationNotice(null);
    try {
      const resp = await fetch('/api/deal-strategy/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          your_quote: Number(form.your_quote),
          your_floor_price: Number(form.your_floor_price),
          locale,
        }),
      });

      const json = await resp.json();
      if (json.code !== 0) {
        throw new Error(json.message || t('errors.request_failed'));
      }

      if (!isDealContractResult(json?.data?.strategy)) {
        throw new Error(
          i18nText(locale, {
            en: 'Result format mismatch. Please retry with clearer deal context.',
            zh: '结果格式不匹配，请补充更清晰的谈单上下文后重试。',
            es: 'Formato de salida inválido. Intenta de nuevo con más contexto.',
          })
        );
      }

      const notice = fallbackNotice(locale, json?.data?.fallback_reason);

      setStrategyId(String(json.data.strategy_id || ''));
      setLocked(Boolean(json.data.locked));
      setResult(json.data.strategy);
      setGenerationMode(json.data.generation_mode === 'ai' ? 'ai' : 'rules');
      setGenerationNotice(notice);
      setFeedback({
        adopted_script: 'instant_reply',
        outcome: 'pending',
        rating: '',
        note: '',
      });

      if (notice) {
        toast.warning(notice);
      } else {
        toast.success(t('messages.generated'));
      }
    } catch (e: any) {
      toast.error(e?.message || t('errors.request_failed'));
    } finally {
      setLoading(false);
    }
  };

  const onUnlock = async () => {
    if (!user) {
      setIsShowSignModal(true);
      toast.error(t('errors.sign_in_required'));
      return;
    }

    if (!strategyId) {
      toast.error(t('errors.unlock_failed'));
      return;
    }

    setUnlocking(true);
    try {
      const resp = await fetch('/api/deal-strategy/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ strategy_id: strategyId }),
      });

      const json = await resp.json();
      if (json.code !== 0) {
        const message = String(json.message || '');
        if (message.includes('insufficient credits')) {
          setNeedTopup(true);
          throw new Error(t('errors.insufficient_credits'));
        }

        throw new Error(message || t('errors.unlock_failed'));
      }

      if (!isDealContractResult(json?.data?.strategy)) {
        throw new Error(
          i18nText(locale, {
            en: 'Unlocked output format mismatch. Please generate again.',
            zh: '解锁结果格式异常，请重新生成。',
            es: 'Formato inválido tras desbloquear. Vuelve a generar.',
          })
        );
      }

      setLocked(false);
      setNeedTopup(false);
      setGenerationNotice(null);
      setResult(json.data.strategy);
      setGenerationMode(json.data.generation_mode === 'ai' ? 'ai' : 'rules');
      await fetchUserCredits();
      toast.success(t('messages.unlocked'));
    } catch (e: any) {
      toast.error(e?.message || t('errors.unlock_failed'));
    } finally {
      setUnlocking(false);
    }
  };

  const onSubmitFeedback = async () => {
    if (!strategyId || locked) {
      toast.error(t('errors.feedback_failed'));
      return;
    }

    setSubmittingFeedback(true);
    try {
      const ratingNumber = Number(feedback.rating);
      const payload: Record<string, any> = {
        strategy_id: strategyId,
        adopted_script: feedback.adopted_script,
        outcome: feedback.outcome,
        note: feedback.note,
      };

      if (Number.isFinite(ratingNumber) && ratingNumber >= 1 && ratingNumber <= 5) {
        payload.rating = ratingNumber;
      }

      const resp = await fetch('/api/deal-strategy/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await resp.json();
      if (json.code !== 0) {
        throw new Error(json.message || t('errors.feedback_failed'));
      }

      toast.success(t('messages.feedback_saved'));
    } catch (e: any) {
      toast.error(e?.message || t('errors.feedback_failed'));
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t('messages.copied'));
    } catch {
      toast.error(t('errors.copy_failed'));
    }
  };

  const modeTitle = i18nText(locale, {
    en: 'Generation mode',
    zh: '生成模式',
    es: 'Modo de generación',
  });
  const modeValue = generationMode === 'ai' ? 'AI' : 'Rules fallback';

  const cardLabels = {
    instantReply: i18nText(locale, {
      en: 'Instant Reply',
      zh: '立即回复',
      es: 'Respuesta instantánea',
    }),
    clientAnalysis: i18nText(locale, {
      en: 'Client Analysis',
      zh: '客户分析',
      es: 'Análisis del cliente',
    }),
    pricePlan: i18nText(locale, {
      en: 'Price Plan',
      zh: '价格方案',
      es: 'Plan de precio',
    }),
    strategy: i18nText(locale, {
      en: 'Strategy',
      zh: '策略',
      es: 'Estrategia',
    }),
    risk: i18nText(locale, {
      en: 'Risk',
      zh: '风险',
      es: 'Riesgo',
    }),
    nextMove: i18nText(locale, {
      en: 'Next Move',
      zh: '下一步',
      es: 'Siguiente paso',
    }),
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-12 pt-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {t('credits_remaining', { credits: user?.credits?.remainingCredits ?? '-' })}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>{t('fields.client_need')}</Label>
              <Textarea
                value={form.client_need}
                onChange={(e) => onChange('client_need', e.target.value)}
                placeholder={t('fields.client_need_placeholder')}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('fields.your_quote')}</Label>
              <Input
                type="number"
                value={form.your_quote}
                onChange={(e) => onChange('your_quote', e.target.value)}
                placeholder={t('fields.your_quote_placeholder')}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('fields.your_floor_price')}</Label>
              <Input
                type="number"
                value={form.your_floor_price}
                onChange={(e) => onChange('your_floor_price', e.target.value)}
                placeholder={t('fields.your_floor_price_placeholder')}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>{t('fields.client_objection')}</Label>
              <Textarea
                value={form.client_objection}
                onChange={(e) => onChange('client_objection', e.target.value)}
                placeholder={t('fields.client_objection_placeholder')}
                rows={3}
              />
            </div>
          </div>

          <Button onClick={onSubmit} disabled={!canSubmit || loading} className="w-full md:w-auto">
            {loading ? t('actions.generating') : t('actions.generate')}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{t('result.title')}</CardTitle>
            <CardDescription>{t('result.subtitle')}</CardDescription>
            <div className="text-sm text-muted-foreground">
              {modeTitle}: <span className="font-medium">{modeValue}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {generationNotice && (
              <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                {generationNotice}
              </div>
            )}

            {locked && (
              <div className="rounded-md border border-dashed p-4 text-sm">
                <p className="mb-3">{t('paywall.description')}</p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={onUnlock} disabled={unlocking}>
                    {unlocking ? t('actions.unlocking') : t('actions.unlock')}
                  </Button>
                  {needTopup && (
                    <Button variant="outline" onClick={() => router.push('/pricing')}>
                      {t('actions.buy_credits')}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{cardLabels.instantReply}</h3>
                <Button variant="outline" size="sm" onClick={() => copyText(result.instant_reply)}>
                  <Copy className="mr-1 h-4 w-4" />
                  {t('actions.copy')}
                </Button>
              </div>
              <div className="rounded-md border p-3 text-sm">{result.instant_reply}</div>
            </section>

            <section className="grid gap-3 md:grid-cols-2">
              <article className="rounded-md border p-3 text-sm">
                <h3 className="mb-2 font-semibold">{cardLabels.clientAnalysis}</h3>
                <div className="space-y-1 text-muted-foreground">
                  <div>intent: {result.client_analysis.intent}</div>
                  <div>leverage_level: {result.client_analysis.leverage_level}</div>
                  <div className="pt-1">signals:</div>
                  <ul className="list-disc space-y-1 pl-5">
                    {result.client_analysis.signals.map((signal, idx) => (
                      <li key={idx}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="rounded-md border p-3 text-sm">
                <h3 className="mb-2 font-semibold">{cardLabels.pricePlan}</h3>
                <div className="space-y-1 text-muted-foreground">
                  <div>anchor_price: {formatPrice(result.price_plan.anchor_price)}</div>
                  <div>negotiable_price: {formatPrice(result.price_plan.negotiable_price)}</div>
                  <div>floor_price: {formatPrice(result.price_plan.floor_price)}</div>
                  <div className="pt-1">rationale: {result.price_plan.rationale}</div>
                </div>
              </article>

              <article className="rounded-md border p-3 text-sm">
                <h3 className="mb-2 font-semibold">{cardLabels.strategy}</h3>
                <div className="space-y-1 text-muted-foreground">
                  <div>approach: {result.strategy.approach}</div>
                  <div className="pt-1">concession_steps:</div>
                  <ul className="list-disc space-y-1 pl-5">
                    {result.strategy.concession_steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="rounded-md border p-3 text-sm">
                <h3 className="mb-2 font-semibold">{cardLabels.risk}</h3>
                <div className="space-y-1 text-muted-foreground">
                  <div>deal_risk: {result.risk.deal_risk}</div>
                  <div>ghosting_probability: {result.risk.ghosting_probability}</div>
                  <div className="pt-1">red_flags:</div>
                  <ul className="list-disc space-y-1 pl-5">
                    {result.risk.red_flags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            <section className="rounded-md border p-3 text-sm">
              <h3 className="mb-2 font-semibold">{cardLabels.nextMove}</h3>
              <div className="text-muted-foreground">{result.next_move}</div>
            </section>

            {!locked && (
              <section className="space-y-3 rounded-md border p-4">
                <h3 className="font-semibold">{t('feedback.title')}</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('feedback.adopted_script')}</Label>
                    <select
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      value={feedback.adopted_script}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          adopted_script: e.target.value,
                        }))
                      }
                    >
                      <option value="instant_reply">{t('feedback.script_instant')}</option>
                      <option value="strong">{t('feedback.script_strong')}</option>
                      <option value="warm">{t('feedback.script_warm')}</option>
                      <option value="concession">{t('feedback.script_concession')}</option>
                      <option value="none">{t('feedback.script_none')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('feedback.outcome')}</Label>
                    <select
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      value={feedback.outcome}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          outcome: e.target.value,
                        }))
                      }
                    >
                      <option value="pending">{t('feedback.outcome_pending')}</option>
                      <option value="won">{t('feedback.outcome_won')}</option>
                      <option value="lost">{t('feedback.outcome_lost')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('feedback.rating_optional')}</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1-5"
                      value={feedback.rating}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          rating: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>{t('feedback.note_optional')}</Label>
                    <Textarea
                      rows={2}
                      value={feedback.note}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          note: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={onSubmitFeedback} disabled={submittingFeedback}>
                  {submittingFeedback ? t('actions.saving') : t('actions.save_feedback')}
                </Button>
              </section>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

