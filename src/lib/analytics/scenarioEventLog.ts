import { db, scenarioAnalyticsEvent } from '@/lib/db';
import { and, desc, eq, gte, sql } from 'drizzle-orm';

import { getUuid } from '@/shared/lib/hash';

export const canonicalScenarioAnalyticsEventNames = [
  'fd_scenario_view',
  'fd_tool_start',
  'fd_generation_success',
] as const;

export type CanonicalScenarioAnalyticsEventName =
  (typeof canonicalScenarioAnalyticsEventNames)[number];

export function isCanonicalScenarioAnalyticsEventName(
  value: string
): value is CanonicalScenarioAnalyticsEventName {
  return canonicalScenarioAnalyticsEventNames.includes(
    value as CanonicalScenarioAnalyticsEventName
  );
}

export async function recordScenarioAnalyticsEvent(params: {
  eventName: CanonicalScenarioAnalyticsEventName;
  scenarioSlug: string;
  pageType?: string;
  pathname?: string;
}) {
  await db()
    .insert(scenarioAnalyticsEvent)
    .values({
      id: getUuid(),
      eventName: params.eventName,
      scenarioSlug: params.scenarioSlug,
      pageType: params.pageType || 'scenario',
      pathname: params.pathname || null,
    });
}

export async function getScenarioAnalyticsSlugCounts(params?: {
  days?: number;
  eventName?: CanonicalScenarioAnalyticsEventName;
  scenarioSlug?: string;
  pageType?: string;
  limit?: number;
}) {
  const days = Math.max(1, params?.days || 30);
  const limit = Math.max(1, Math.min(500, params?.limit || 200));
  const createdAfter = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const whereClauses = [
    gte(scenarioAnalyticsEvent.createdAt, createdAfter),
    params?.eventName
      ? eq(scenarioAnalyticsEvent.eventName, params.eventName)
      : undefined,
    params?.scenarioSlug
      ? eq(scenarioAnalyticsEvent.scenarioSlug, params.scenarioSlug)
      : undefined,
    params?.pageType
      ? eq(scenarioAnalyticsEvent.pageType, params.pageType)
      : undefined,
  ].filter(Boolean);

  const totalExpr = sql<number>`count(*)`;

  const rows = await db()
    .select({
      eventName: scenarioAnalyticsEvent.eventName,
      scenarioSlug: scenarioAnalyticsEvent.scenarioSlug,
      total: totalExpr.as('total'),
    })
    .from(scenarioAnalyticsEvent)
    .where(whereClauses.length ? and(...whereClauses) : undefined)
    .groupBy(
      scenarioAnalyticsEvent.eventName,
      scenarioAnalyticsEvent.scenarioSlug
    )
    .orderBy(
      desc(totalExpr),
      scenarioAnalyticsEvent.scenarioSlug,
      scenarioAnalyticsEvent.eventName
    )
    .limit(limit);

  type CountsBySlugRow = {
    scenarioSlug: string;
    fd_scenario_view: number;
    fd_tool_start: number;
    fd_generation_success: number;
    total: number;
  };

  const countsBySlugMap = new Map<string, CountsBySlugRow>();

  const eventCounts: Array<{
    eventName: CanonicalScenarioAnalyticsEventName;
    scenarioSlug: string;
    total: number;
  }> = rows.map(
    (row: { eventName: string; scenarioSlug: string; total: unknown }) => ({
      eventName: row.eventName as CanonicalScenarioAnalyticsEventName,
      scenarioSlug: row.scenarioSlug,
      total: Number(row.total || 0),
    })
  );

  for (const row of eventCounts) {
    const current = countsBySlugMap.get(row.scenarioSlug) || {
      scenarioSlug: row.scenarioSlug,
      fd_scenario_view: 0,
      fd_tool_start: 0,
      fd_generation_success: 0,
      total: 0,
    };

    if (row.eventName === 'fd_scenario_view') {
      current.fd_scenario_view = row.total;
    } else if (row.eventName === 'fd_tool_start') {
      current.fd_tool_start = row.total;
    } else {
      current.fd_generation_success = row.total;
    }
    current.total += row.total;
    countsBySlugMap.set(row.scenarioSlug, current);
  }

  const countsBySlug = Array.from(countsBySlugMap.values()).sort(
    (left, right) => {
      if (right.total !== left.total) {
        return right.total - left.total;
      }

      return left.scenarioSlug.localeCompare(right.scenarioSlug);
    }
  );

  return {
    days,
    limit,
    eventCounts,
    countsBySlug,
  };
}
