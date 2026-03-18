import { NextRequest, NextResponse } from 'next/server';
import { getScenarioPageBySlug } from '@/content/scenario-pages';
import {
  getScenarioAnalyticsSlugCounts,
  isCanonicalScenarioAnalyticsEventName,
  recordScenarioAnalyticsEvent,
} from '@/lib/analytics/scenarioEventLog';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      eventName?: string;
      scenarioSlug?: string;
      pageType?: string;
      pathname?: string;
    };

    const eventName = String(body.eventName || '').trim();
    const scenarioSlug = String(body.scenarioSlug || '').trim();
    const pageType = String(body.pageType || 'scenario').trim() || 'scenario';
    const pathname = String(body.pathname || '').trim();

    if (!isCanonicalScenarioAnalyticsEventName(eventName)) {
      return NextResponse.json(
        { ok: false, message: 'Unsupported scenario analytics event.' },
        { status: 400 }
      );
    }

    if (!scenarioSlug || !getScenarioPageBySlug(scenarioSlug)) {
      return NextResponse.json(
        { ok: false, message: 'Unknown scenario slug.' },
        { status: 400 }
      );
    }

    await recordScenarioAnalyticsEvent({
      eventName,
      scenarioSlug,
      pageType,
      pathname: pathname || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to record scenario analytics event.',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const days = Number.parseInt(searchParams.get('days') || '30', 10);
    const limit = Number.parseInt(searchParams.get('limit') || '200', 10);
    const requestedEvent = String(searchParams.get('event') || '').trim();
    const scenarioSlug = String(searchParams.get('slug') || '').trim();
    const eventName = isCanonicalScenarioAnalyticsEventName(requestedEvent)
      ? requestedEvent
      : undefined;

    const result = await getScenarioAnalyticsSlugCounts({
      days,
      limit,
      eventName,
      scenarioSlug: scenarioSlug || undefined,
    });

    return NextResponse.json({
      ok: true,
      exportedAt: new Date().toISOString(),
      filters: {
        days: result.days,
        limit: result.limit,
        eventName: eventName || null,
        scenarioSlug: scenarioSlug || null,
      },
      countsBySlug: result.countsBySlug,
      eventCounts: result.eventCounts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to export scenario analytics counts.',
      },
      { status: 500 }
    );
  }
}
