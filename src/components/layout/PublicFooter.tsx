import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';

const PRIMARY_LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/scenario', label: 'Scenario hub' },
  { href: '/tools', label: 'Tools' },
];

const USE_CASE_LINKS = [
  {
    href: '/scenario/quote-too-high',
    label: 'Client says your quote is too high',
  },
  { href: '/scenario/discount-request', label: 'Client asks for a discount' },
  {
    href: '/scenario/extra-work-for-free',
    label: 'Client wants extra work for free',
  },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/refund', label: 'Refund Policy' },
  { href: '/compliance', label: 'Business Compliance' },
  { href: '/contact', label: 'Contact' },
];

export function PublicFooter() {
  return (
    <footer className="border-brand-lavender/25 border-t bg-white/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <Image
            src="/logo.svg"
            alt="FlowDockr"
            width={162}
            height={36}
            className="h-9 w-auto"
          />
          <p className="text-sm text-slate-600">
            AI negotiation assistant for professionals preparing for difficult
            conversations, pricing pushback, and client decisions.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            FlowDockr is a product of Auralis Labs LLC.
          </p>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Digital SaaS only. Not legal, tax, investment, financial, debt
            settlement, lending, banking, or money transmission services.
          </p>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="text-brand-text font-semibold">Product</p>
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-primary block"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="text-brand-text font-semibold">Use cases</p>
          {USE_CASE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-primary block"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="text-brand-text font-semibold">Legal</p>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-primary block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-brand-lavender/25 border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Auralis Labs LLC. All rights reserved.</p>
          <p>FlowDockr is a product of Auralis Labs LLC.</p>
        </div>
      </div>
    </footer>
  );
}
