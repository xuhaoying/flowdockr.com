import { readFileSync, writeFileSync } from 'node:fs';

const SEO_PAGES_PATH = 'product/seo/factory/seo-pages.v2.csv';
const OUTPUT_REPORT = 'product/seo/generated/update-needed-report-v2.md';
const GENERATED_AT = '2026-03-05';

function parseCsvLine(line) {
  const values = [];
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

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',');

  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    return row;
  });

  return { headers, rows };
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  writeFileSync(filePath, `${lines.join('\n')}\n`);
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

const { headers, rows } = loadCsv(SEO_PAGES_PATH);

const selected = [];
for (const row of rows) {
  const impressions = toNumber(row.gsc_impressions);
  const ctr = toNumber(row.ctr);

  if (impressions >= 100 && ctr > 0 && ctr < 0.015) {
    row.status = 'update_needed';
    row.refresh_reason = 'low_ctr';
    selected.push(row);
  }
}

writeCsv(SEO_PAGES_PATH, headers, rows);

const lines = [
  '# Flowdockr Update Needed Report v2',
  '',
  `Generated: ${GENERATED_AT}`,
  `Rows marked update_needed: ${selected.length}`,
  '',
  '## Pages',
  '',
];

if (!selected.length) {
  lines.push('- none');
} else {
  for (const row of selected.slice(0, 200)) {
    lines.push(`- ${row.id} ${row.route} (impressions=${row.gsc_impressions}, ctr=${row.ctr})`);
  }
}
lines.push('');

writeFileSync(OUTPUT_REPORT, lines.join('\n'));

console.log(`Marked update_needed: ${selected.length}`);
console.log(`Report: ${OUTPUT_REPORT}`);
console.log(`Updated DB: ${SEO_PAGES_PATH}`);
