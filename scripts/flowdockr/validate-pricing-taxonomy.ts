import {
  pricingFamilies,
  pricingScenarioBlueprints,
  pricingScenarios,
} from '../../src/lib/pricing-cluster';

type Issue = {
  level: 'error' | 'warn';
  message: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function validatePricingTaxonomy(): Issue[] {
  const issues: Issue[] = [];
  const scenarioBySlug = new Map(pricingScenarios.map((scenario) => [scenario.slug, scenario]));

  for (const scenario of pricingScenarios) {
    const { schema } = scenario;
    const page = schema.page;
    const content = schema.content;

    if (page.cluster !== 'pricing') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.page.cluster must be 'pricing'.`,
      });
    }

    if (scenario.tier !== page.tier) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier mismatch (content=${scenario.tier}, schema=${page.tier}).`,
      });
    }

    if (!page.primaryKeywords.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.page.primaryKeywords cannot be empty.`,
      });
    }

    if (!page.supportKeywords.length) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.page.supportKeywords is empty.`,
      });
    }

    if (!content.decisionGoals.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.content.decisionGoals cannot be empty.`,
      });
    }

    if (!content.realRisks.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.content.realRisks cannot be empty.`,
      });
    }

    if (scenario.responsePaths.length < 3) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: responsePaths should have at least 3 strategy options.`,
      });
    }

    if (scenario.copyReadyExamples.length < 3) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: copyReadyExamples should include concise, warm, and firm variants.`,
      });
    }

    if (scenario.nextDecisionSlugs.length < 3) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: nextDecisionSlugs should include at least 3 next-decision links.`,
      });
    }

    if (!scenario.toolCta) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: toolCta is empty; scenario-specific CTA is recommended.`,
      });
    }

    if (content.strategyPathIds.length < 2) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.content.strategyPathIds should have at least 2 paths.`,
      });
    }

    if (!page.scopeIn.length) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.page.scopeIn is empty.`,
      });
    }

    if (!page.scopeOut.length) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.page.scopeOut is empty.`,
      });
    }

    if (page.tier === 'tier1' && page.pageRole !== 'pillar') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier1 must use pageRole='pillar'.`,
      });
    }

    if (page.tier === 'tier3' && page.pageRole !== 'entry') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier3 must use pageRole='entry'.`,
      });
    }

    if (page.pageRole === 'entry' && page.tier !== 'tier3') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: pageRole='entry' must be tier3.`,
      });
    }

    if (page.pageRole === 'bridge' && page.tier !== 'tier2') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: pageRole='bridge' must be tier2.`,
      });
    }

    if (!page.primaryKeywords.map(normalize).includes(normalize(scenario.primaryKeyword))) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: scenario.primaryKeyword is not included in schema.page.primaryKeywords.`,
      });
    }

    const normalizedPrimary = page.primaryKeywords.map(normalize);
    const normalizedSupport = page.supportKeywords.map(normalize);
    const schemaKeywords = [...normalizedPrimary, ...normalizedSupport];
    const variantMissing = scenario.keywordVariants.filter(
      (variant) => !schemaKeywords.includes(normalize(variant))
    );

    if (variantMissing.length > 0) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: ${variantMissing.length} keywordVariants are not mirrored in schema.page.supportKeywords.`,
      });
    }

    const overlap = normalizedPrimary.filter((keyword) => normalizedSupport.includes(keyword));

    if (overlap.length > 0) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: duplicated keywords across primary/support: ${unique(overlap).join(', ')}.`,
      });
    }

    for (const slug of scenario.nextDecisionSlugs) {
      if (slug === scenario.slug) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: nextDecisionSlugs cannot include itself.`,
        });
      } else if (!scenarioBySlug.has(slug)) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: nextDecisionSlugs contains unknown slug '${slug}'.`,
        });
      }
    }

    for (const slug of page.doNotCompeteWith) {
      if (slug === scenario.slug) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: doNotCompeteWith cannot include itself.`,
        });
      } else if (!scenarioBySlug.has(slug)) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: doNotCompeteWith contains unknown slug '${slug}'.`,
        });
      }
    }
  }

  const blueprintBySlug = new Map(
    pricingScenarioBlueprints.map((blueprint) => [blueprint.slug, blueprint])
  );

  if (pricingScenarioBlueprints.length !== pricingScenarios.length) {
    issues.push({
      level: 'error',
      message: `Blueprint count mismatch: ${pricingScenarioBlueprints.length} blueprints for ${pricingScenarios.length} scenarios.`,
    });
  }

  for (const scenario of pricingScenarios) {
    const blueprint = blueprintBySlug.get(scenario.slug);
    if (!blueprint) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: missing pricing scenario blueprint.`,
      });
      continue;
    }

    if (blueprint.hubParent !== '/pricing/') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: blueprint.hubParent must be '/pricing/'.`,
      });
    }

    if (!blueprint.nextDecisionLinks.length) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: blueprint.nextDecisionLinks is empty.`,
      });
    }

    for (const link of blueprint.nextDecisionLinks) {
      if (!link.startsWith('/pricing/')) {
        issues.push({
          level: 'warn',
          message: `${scenario.slug}: next decision link '${link}' does not point to pricing cluster.`,
        });
      }
    }
  }

  const primaryKeywordOwner = new Map<string, string>();

  for (const scenario of pricingScenarios) {
    for (const keyword of scenario.schema.page.primaryKeywords.map(normalize)) {
      const owner = primaryKeywordOwner.get(keyword);
      if (owner && owner !== scenario.slug) {
        issues.push({
          level: 'error',
          message: `Primary keyword collision: '${keyword}' is owned by both ${owner} and ${scenario.slug}.`,
        });
      } else {
        primaryKeywordOwner.set(keyword, scenario.slug);
      }
    }
  }

  for (const family of pricingFamilies) {
    const count = pricingScenarios.filter((scenario) => scenario.schema.page.family === family.id).length;
    if (count === 0) {
      issues.push({
        level: 'error',
        message: `Family '${family.id}' has no scenarios.`,
      });
    }
  }

  const tier1Count = pricingScenarios.filter((scenario) => scenario.schema.page.tier === 'tier1').length;
  const tier3Count = pricingScenarios.filter((scenario) => scenario.schema.page.tier === 'tier3').length;

  if (tier1Count < 4) {
    issues.push({
      level: 'warn',
      message: `Tier1 scenarios are below target: ${tier1Count} (expected >= 4).`,
    });
  }

  if (tier3Count < 1) {
    issues.push({
      level: 'warn',
      message: 'Tier3 entry scenarios are missing (expected >= 1).',
    });
  }

  return issues;
}

function main() {
  const issues = validatePricingTaxonomy();
  const errors = issues.filter((issue) => issue.level === 'error');
  const warns = issues.filter((issue) => issue.level === 'warn');

  if (issues.length === 0) {
    console.log('Pricing taxonomy validation passed with 0 issues.');
    process.exit(0);
  }

  for (const issue of issues) {
    const prefix = issue.level === 'error' ? '[ERROR]' : '[WARN]';
    console.log(`${prefix} ${issue.message}`);
  }

  console.log(`\nSummary: ${errors.length} error(s), ${warns.length} warning(s).`);

  if (errors.length > 0) {
    process.exit(1);
  }
}

main();
