import { NextRequest, NextResponse } from 'next/server';

import {
  getScenarioPackById,
  ScenarioPackId,
} from '@/shared/lib/scenario-quota';
import { getScenarioPackStripeClient } from '@/shared/lib/scenario-pack-payment';
import { getUserInfo } from '@/shared/models/user';

type CheckoutInput = {
  return_to?: string;
  pack_id?: ScenarioPackId;
};

class BadRequestError extends Error {
  status = 400;
}

class UnauthorizedError extends Error {
  status = 401;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutInput;
    const returnTo = sanitizeReturnPath(body.return_to, request);
    const pack = getScenarioPackById(body.pack_id || '');
    if (!pack) {
      throw new BadRequestError('Invalid credits pack.');
    }

    const user = await getUserInfo();
    if (!user) {
      throw new UnauthorizedError('no auth, please sign in');
    }

    const stripe = await getScenarioPackStripeClient();
    const origin = request.nextUrl.origin;
    const successUrl = `${origin}/api/scenarios/pack/confirm?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(returnTo)}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: pack.priceCents,
            product_data: {
              name: `Flowdockr ${pack.replies} replies pack`,
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: `${origin}${returnTo}`,
      metadata: {
        flowdockr_pack: 'scenario_reply',
        pack_id: pack.id,
        pack_replies: String(pack.replies),
        user_id: user.id,
        return_to: returnTo,
      },
    });

    if (!session.url) {
      throw new Error('Stripe checkout URL is missing.');
    }

    return NextResponse.json(
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
  } catch (error) {
    const status = getErrorStatus(error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Failed to start checkout.';

    return NextResponse.json(
      {
        message,
      },
      {
        status,
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

function getErrorStatus(error: unknown): number {
  if (error instanceof BadRequestError || error instanceof UnauthorizedError) {
    return error.status;
  }

  return 500;
}
