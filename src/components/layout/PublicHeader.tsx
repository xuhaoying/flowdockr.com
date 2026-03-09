'use client';

import { Link, usePathname } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

const NAV_ITEMS = [
  { href: '/scenarios', label: 'Scenarios' },
  { href: '/tool', label: 'Tool' },
  { href: '/history', label: 'History' },
  { href: '/pricing', label: 'Pricing' },
];

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
            F
          </span>
          Flowdockr
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/login"
            className="ml-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
