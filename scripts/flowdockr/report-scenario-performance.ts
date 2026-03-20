import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

import {
  getScenarioPerformanceReport,
  type ScenarioSearchConsoleRowInput,
} from '@/lib/analytics/scenarioPerformance';

function getArg(name: string) {
  const prefix = `--${name}=`;
  return process.argv
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  values.push(current);
  return values;
}

function loadSearchConsoleRows(
  filePath: string
): ScenarioSearchConsoleRowInput[] {
  const text = readFileSync(filePath, 'utf8').trim();
  if (!text) {
    return [];
  }

  if (extname(filePath).toLowerCase() === '.json') {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  }

  const lines = text.split('\n');
  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });

    return {
      slug: row.slug,
      page: row.page || row.path,
      url: row.url,
      indexed: row.indexed,
      index_status: row.index_status || row.indexStatus,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: row.ctr,
      position: row.position || row.avg_position,
    };
  });
}

async function main() {
  const days = Number.parseInt(getArg('days') || '30', 10);
  const limit = Number.parseInt(getArg('limit') || '500', 10);
  const format = (getArg('format') || 'json').trim().toLowerCase();
  const priorityOnlyArg = (getArg('priority-only') || '').trim().toLowerCase();
  const priorityOnly =
    priorityOnlyArg === 'true' || priorityOnlyArg === '1' || priorityOnlyArg === 'yes';
  const searchConsolePath = (getArg('search-console') || '').trim();

  const report = await getScenarioPerformanceReport({
    days,
    limit,
    searchConsoleRows: searchConsolePath
      ? loadSearchConsoleRows(searchConsolePath)
      : undefined,
  });

  const rows = priorityOnly ? report.priorityRows : report.rows;

  if (format === 'csv') {
    console.log(
      [
        'scenario_slug',
        'is_priority',
        'indexed',
        'index_status',
        'impressions',
        'clicks',
        'ctr',
        'position',
        'views',
        'tool_start_count',
        'generation_success_count',
        'scenario_to_tool_start_rate',
        'tool_start_to_generation_success_rate',
        'needs_title_meta_rewrite',
        'needs_conversion_review',
      ].join(',')
    );

    for (const row of rows) {
      console.log(
        [
          row.scenarioSlug,
          row.isPriority,
          row.indexed ?? '',
          row.indexStatus ?? '',
          row.impressions ?? '',
          row.clicks ?? '',
          row.ctr ?? '',
          row.position ?? '',
          row.views,
          row.toolStartCount,
          row.generationSuccessCount,
          row.scenarioToToolStartRate ?? '',
          row.toolStartToGenerationSuccessRate ?? '',
          row.needsTitleMetaRewrite,
          row.needsConversionReview,
        ].join(',')
      );
    }
    return;
  }

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        filters: {
          days: report.days,
          limit: report.limit,
          priorityOnly,
          searchConsolePath: searchConsolePath || null,
        },
        thresholds: report.thresholds,
        top20Performance: report.priorityRows.map((row) => ({
          scenarioSlug: row.scenarioSlug,
          toolStartRate: row.scenarioToToolStartRate,
          generationSuccessRate: row.toolStartToGenerationSuccessRate,
          views: row.views,
          toolStartCount: row.toolStartCount,
          generationSuccessCount: row.generationSuccessCount,
        })),
        rows,
      },
      null,
      2
    )
  );
}

void main();
