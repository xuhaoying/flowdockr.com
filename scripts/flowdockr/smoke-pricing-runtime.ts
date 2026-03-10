import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

type ScenarioData = {
  url: string;
};

type GuideData = {
  url: string;
};

type ToolData = {
  url: string;
};

type HubData = {
  url: string;
};

const scenarioMarkers = [
  'Situation summary',
  'Why this is tricky',
  'Strategy paths',
  'Example replies',
  'Next decision links',
  'FAQ',
];

const guideMarkers = ['Core takeaways', 'Recommended scenarios', 'FAQ'];
const toolMarkers = ['Best for', 'Expected inputs', 'Related scenarios'];

function readJsonFile<T>(path: string): T {
  const content = readFileSync(path, 'utf8');
  return JSON.parse(content) as T;
}

function normalizeRoute(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;
}

async function waitForServerReady(baseUrl: string, timeoutMs = 30_000): Promise<void> {
  const startedAt = Date.now();
  const probePath = '/pricing';

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}${probePath}`, {
        redirect: 'follow',
      });
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Server did not become ready within ${timeoutMs}ms at ${baseUrl}${probePath}`);
}

function hasAllMarkers(html: string, markers: string[]): string[] {
  return markers.filter((marker) => !html.includes(marker));
}

async function fetchHtml(baseUrl: string, path: string): Promise<{ status: number; html: string }> {
  const response = await fetch(`${baseUrl}${path}`, { redirect: 'follow' });
  const html = await response.text();
  return { status: response.status, html };
}

async function main() {
  const cwd = process.cwd();
  const standaloneEntry = join(cwd, '.next', 'standalone', 'server.js');
  if (!existsSync(standaloneEntry)) {
    throw new Error(`Missing standalone server entry: ${standaloneEntry}. Run 'pnpm build' first.`);
  }

  const scenarios = readJsonFile<ScenarioData[]>(join(cwd, 'content', 'pricing', 'scenarios.json'));
  const guides = readJsonFile<GuideData[]>(join(cwd, 'content', 'guides', 'guides.json'));
  const tools = readJsonFile<ToolData[]>(join(cwd, 'content', 'tools', 'tools.json'));
  const hub = readJsonFile<HubData>(join(cwd, 'content', 'pricing', 'hub.json'));

  const port = Number(process.env.PRICE_SMOKE_PORT ?? 4120);
  const baseUrl = `http://localhost:${port}`;

  const server = spawn('node', [standaloneEntry], {
    cwd,
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: 'localhost',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverLogs = '';
  server.stdout?.on('data', (chunk: Buffer) => {
    serverLogs += chunk.toString();
  });
  server.stderr?.on('data', (chunk: Buffer) => {
    serverLogs += chunk.toString();
  });

  const failures: string[] = [];

  try {
    await waitForServerReady(baseUrl);

    const hubPath = normalizeRoute(hub.url);
    const hubResult = await fetchHtml(baseUrl, hubPath);
    if (hubResult.status !== 200) {
      failures.push(`${hubPath}: expected 200, got ${hubResult.status}`);
    }

    for (const scenario of scenarios) {
      const path = normalizeRoute(scenario.url);
      const result = await fetchHtml(baseUrl, path);

      if (result.status !== 200) {
        failures.push(`${path}: expected 200, got ${result.status}`);
        continue;
      }

      const missing = hasAllMarkers(result.html, scenarioMarkers);
      if (missing.length > 0) {
        failures.push(`${path}: missing markers -> ${missing.join(', ')}`);
      }
    }

    for (const guide of guides) {
      const path = normalizeRoute(guide.url);
      const result = await fetchHtml(baseUrl, path);

      if (result.status !== 200) {
        failures.push(`${path}: expected 200, got ${result.status}`);
        continue;
      }

      const missing = hasAllMarkers(result.html, guideMarkers);
      if (missing.length > 0) {
        failures.push(`${path}: missing markers -> ${missing.join(', ')}`);
      }
    }

    for (const tool of tools) {
      const path = normalizeRoute(tool.url);
      const result = await fetchHtml(baseUrl, path);

      if (result.status !== 200) {
        failures.push(`${path}: expected 200, got ${result.status}`);
        continue;
      }

      const missing = hasAllMarkers(result.html, toolMarkers);
      if (missing.length > 0) {
        failures.push(`${path}: missing markers -> ${missing.join(', ')}`);
      }
    }

    const contextPath =
      '/tools/price-negotiation-email-generator/?scenario=price-pushback-after-proposal';
    const contextResult = await fetchHtml(baseUrl, contextPath);
    if (contextResult.status !== 200) {
      failures.push(`${contextPath}: expected 200, got ${contextResult.status}`);
    } else if (!contextResult.html.includes('Context loaded from scenario')) {
      failures.push(`${contextPath}: missing scenario context hint`);
    }
  } finally {
    server.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  if (failures.length > 0) {
    console.error('Pricing runtime smoke failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    if (serverLogs.trim()) {
      console.error('\nServer logs:\n' + serverLogs);
    }
    process.exit(1);
  }

  console.log(
    `Pricing runtime smoke passed (${1 + scenarios.length + guides.length + tools.length} pages + context flow).`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
