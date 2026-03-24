'use client';

import { useEffect, useState } from 'react';

import { useSession } from '@/core/auth/client';
import { Link, usePathname } from '@/core/i18n/navigation';
import { SignUser } from '@/shared/blocks/sign/sign-user';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const LOGGED_OUT_NAV_ITEMS = [
  { href: '/scenario', label: 'Use Cases' },
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Guides' },
];

const LOGGED_IN_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/scenario', label: 'Use Cases' },
  { href: '/tools', label: 'Tools' },
];

const AUTHENTICATED_USER_NAV = {
  items: [],
  show_name: true,
  show_credits: true,
  show_sign_out: true,
};

type HeaderAuthState = 'loading' | 'authenticated' | 'unauthenticated';

export function PublicHeader() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);
  const [resolvedAuthState, setResolvedAuthState] =
    useState<HeaderAuthState>('loading');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setResolvedAuthState('authenticated');
      return;
    }

    if (!isPending) {
      setResolvedAuthState('unauthenticated');
    }
  }, [isPending, session?.user]);

  let authState: HeaderAuthState = 'loading';

  if (mounted) {
    if (session?.user) {
      authState = 'authenticated';
    } else if (isPending) {
      authState = resolvedAuthState;
    } else {
      authState = 'unauthenticated';
    }
  }

  const signedIn = authState === 'authenticated';
  const isLoading = authState === 'loading';
  const navItems = signedIn ? LOGGED_IN_NAV_ITEMS : LOGGED_OUT_NAV_ITEMS;
  const ctaLabel = signedIn ? 'New Reply' : 'Generate Reply';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
            F
          </span>
          Flowdockr
        </Link>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">
          {isLoading ? (
            <>
              <div className="flex w-full flex-wrap items-center gap-1.5 md:w-auto md:flex-nowrap">
                <div className="h-9 w-24 animate-pulse rounded-md bg-slate-200" />
                <div className="h-9 w-24 animate-pulse rounded-md bg-slate-200" />
                <div className="h-9 w-20 animate-pulse rounded-md bg-slate-200" />
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
                <div className="h-9 flex-1 animate-pulse rounded-md bg-slate-200 sm:w-28 sm:flex-none" />
              </div>
            </>
          ) : (
            <>
              <nav className="flex w-full flex-wrap items-center gap-1.5 md:w-auto md:flex-nowrap">
                {navItems.map((item) => {
                  const hrefPath = item.href.split('#')[0] || '/';
                  const active =
                    pathname === hrefPath ||
                    (hrefPath !== '/' && pathname.startsWith(`${hrefPath}/`));

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
              </nav>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                {signedIn ? (
                  <SignUser signButtonSize="sm" userNav={AUTHENTICATED_USER_NAV} />
                ) : (
                  <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Link href="/signin">Sign in</Link>
                  </Button>
                )}
                <Button asChild size="sm" className="flex-1 sm:flex-none">
                  <Link href="/tools/reply-generator">{ctaLabel}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
