'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useSession } from '@/core/auth/client';
import { Link, usePathname } from '@/core/i18n/navigation';
import { SignUser } from '@/shared/blocks/sign/sign-user';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

const LOGGED_OUT_NAV_ITEMS = [
  { href: '/scenario', label: 'Use Cases' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const LOGGED_IN_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/scenario', label: 'Use Cases' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
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
    useState<HeaderAuthState>('unauthenticated');

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

  let authState: HeaderAuthState = resolvedAuthState;

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
  const ctaLabel = signedIn ? 'New Reply' : 'Try FlowDockr';

  return (
    <header className="border-brand-lavender/25 bg-brand-bg/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="inline-flex w-fit items-center"
          aria-label="FlowDockr home"
        >
          <Image
            src="/logo.svg"
            alt="FlowDockr"
            width={162}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">
          {isLoading ? (
            <>
              <div className="flex w-full flex-wrap items-center gap-1.5 md:w-auto md:flex-nowrap">
                <div className="bg-brand-lavender/20 h-9 w-24 animate-pulse rounded-md" />
                <div className="bg-brand-lavender/20 h-9 w-24 animate-pulse rounded-md" />
                <div className="bg-brand-lavender/20 h-9 w-20 animate-pulse rounded-md" />
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="bg-brand-lavender/20 h-9 w-9 animate-pulse rounded-full" />
                <div className="bg-brand-lavender/20 h-9 flex-1 animate-pulse rounded-md sm:w-28 sm:flex-none" />
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
                          ? 'bg-brand-primary shadow-brand-primary/20 text-white shadow-sm'
                          : 'hover:text-brand-primary text-slate-700 hover:bg-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                {signedIn ? (
                  <SignUser
                    signButtonSize="sm"
                    userNav={AUTHENTICATED_USER_NAV}
                  />
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
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
