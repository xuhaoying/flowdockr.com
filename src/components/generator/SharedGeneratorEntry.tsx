'use client';

import { useMemo, useState } from 'react';
import { ToolForm } from '@/components/tool/ToolForm';
import { trackEvent } from '@/lib/analytics';

import { Link } from '@/core/i18n/navigation';

type SharedGeneratorEntryProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  analyticsScenarioSlug?: string;
  funnelScenarioSlug?: string;
  defaultScenarioSlug?: string;
  initialMessage?: string;
  placeholder?: string;
  submitLabel?: string;
  workspaceTitle?: string;
  workspaceDescription?: string;
  prefillHint?: string;
  analyticsEvents?: {
    inputFocus?: string;
    generateClick?: string;
    generationCompleted?: string;
    replyCopied?: string;
    regenerateClicked?: string;
    toneVariationClicked?: string;
  };
  exampleShortcut?: {
    label: string;
    message: string;
  };
  quickLinks?: Array<{
    label: string;
    href: string;
  }>;
  relatedClickEventName?: string;
};

export function SharedGeneratorEntry({
  eyebrow,
  title,
  description,
  sourcePage,
  analyticsScenarioSlug,
  funnelScenarioSlug,
  defaultScenarioSlug,
  initialMessage = '',
  placeholder,
  submitLabel,
  workspaceTitle,
  workspaceDescription,
  prefillHint,
  analyticsEvents,
  exampleShortcut,
  quickLinks = [],
  relatedClickEventName,
}: SharedGeneratorEntryProps) {
  const [prefillMessage, setPrefillMessage] = useState(initialMessage);
  const formKey = useMemo(
    () =>
      `${defaultScenarioSlug || analyticsScenarioSlug || 'entry'}:${prefillMessage}`,
    [analyticsScenarioSlug, defaultScenarioSlug, prefillMessage]
  );

  return (
    <section className="space-y-4">
      {eyebrow || title || description ? (
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-brand-text text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-slate-700 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {exampleShortcut ? (
        <button
          type="button"
          className="border-brand-lavender/35 hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center rounded-full border bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition"
          onClick={() => setPrefillMessage(exampleShortcut.message)}
        >
          {exampleShortcut.label}
        </button>
      ) : null}

      <ToolForm
        key={formKey}
        analyticsScenarioSlug={analyticsScenarioSlug}
        funnelScenarioSlug={funnelScenarioSlug}
        defaultScenarioSlug={defaultScenarioSlug}
        initialMessage={prefillMessage}
        placeholder={placeholder}
        submitLabel={submitLabel}
        workspaceTitle={workspaceTitle}
        workspaceDescription={workspaceDescription}
        prefillHint={prefillHint}
        sourcePage={sourcePage}
        analyticsEvents={analyticsEvents}
      />

      {quickLinks.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-brand-lavender/35 hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center rounded-full border bg-white px-3 py-1.5 text-slate-700 transition"
              onClick={() => {
                if (!relatedClickEventName) {
                  return;
                }

                trackEvent(relatedClickEventName, {
                  href: item.href,
                  label: item.label,
                });
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
