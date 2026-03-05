import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SEO_PAGES_PATH = 'product/seo/factory/seo-pages.v2.csv';
const OUTPUT_JSON = 'product/seo/generated/internal-links-graph-v2.json';
const OUTPUT_MD = 'product/seo/generated/internal-links-graph-v2.md';
const GENERATED_AT = '2026-03-05';

const TOOL_ROUTE_BY_NAME = {
  'client-negotiation-reply-generator': '/tools/client-negotiation-reply-generator',
  'freelance-rate-calculator': '/tools/freelance-rate-calculator',
  'proposal-generator': '/tools/proposal-generator',
};

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

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    return row;
  });
}

function slugToRoute(slug) {
  return slug ? `/${slug}` : '';
}

const rows = loadCsv(SEO_PAGES_PATH);
const rowById = new Map(rows.map((row) => [row.id, row]));
const edges = [];
const nodeSet = new Set();

for (const row of rows) {
  const from = row.route;
  if (!from) continue;

  nodeSet.add(from);

  const pillarRoute = slugToRoute(row.pillar_ref);
  if (pillarRoute) {
    edges.push({ from, to: pillarRoute, type: 'pillar_ref' });
    nodeSet.add(pillarRoute);
  }

  const toolRoute = TOOL_ROUTE_BY_NAME[row.target_tool] || (row.target_tool === 'tool-page' ? row.route : '');
  if (toolRoute) {
    edges.push({ from, to: toolRoute, type: 'target_tool' });
    nodeSet.add(toolRoute);
  }

  const relatedIds = String(row.related_refs || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  for (const relatedId of relatedIds) {
    const related = rowById.get(relatedId);
    if (!related?.route) continue;
    edges.push({ from, to: related.route, type: 'related_ref' });
    nodeSet.add(related.route);
  }
}

const outDegree = {};
for (const edge of edges) {
  outDegree[edge.from] = (outDegree[edge.from] || 0) + 1;
}

const topNodes = Object.entries(outDegree)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .map(([route, degree]) => ({ route, degree }));

const graph = {
  generated_at: GENERATED_AT,
  source: SEO_PAGES_PATH,
  totals: {
    pages: rows.length,
    nodes: nodeSet.size,
    edges: edges.length,
  },
  edge_breakdown: {
    pillar_ref: edges.filter((e) => e.type === 'pillar_ref').length,
    target_tool: edges.filter((e) => e.type === 'target_tool').length,
    related_ref: edges.filter((e) => e.type === 'related_ref').length,
  },
  top_out_degree: topNodes,
  edges,
};

mkdirSync('product/seo/generated', { recursive: true });
writeFileSync(OUTPUT_JSON, `${JSON.stringify(graph, null, 2)}\n`);

const lines = [
  '# Flowdockr Internal Links Graph v2',
  '',
  `Generated: ${GENERATED_AT}`,
  '',
  `- pages: ${graph.totals.pages}`,
  `- nodes: ${graph.totals.nodes}`,
  `- edges: ${graph.totals.edges}`,
  '',
  '## Edge Breakdown',
  '',
  `- pillar_ref: ${graph.edge_breakdown.pillar_ref}`,
  `- target_tool: ${graph.edge_breakdown.target_tool}`,
  `- related_ref: ${graph.edge_breakdown.related_ref}`,
  '',
  '## Top Outbound Link Pages',
  '',
  ...topNodes.map((node) => `- ${node.route}: ${node.degree}`),
  '',
  '## Notes',
  '',
  '- Internal links are compiler-driven from seo_pages references, not model-generated.',
  '- Use this graph to detect orphan pages and thin clusters before publishing.',
  '',
];

writeFileSync(OUTPUT_MD, lines.join('\n'));

console.log(`Internal links graph generated: ${OUTPUT_JSON}`);
console.log(`Nodes: ${graph.totals.nodes}, Edges: ${graph.totals.edges}`);
console.log(`Summary: ${OUTPUT_MD}`);
