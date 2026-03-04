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

type StrategyResult = {
  instant_reply: string;
  client_psychology: string;
  suggested_price_range: {
    ideal_price: number;
    negotiable_price: number;
    bottom_price: number;
  };
  scripts: {
    strong: string;
    warm: string;
    concession: string;
  };
  decision_logic: string[];
  risk_alerts: string[];
  next_actions: string[];
};

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
  const [result, setResult] = useState<StrategyResult | null>(null);

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

      setStrategyId(json.data.strategy_id);
      setLocked(Boolean(json.data.locked));
      setResult(json.data.strategy as StrategyResult);
      setFeedback({
        adopted_script: 'instant_reply',
        outcome: 'pending',
        rating: '',
        note: '',
      });
      toast.success(t('messages.generated'));
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

      setLocked(false);
      setNeedTopup(false);
      setResult(json.data.strategy as StrategyResult);
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
          </CardHeader>
          <CardContent className="space-y-6">
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
                <h3 className="font-semibold">{t('result.instant_reply')}</h3>
                <Button variant="outline" size="sm" onClick={() => copyText(result.instant_reply)}>
                  <Copy className="mr-1 h-4 w-4" />
                  {t('actions.copy')}
                </Button>
              </div>
              <div className="rounded-md border p-3 text-sm">{result.instant_reply}</div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold">{t('result.psychology')}</h3>
              <div className="rounded-md border p-3 text-sm">{result.client_psychology}</div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold">{t('result.price_range')}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-md border p-3 text-sm">
                  <div className="text-muted-foreground">{t('result.ideal_price')}</div>
                  <div className="text-lg font-semibold">{result.suggested_price_range.ideal_price}</div>
                </div>
                <div className="rounded-md border p-3 text-sm">
                  <div className="text-muted-foreground">{t('result.negotiable_price')}</div>
                  <div className="text-lg font-semibold">{result.suggested_price_range.negotiable_price}</div>
                </div>
                <div className="rounded-md border p-3 text-sm">
                  <div className="text-muted-foreground">{t('result.bottom_price')}</div>
                  <div className="text-lg font-semibold">{result.suggested_price_range.bottom_price}</div>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold">{t('result.scripts')}</h3>
              <div className="space-y-3">
                <div className="rounded-md border p-3 text-sm">
                  <div className="mb-1 font-medium">{t('result.script_strong')}</div>
                  {result.scripts.strong}
                </div>
                <div className="rounded-md border p-3 text-sm">
                  <div className="mb-1 font-medium">{t('result.script_warm')}</div>
                  {result.scripts.warm}
                </div>
                <div className="rounded-md border p-3 text-sm">
                  <div className="mb-1 font-medium">{t('result.script_concession')}</div>
                  {result.scripts.concession}
                </div>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 font-semibold">{t('result.logic')}</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {result.decision_logic.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">{t('result.risks')}</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {result.risk_alerts.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">{t('result.next_actions')}</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {result.next_actions.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
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
