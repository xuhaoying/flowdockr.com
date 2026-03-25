import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getPricingClusterPerformanceReport } from '../../src/lib/pricing-cluster-performance';

const outputPath = path.resolve(
  process.cwd(),
  'docs/ops/pricing-cluster-performance.json'
);

async function main() {
  const report = await getPricingClusterPerformanceReport();

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Wrote pricing cluster performance to ${outputPath}`);
  console.log(
    JSON.stringify(
      {
        totalPages: report.summary.totalPages,
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
