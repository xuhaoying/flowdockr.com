import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { buildPricingClusterAuditReport } from '../../src/lib/pricing-cluster-audit';

const report = buildPricingClusterAuditReport();
const outputPath = path.resolve(
  process.cwd(),
  'docs/ops/pricing-cluster-audit.json'
);

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Wrote pricing cluster audit to ${outputPath}`);
  console.log(
    JSON.stringify(
      {
        totalPages: report.summary.totalPages,
        dedicatedGeneratorMappings: report.summary.dedicatedGeneratorMappings,
        weakGeneratorFitPages: report.summary.weakGeneratorFitPages,
        keywordOverlapRiskPages: report.summary.keywordOverlapRiskPages,
        scenarioViewInstrumentedPages:
          report.summary.scenarioViewInstrumentedPages,
        checkoutAttributedPages: report.summary.checkoutAttributedPages,
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
