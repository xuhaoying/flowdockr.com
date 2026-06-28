import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

const NAV_ITEMS = [
  { href: '/scenario', label: 'Use Cases' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function PublicHeader() {
  return (
    <header className="border-brand-lavender/25 bg-brand-bg/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="inline-flex min-h-11 w-fit items-center"
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
          <nav className="flex w-full flex-wrap items-center gap-1.5 md:w-auto md:flex-nowrap">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-primary inline-flex min-h-11 items-center rounded-md px-3 text-xs text-slate-700 transition-colors hover:bg-white sm:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="min-h-11 flex-1 sm:flex-none"
            >
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="min-h-11 flex-1 sm:flex-none">
              <Link href="/tools/reply-generator">Try FlowDockr</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
