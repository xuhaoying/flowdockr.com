import { Link } from '@/core/i18n/navigation';

const PRIMARY_LINKS = [
  { href: '/scenario', label: 'Scenario hub' },
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/signin', label: 'Sign in' },
];

const USE_CASE_LINKS = [
  { href: '/scenario/quote-too-high', label: 'Client says your quote is too high' },
  { href: '/scenario/discount-request', label: 'Client asks for a discount' },
  { href: '/scenario/extra-work-for-free', label: 'Client wants extra work for free' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/contact', label: 'Contact' },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Flowdockr</p>
          <p className="text-sm text-slate-600">
            Scenario-based negotiation system for freelancers and agencies.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Flowdockr is a product of Auralis Labs LLC.
          </p>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Product</p>
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Use cases</p>
          {USE_CASE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Legal</p>
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Flowdockr. All rights reserved.</p>
          <p>Flowdockr is a product of Auralis Labs LLC.</p>
        </div>
      </div>
    </footer>
  );
}
