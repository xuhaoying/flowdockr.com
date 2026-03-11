'use client';

import { Link, usePathname } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

const NAV_ITEMS = [
  { href: '/scenario', label: 'Scenarios' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/pricing#pricing-cards', label: 'Pricing' },
];

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
            F
          </span>
          Flowdockr
        </Link>

        <nav className="flex w-full flex-wrap items-center gap-1.5 md:w-auto md:flex-nowrap">
          {NAV_ITEMS.map((item) => {
            const hrefPath = item.href.split('#')[0] || '/';
            const active = item.href.startsWith('/#')
              ? pathname === '/'
              : pathname === hrefPath || (hrefPath !== '/' && pathname.startsWith(`${hrefPath}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-xs transition-colors sm:text-sm',
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex w-full items-center gap-2 pt-1 sm:w-auto sm:pt-0">
            <Link
              href="/signin"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 sm:flex-none sm:text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/pricing"
              className="inline-flex flex-1 items-center justify-center rounded-md bg-slate-900 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 sm:flex-none sm:text-sm"
            >
              Solve a pricing message
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
