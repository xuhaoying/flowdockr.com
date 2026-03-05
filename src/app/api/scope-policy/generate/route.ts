import { NextRequest, NextResponse } from 'next/server';

import { envConfigs } from '@/config';
import { generateScopePolicy, validateScopeInput } from '@/core/flowdockr/scope';
import { getCurrentSubscription } from '@/shared/models/subscription';
import { getUserInfo } from '@/shared/models/user';

const FREE_LIMIT = 2;
const FREE_COOKIE = 'flowdockr_scope_free_count';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = validateScopeInput(body);

    const isPaid = await hasPaidAccess();
    const used = Number.parseInt(request.cookies.get(FREE_COOKIE)?.value || '0', 10) || 0;

    if (!isPaid && used >= FREE_LIMIT) {
      return NextResponse.json({
        code: -1,
        message: 'Free plan limit reached. Upgrade to continue generating.',
        data: {
          upgrade_required: true,
          usage: {
            limit: FREE_LIMIT,
            used,
            remaining: 0,
            is_paid: false,
          },
        },
      });
    }

    const output = await generateScopePolicy(input, {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.SCOPE_GUARD_MODEL,
    });

    const nextUsed = isPaid ? used : used + 1;

    const response = NextResponse.json({
      code: 0,
      message: 'ok',
      data: {
        output,
        usage: {
          limit: isPaid ? null : FREE_LIMIT,
          used: nextUsed,
          remaining: isPaid ? null : Math.max(FREE_LIMIT - nextUsed, 0),
          is_paid: isPaid,
        },
      },
    });

    if (!isPaid) {
      response.cookies.set(FREE_COOKIE, String(nextUsed), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (e: any) {
    return NextResponse.json({
      code: -1,
      message: e?.message || 'generate failed',
    });
  }
}

async function hasPaidAccess(): Promise<boolean> {
  try {
    const user = await getUserInfo();
    if (!user?.id || !envConfigs.database_url) {
      return false;
    }

    const subscription = await getCurrentSubscription(user.id);
    return Boolean(subscription);
  } catch {
    return false;
  }
}
