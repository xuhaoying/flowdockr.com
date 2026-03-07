import { Link } from '@/core/i18n/navigation';

const PRIMARY_LINKS = [
  { href: '/scenarios', label: 'Scenarios' },
  { href: '/tool', label: 'Tool' },
  { href: '/pricing', label: 'Pricing' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Flowdockr</p>
          <p className="text-sm text-slate-600">
            Scenario-first negotiation reply tool for freelancers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600">
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
