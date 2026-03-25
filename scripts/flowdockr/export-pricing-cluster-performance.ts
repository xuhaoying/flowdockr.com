import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  buildPricingClusterPerformanceSnapshotMarkdown,
  getPricingClusterPerformanceReport,
} from '../../src/lib/pricing-cluster-performance';

function readCliArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : '';
}

function buildDefaultSummaryPath(jsonOutputPath: string) {
  if (/\.json$/i.test(jsonOutputPath)) {
    return jsonOutputPath.replace(/\.json$/i, '-summary.md');
  }

  return `${jsonOutputPath}-summary.md`;
}

const outputPath = path.resolve(
  process.cwd(),
  readCliArg('output') || 'docs/ops/pricing-cluster-performance.json'
);
const summaryPath = path.resolve(
  process.cwd(),
  readCliArg('summary-output') || buildDefaultSummaryPath(outputPath)
);
const daysArg = Number(readCliArg('days') || 30);
const limitArg = Number(readCliArg('limit') || 500);

async function main() {
  const report = await getPricingClusterPerformanceReport({
    days: Number.isFinite(daysArg) ? daysArg : 30,
    limit: Number.isFinite(limitArg) ? limitArg : 500,
    refresh: {
      mode: 'manual',
      status: 'success',
      storageBackend: 'filesystem',
    },
  });
  const summaryMarkdown = buildPricingClusterPerformanceSnapshotMarkdown(report);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await mkdir(path.dirname(summaryPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(summaryPath, summaryMarkdown, 'utf8');

  console.log(`Wrote pricing cluster performance to ${outputPath}`);
  console.log(`Wrote pricing cluster performance summary to ${summaryPath}`);
  console.log(
    JSON.stringify(
      {
        generatedAt: report.generatedAt,
        reportingWindow: report.reportingWindow,
        snapshotState: report.snapshotState,
        hasRealSignals: report.hasRealSignals,
        totalPages: report.summary.totalPages,
        sourceStates: report.sourceStates,
        pagesWithTraffic: report.summary.pagesWithTraffic,
        pagesWithGeneratorClicks: report.summary.pagesWithGeneratorClicks,
        pagesWithCheckoutIntent: report.summary.pagesWithCheckoutIntent,
        pagesWithPurchaseSignals: report.summary.pagesWithPurchaseSignals,
        highPotentialPages: report.summary.highPotentialPages,
        needsMappingUpgradePages: report.summary.needsMappingUpgradePages,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
