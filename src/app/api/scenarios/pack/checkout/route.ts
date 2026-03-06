import { NextRequest, NextResponse } from 'next/server';

import {
  attachBrowserIdCookie,
  getBrowserIdFromRequest,
  SCENARIO_PACK_PRICE_CENTS,
  SCENARIO_PACK_SIZE,
} from '@/shared/lib/scenario-quota';
import { getScenarioPackStripeClient } from '@/shared/lib/scenario-pack-payment';

type CheckoutInput = {
  return_to?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutInput;
    const returnTo = sanitizeReturnPath(body.return_to, request);
    const browserId = getBrowserIdFromRequest(request);

    const stripe = await getScenarioPackStripeClient();
    const origin = request.nextUrl.origin;
    const successUrl = `${origin}/api/scenarios/pack/confirm?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(returnTo)}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: SCENARIO_PACK_PRICE_CENTS,
            product_data: {
              name: `Flowdockr Reply Pack (${SCENARIO_PACK_SIZE} replies)`,
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: `${origin}${returnTo}`,
      metadata: {
        flowdockr_pack: 'scenario_reply',
        browser_id: browserId,
        return_to: returnTo,
        pack_size: String(SCENARIO_PACK_SIZE),
      },
    });

    if (!session.url) {
      throw new Error('Stripe checkout URL is missing.');
    }

    const response = NextResponse.json(
      {
        checkout_url: session.url,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );

    attachBrowserIdCookie(response, browserId);
    return response;
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Failed to start checkout.';

    return NextResponse.json(
      {
        message,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

function sanitizeReturnPath(value: string | undefined, request: NextRequest): string {
  if (!value) {
    return '/scenarios';
  }

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
