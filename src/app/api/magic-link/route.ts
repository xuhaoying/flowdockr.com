import { NextRequest, NextResponse } from 'next/server';

import { sendMagicLink } from '@/lib/magic-link';
import { magicLinkSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = magicLinkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message || 'Invalid input.',
        },
        { status: 400 }
      );
    }

    const { email, callbackUrl } = parsed.data;
    await sendMagicLink(email, callbackUrl);

    return NextResponse.json({
      ok: true,
      message: 'Magic link sent.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Failed to send magic link.',
      },
      { status: 500 }
    );
  }
}
