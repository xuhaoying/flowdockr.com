import { NextRequest, NextResponse } from 'next/server';

import { createCheckoutSession } from '@/lib/checkout/createCheckoutSession';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const result = await createCheckoutSession(request);
  if (!result.success) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result);
}
