import { CopyButton } from '@/components/tool/CopyButton';
import {
  ArrowRight,
  BadgeDollarSign,
  Mail,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

const TEMPLATE_GROUPS = [
  {
    title: 'Payment templates',
    description:
      'Ask for payment, follow up on overdue invoices, and keep payment timing clear.',
    icon: BadgeDollarSign,
    links: [
      {
        href: '/scenario/ask-for-payment-politely',
        label: 'Ask for payment politely',
      },
      {
        href: '/scenario/overdue-invoice-no-response',
        label: 'Overdue invoice follow-up',
      },
      {
        href: '/scenario/start-before-payment',
        label: 'Payment before starting work',
      },
    ],
  },
  {
    title: 'Scope creep templates',
    description:
      'Say work is out of scope, handle unpaid extras, and keep changes explicit.',
    icon: ShieldCheck,
    links: [
      {
        href: '/scenario/out-of-scope-professionally',
        label: 'Say work is out of scope',
      },
      {
        href: '/scenario/extra-work-for-free',
        label: 'Say no to extra work for free',
      },
      {
        href: '/guides/reduce-scope-instead-of-lowering-rate',
        label: 'Reduce scope instead of lowering rate',
      },
    ],
  },
  {
    title: 'Discount request templates',
    description:
      'Respond to price pressure without weakening your value or the relationship.',
    icon: MessageSquare,
    links: [
      {
        href: '/scenario/discount-request',
        label: 'Respond to discount requests',
      },
      {
        href: '/scenario/quote-too-high',
        label: 'Client says your quote is too high',
      },
      {
        href: '/scenario/found-someone-cheaper',
        label: 'Client found someone cheaper',
      },
    ],
  },
  {
    title: 'Follow-up and boundary templates',
    description:
      'Nudge stalled conversations and set expectations without sounding pushy.',
    icon: Mail,
    links: [
      {
        href: '/scenario/no-response-after-proposal',
        label: 'No response after proposal',
      },
      {
        href: '/scenario/client-no-response-follow-up',
        label: 'Client no-response follow-up',
      },
      {
        href: '/scenario/scope-creep-polite-response',
        label: 'Scope creep polite response',
      },
    ],
  },
] as const;

const TONE_GROUPS = [
  'Friendly payment reminder',
  'Professional boundary-setting',
  'Firm overdue invoice follow-up',
  'Warm discount response',
  'Direct scope clarification',
] as const;

const FEATURED_TEMPLATES = [
  {
    title: 'Friendly payment reminder',
    bestFor: 'A payment is due or slightly late and you want to stay warm.',
    href: '/scenario/ask-for-payment-politely',
    text: 'Hi [Name], just following up on invoice #[number], which was due on [date]. Could you confirm whether payment is scheduled on your side? Happy to resend the invoice if helpful.',
  },
  {
    title: 'Firm overdue invoice follow-up',
    bestFor: 'The invoice is overdue and the client has not replied.',
    href: '/scenario/overdue-invoice-no-response',
    text: 'Hi [Name], I am following up again on invoice #[number], which is now overdue. Could you please confirm the payment date or let me know if anything is blocking payment on your side?',
  },
  {
    title: 'Out-of-scope boundary',
    bestFor: 'A client asks for extra work that was not included.',
    href: '/scenario/out-of-scope-professionally',
    text: 'Thanks for sending this over. This request goes beyond the scope we agreed for the current project, so I would need to treat it as additional work. I can quote it separately or help prioritize what fits within the existing scope.',
  },
  {
    title: 'Discount request response',
    bestFor:
      'A client asks for a lower price and you want to avoid a blind discount.',
    href: '/scenario/discount-request',
    text: 'I understand the budget concern. The current price reflects the scope and level of support included, so I would not want to reduce the fee without changing the work. If helpful, I can suggest a smaller version that fits a lower budget.',
  },
] as const;

export const generateMetadata = getMetadata({
  title:
    'Client Communication Templates for Freelancers and Consultants | FlowDockr',
  description:
    'Copy professional email templates for asking for payment, handling scope creep, replying to discount requests, following up, and setting boundaries with clients.',
  canonicalUrl: '/client-communication-templates',
  keywords:
    'client communication templates, freelancer email templates, payment reminder templates, scope creep email templates, discount request response',
});

export default async function ClientCommunicationTemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-12">
      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div className="max-w-3xl space-y-5">
          <p className="border-brand-lavender/40 text-brand-primary inline-flex rounded-full border bg-white px-2.5 py-1 text-xs font-medium shadow-xs">
            Client communication templates
          </p>
          <h1 className="text-brand-text text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Client Communication Templates for Freelancers and Consultants
          </h1>
          <p className="text-base leading-7 text-slate-700 md:text-lg">
            Copy professional email templates for asking for payment, handling
            scope creep, replying to discount requests, following up, and
            setting boundaries with clients.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/reply-generator"
              className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-linear-to-r px-5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              Generate a custom reply
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/scenario"
              className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex min-h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-medium shadow-xs transition-colors"
            >
              Browse all scenarios
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Templates by tone
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TONE_GROUPS.map((tone) => (
              <span
                key={tone}
                className="border-brand-lavender/30 bg-brand-bg/70 rounded-full border px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {tone}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 md:p-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Copy-ready templates
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Copy a professional message now
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            Start with one of these common client messages, then replace the
            placeholders before sending.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {FEATURED_TEMPLATES.map((template) => (
            <article
              key={template.title}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {template.title}
                  </h3>
                  <p className="text-xs leading-5 text-slate-600">
                    {template.bestFor}
                  </p>
                </div>
                <CopyButton
                  value={template.text}
                  idleLabel="Copy"
                  copiedLabel="Copied"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                {template.text}
              </p>
              <Link
                href={template.href}
                className="text-brand-primary mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-2"
              >
                Open full scenario
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {TEMPLATE_GROUPS.map((group) => {
          const Icon = group.icon;

          return (
            <article
              key={group.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
            >
              <div className="flex items-start gap-3">
                <span className="border-brand-lavender/35 bg-brand-bg text-brand-primary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <Icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                    {group.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-700">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:border-brand-primary/45 hover:bg-brand-bg/50 flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="size-4 shrink-0 text-slate-500" />
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 md:p-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Paste the real message when a template is not enough
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            Templates are fastest when the situation matches. For unusual client
            context, paste the thread into the reply generator and tune the tone
            before sending.
          </p>
        </div>
        <Link
          href="/tools/reply-generator"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Open reply generator
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </section>
    </main>
  );
}
