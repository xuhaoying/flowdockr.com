import { NextRequest, NextResponse } from 'next/server';

import { getAnonymousSessionIdFromRequest } from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { getCreditPackageById } from '@/lib/credits';
import { getStripeClient } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validators';

export const runtime = 'nodejs';

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

    return `${parsed.pathname}${parsed.search}` || '/scenarios';
  } catch {
    return '/scenarios';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message || 'Invalid checkout input.',
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const currentUser = await getCurrentUser();
    const email = (input.email || currentUser?.email || '').trim().toLowerCase();
    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Email is required to continue checkout.',
        },
        { status: 400 }
      );
    }

    const pack = getCreditPackageById(input.packageId);
    if (!pack) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid package id.',
        },
        { status: 400 }
      );
    }

    if (!pack.stripePriceId) {
      return NextResponse.json(
        {
          ok: false,
          message: `Stripe price id is missing for package ${pack.id}.`,
        },
        { status: 500 }
      );
    }

    const anonymousSessionId =
      input.anonymousSessionId || getAnonymousSessionIdFromRequest(request) || '';
    const returnTo = sanitizeReturnPath(input.returnTo, request);
    const scenarioSlug = input.scenarioSlug || '';
    const origin = request.nextUrl.origin;

    const stripe = await getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: pack.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(returnTo)}&scenario=${encodeURIComponent(scenarioSlug)}`,
      cancel_url: `${origin}${returnTo}`,
      customer_email: email,
      client_reference_id: currentUser?.id || undefined,
      metadata: {
        packageId: pack.id,
        anonymousSessionId,
        scenarioSlug,
        returnTo,
        email,
      },
    });

    if (!session.url) {
      throw new Error('Checkout URL is missing.');
    }

    return NextResponse.json({
      ok: true,
      checkoutUrl: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : 'Failed to create checkout session.',
      },
      { status: 500 }
    );
  }
}
