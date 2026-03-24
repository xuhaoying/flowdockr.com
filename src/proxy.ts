import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from '@/core/i18n/config';
import { defaultLocale } from '@/config/locale';
import {
  getLegacyScenarioRedirectPath,
  getLegacyScenariosHubRedirectPath,
} from '@/lib/routing/legacyScenarioRedirects';
import { shouldBlockSearchIndexingForHost } from '@/shared/lib/search-indexing';

const intlMiddleware = createIntlMiddleware(routing);
const COLLAPSED_LOCALES = new Set(['es', 'zh']);

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeSegment = pathname.split('/')[1] || '';

  if (COLLAPSED_LOCALES.has(localeSegment)) {
    const redirectUrl = request.nextUrl.clone();
    const strippedPath = normalizePath(pathname.slice(localeSegment.length + 1) || '/');

    redirectUrl.pathname = strippedPath || '/';

    return NextResponse.redirect(redirectUrl, 301);
  }

  // Extract locale from pathname
  const locale = localeSegment;
  const isValidLocale = routing.locales.includes(locale as any);
  const pathWithoutLocale = normalizePath(
    isValidLocale ? pathname.slice(locale.length + 1) || '/' : pathname
  );
  const requestHost =
    request.headers.get('x-forwarded-host') || request.nextUrl.host || '';
  const blockSearchIndexing = shouldBlockSearchIndexingForHost(requestHost);

  if (pathWithoutLocale === '/scenarios') {
    return redirectLegacyScenarioPath(
      request,
      isValidLocale ? locale : null,
      getLegacyScenariosHubRedirectPath()
    );
  }

  if (pathWithoutLocale.startsWith('/scenarios/')) {
    const slug = pathWithoutLocale.slice('/scenarios/'.length);
    if (slug) {
      return redirectLegacyScenarioPath(
        request,
        isValidLocale ? locale : null,
        getLegacyScenarioRedirectPath(slug)
      );
    }
  }

  // Handle internationalization after redirect checks so legacy URLs emit a true
  // HTTP redirect instead of a rendered App Router redirect payload.
  const intlResponse = intlMiddleware(request);

  // Only check authentication for admin routes
  if (
    pathWithoutLocale.startsWith('/admin') ||
    pathWithoutLocale.startsWith('/settings') ||
    pathWithoutLocale.startsWith('/activity')
  ) {
    // Check if session cookie exists
    const sessionCookie = getSessionCookie(request);

    // If no session token found, redirect to sign-in
    if (!sessionCookie) {
      const signInUrl = new URL(
        isValidLocale ? `/${locale}/sign-in` : '/sign-in',
        request.url
      );
      // Add the current path (including search params) as callback - use relative path for multi-language support
      const callbackPath = pathWithoutLocale + request.nextUrl.search;
      signInUrl.searchParams.set('callbackUrl', callbackPath);
      return NextResponse.redirect(signInUrl);
    }

    // For admin routes, we need to check RBAC permissions
    // Note: Full permission check happens in the page/API route level
    // This is a lightweight session check to prevent unauthorized access
    // The detailed permission check (admin.access and specific permissions)
    // will be done in the layout or individual pages using requirePermission()
  }

  if (blockSearchIndexing) {
    intlResponse.headers.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive, nosnippet'
    );
  }

  intlResponse.headers.set('x-pathname', request.nextUrl.pathname);
  intlResponse.headers.set('x-url', request.url);

  // Remove Set-Cookie from public pages to allow caching
  // We exclude admin, settings, activity, and auth pages from this behavior
  if (
    !pathWithoutLocale.startsWith('/admin') &&
    !pathWithoutLocale.startsWith('/settings') &&
    !pathWithoutLocale.startsWith('/activity') &&
    !pathWithoutLocale.startsWith('/sign-') &&
    !pathWithoutLocale.startsWith('/auth')
  ) {
    intlResponse.headers.delete('Set-Cookie');

    // Cache-Control header for public pages
    const cacheControl = 'public, s-maxage=3600, stale-while-revalidate=14400';

    intlResponse.headers.set('Cache-Control', cacheControl);
    intlResponse.headers.set('CDN-Cache-Control', cacheControl);
    intlResponse.headers.set('Cloudflare-CDN-Cache-Control', cacheControl);
  }

  // For all other routes (including /, /sign-in, /sign-up, /sign-out), just return the intl response
  return intlResponse;
}

function redirectLegacyScenarioPath(
  request: NextRequest,
  locale: string | null,
  targetPath: string
) {
  const redirectUrl = request.nextUrl.clone();
  const localizedTarget =
    locale && locale !== defaultLocale ? `/${locale}${targetPath}` : targetPath;

  redirectUrl.pathname = localizedTarget;
  redirectUrl.search = '';

  return NextResponse.redirect(redirectUrl, 308);
}

// Export proxy as middleware for Next.js
export const middleware = proxy;

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
