import { NextRequest, NextResponse } from 'next/server';

import {
  attachBrowserIdCookie,
  getBrowserIdFromRequest,
  getPaidRemaining,
  isPackSessionRedeemed,
  markPackSessionRedeemed,
  SCENARIO_PACK_SIZE,
  setPaidRemaining,
} from '@/shared/lib/scenario-quota';
import { getScenarioPackStripeClient } from '@/shared/lib/scenario-pack-payment';

export async function GET(request: NextRequest) {
  const rawReturnTo = request.nextUrl.searchParams.get('return_to') || '';
  const fallbackReturnTo = sanitizeReturnPath(rawReturnTo, request);
  const sessionId = String(
    request.nextUrl.searchParams.get('session_id') || ''
  ).trim();

  if (!sessionId) {
    return redirectWithStatus(request, fallbackReturnTo, 'pack_error=missing_session');
  }

  try {
    const stripe = await getScenarioPackStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' || session.status !== 'complete') {
      return redirectWithStatus(request, fallbackReturnTo, 'pack_error=payment_not_completed');
    }
    if (session.metadata?.flowdockr_pack !== 'scenario_reply') {
      return redirectWithStatus(request, fallbackReturnTo, 'pack_error=invalid_pack');
    }

    const metadataReturnTo = sanitizeReturnPath(
      String(session.metadata?.return_to || ''),
      request
    );
    const returnTo = metadataReturnTo || fallbackReturnTo;

    const metadataBrowserId = normalizeBrowserId(session.metadata?.browser_id);
    const browserId = metadataBrowserId || getBrowserIdFromRequest(request);
    const response = NextResponse.redirect(
      new URL(addQuery(returnTo, 'pack_paid=1'), request.nextUrl.origin),
      {
        status: 303,
      }
    );

    attachBrowserIdCookie(response, browserId);

    if (isPackSessionRedeemed(sessionId)) {
      return response;
    }

    const currentRemaining = getPaidRemaining(request, browserId);
    const nextRemaining = Math.max(0, currentRemaining) + SCENARIO_PACK_SIZE;
    setPaidRemaining(response, browserId, nextRemaining);
    markPackSessionRedeemed(sessionId);

    return response;
  } catch (error) {
    const code =
      error instanceof Error && error.message
        ? encodeURIComponent(error.message.slice(0, 60))
        : 'confirm_failed';
    return redirectWithStatus(request, fallbackReturnTo, `pack_error=${code}`);
  }
}

function redirectWithStatus(
  request: NextRequest,
  returnTo: string,
  query: string
): NextResponse {
  return NextResponse.redirect(
    new URL(addQuery(returnTo, query), request.nextUrl.origin),
    {
      status: 303,
    }
  );
}

function sanitizeReturnPath(value: string, request: NextRequest): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return '/scenarios';
  }

  try {
    const parsed = new URL(trimmed, request.nextUrl.origin);
    if (parsed.origin !== request.nextUrl.origin) {
      return '/scenarios';
    }
    const safePath = `${parsed.pathname}${parsed.search}`;
    return safePath.startsWith('/') ? safePath : '/scenarios';
  } catch {
    return '/scenarios';
  }
}

function addQuery(path: string, query: string): string {
  if (!query) {
    return path;
  }

  return path.includes('?') ? `${path}&${query}` : `${path}?${query}`;
}

function normalizeBrowserId(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (trimmed.length < 12 || trimmed.length > 80) {
    return '';
  }

  return trimmed;
}
