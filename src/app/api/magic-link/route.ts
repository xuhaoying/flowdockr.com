import { NextRequest, NextResponse } from 'next/server';
import { hashRequestIp } from '@/lib/anonymous';
import { sendMagicLink } from '@/lib/magic-link';
import { consumeFixedWindowRateLimit } from '@/lib/rate-limit';
import { magicLinkSchema } from '@/lib/validators';

const MAGIC_LINK_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_LIMIT = 3;
const IP_LIMIT = 10;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = magicLinkSchema.safeParse(normalizeMagicLinkBody(body));
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
    const normalizedEmail = email.trim().toLowerCase();
    const [emailLimit, ipLimit] = await Promise.all([
      consumeFixedWindowRateLimit({
        bucket: 'magic-link:email',
        key: normalizedEmail,
        limit: EMAIL_LIMIT,
        windowMs: MAGIC_LINK_WINDOW_MS,
      }),
      consumeFixedWindowRateLimit({
        bucket: 'magic-link:ip',
        key: hashRequestIp(request),
        limit: IP_LIMIT,
        windowMs: MAGIC_LINK_WINDOW_MS,
      }),
    ]);

    if (emailLimit.allowed && ipLimit.allowed) {
      await sendMagicLink(normalizedEmail, callbackUrl);
    }

    return NextResponse.json({
      ok: true,
      message: 'If that email can receive a magic link, one has been sent.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : 'Failed to send magic link.',
      },
      { status: 500 }
    );
  }
}

function normalizeMagicLinkBody(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return body;
  }

  const raw = body as Record<string, unknown>;
  return {
    ...raw,
    email:
      typeof raw.email === 'string'
        ? raw.email.trim().toLowerCase()
        : raw.email,
  };
}
