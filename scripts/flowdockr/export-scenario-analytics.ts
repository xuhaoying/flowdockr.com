import {
  getScenarioAnalyticsSlugCounts,
  isCanonicalScenarioAnalyticsEventName,
} from '@/lib/analytics/scenarioEventLog';

function getArg(name: string) {
  const prefix = `--${name}=`;
  return process.argv
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
}

function printCsv(
  rows: Awaited<
    ReturnType<typeof getScenarioAnalyticsSlugCounts>
  >['countsBySlug']
) {
  const header = [
    'scenario_slug',
    'fd_scenario_view',
    'fd_tool_start',
    'fd_generation_success',
    'total',
  ];

  console.log(header.join(','));
  for (const row of rows) {
    console.log(
      [
        row.scenarioSlug,
        row.fd_scenario_view,
        row.fd_tool_start,
        row.fd_generation_success,
        row.total,
      ].join(',')
    );
  }
}

async function main() {
  const days = Number.parseInt(getArg('days') || '30', 10);
  const limit = Number.parseInt(getArg('limit') || '200', 10);
  const format = (getArg('format') || 'json').trim().toLowerCase();
  const scenarioSlug = (getArg('slug') || '').trim();
  const requestedEvent = (getArg('event') || '').trim();
  const eventName = isCanonicalScenarioAnalyticsEventName(requestedEvent)
    ? requestedEvent
    : undefined;

  const result = await getScenarioAnalyticsSlugCounts({
    days,
    limit,
    eventName,
    scenarioSlug: scenarioSlug || undefined,
  });

  if (format === 'csv') {
    printCsv(result.countsBySlug);
    return;
  }

  console.log(
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        filters: {
          days: result.days,
          limit: result.limit,
          eventName: eventName || null,
          scenarioSlug: scenarioSlug || null,
        },
        countsBySlug: result.countsBySlug,
        eventCounts: result.eventCounts,
      },
      null,
      2
    )
  );
}

void main();
