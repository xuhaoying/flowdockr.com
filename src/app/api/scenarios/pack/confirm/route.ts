import { NextRequest, NextResponse } from 'next/server';
import { redeemScenarioPackPurchase } from '@/lib/payments/redeemScenarioPack';

import { getScenarioPackStripeClient } from '@/shared/lib/scenario-pack-payment';
import { getScenarioPackById } from '@/shared/lib/scenario-quota';
import { getUserInfo } from '@/shared/models/user';

export async function GET(request: NextRequest) {
  const rawReturnTo = request.nextUrl.searchParams.get('return_to') || '';
  const fallbackReturnTo = sanitizeReturnPath(rawReturnTo, request);
  const sessionId = String(
    request.nextUrl.searchParams.get('session_id') || ''
  ).trim();

  if (!sessionId) {
    return redirectWithStatus(
      request,
      fallbackReturnTo,
      'pack_error=missing_session'
    );
  }

  try {
    const user = await getUserInfo();
    if (!user) {
      return redirectWithStatus(
        request,
        fallbackReturnTo,
        'pack_error=no_auth'
      );
    }

    const stripe = await getScenarioPackStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' || session.status !== 'complete') {
      return redirectWithStatus(
        request,
        fallbackReturnTo,
        'pack_error=payment_not_completed'
      );
    }
    if (session.metadata?.flowdockr_pack !== 'scenario_reply') {
      return redirectWithStatus(
        request,
        fallbackReturnTo,
        'pack_error=invalid_pack'
      );
    }
    if (String(session.metadata?.user_id || '').trim() !== user.id) {
      return redirectWithStatus(
        request,
        fallbackReturnTo,
        'pack_error=account_mismatch'
      );
    }

    const metadataReturnTo = sanitizeReturnPath(
      String(session.metadata?.return_to || ''),
      request
    );
    const returnTo = metadataReturnTo || fallbackReturnTo;
    const pack = getScenarioPackById(
      String(session.metadata?.pack_id || '').trim()
    );
    if (!pack) {
      return redirectWithStatus(request, returnTo, 'pack_error=invalid_pack');
    }

    const paidRedirect = NextResponse.redirect(
      new URL(
        addQuery(
          returnTo,
          `pack_paid=1&pack_replies=${encodeURIComponent(String(pack.replies))}`
        ),
        request.nextUrl.origin
      ),
      {
        status: 303,
      }
    );

    await redeemScenarioPackPurchase({
      stripeCheckoutSessionId: sessionId,
      userId: user.id,
      packId: pack.id,
      credits: pack.replies,
      source: 'scenario_pack_confirm',
    });

    return paidRedirect;
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
