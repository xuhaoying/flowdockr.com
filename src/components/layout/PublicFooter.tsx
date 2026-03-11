import { Link } from '@/core/i18n/navigation';

const PRIMARY_LINKS = [
  { href: '/pricing', label: 'Pricing scenarios' },
  { href: '/guides', label: 'Guides' },
  { href: '/tools', label: 'Tools' },
  { href: '/pricing#pricing-cards', label: 'Pricing' },
  { href: '/signin', label: 'Sign in' },
];

const USE_CASE_LINKS = [
  { href: '/pricing/price-pushback-after-proposal', label: 'Price pushback after proposal' },
  { href: '/pricing/discount-pressure-before-signing', label: 'Discount pressure before signing' },
  { href: '/pricing/more-work-same-price', label: 'More work for the same price' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
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
    </footer>
  );
}
