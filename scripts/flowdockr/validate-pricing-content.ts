import { getAllGuides } from '../../src/lib/content/getGuideBySlug';
import { getPricingHub } from '../../src/lib/content/getPricingHub';
import { getAllScenarios } from '../../src/lib/content/getScenarioBySlug';
import { getAllTools } from '../../src/lib/content/getToolBySlug';

type Issue = {
  level: 'error' | 'warn';
  message: string;
};

function normalizePath(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }

  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function pushError(issues: Issue[], message: string) {
  issues.push({ level: 'error', message });
}

function pushWarn(issues: Issue[], message: string) {
  issues.push({ level: 'warn', message });
}

function findDuplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }
    seen.add(value);
  }

  return [...duplicates];
}

function validatePricingContent(): Issue[] {
  const issues: Issue[] = [];

  const scenarios = getAllScenarios();
  const guides = getAllGuides();
  const tools = getAllTools();
  const hub = getPricingHub();

  if (scenarios.length < 8) {
    pushWarn(
      issues,
      `Expected at least 8 pricing scenarios, found ${scenarios.length}.`
    );
  }

  if (guides.length !== 3) {
    pushWarn(issues, `Expected 3 launch guides, found ${guides.length}.`);
  }

  if (tools.length !== 2) {
    pushWarn(issues, `Expected 2 launch tools, found ${tools.length}.`);
  }

  const scenarioSlugs = scenarios.map((scenario) => scenario.slug);
  const guideSlugs = guides.map((guide) => guide.slug);
  const toolSlugs = tools.map((tool) => tool.slug);

  for (const duplicate of findDuplicateValues(scenarioSlugs)) {
    pushError(issues, `Duplicate scenario slug detected: '${duplicate}'.`);
  }
  for (const duplicate of findDuplicateValues(guideSlugs)) {
    pushError(issues, `Duplicate guide slug detected: '${duplicate}'.`);
  }
  for (const duplicate of findDuplicateValues(toolSlugs)) {
    pushError(issues, `Duplicate tool slug detected: '${duplicate}'.`);
  }

  const scenarioSlugsSet = new Set(scenarioSlugs);
  const toolSlugsSet = new Set(toolSlugs);
  const pageRoleByScenarioSlug = new Map(
    scenarios.map((scenario) => [scenario.slug, scenario.pageRole])
  );

  const scenarioUrlSet = new Set(
    scenarios.map((scenario) => normalizePath(scenario.url))
  );
  const guideUrlSet = new Set(guides.map((guide) => normalizePath(guide.url)));
  const toolUrlSet = new Set(tools.map((tool) => normalizePath(tool.url)));
  const disallowedToolCtaLabels = new Set([
    'try tool',
    'use ai',
    'generate reply',
  ]);

  const allH1s = [
    hub.h1,
    ...scenarios.map((scenario) => scenario.h1),
    ...guides.map((guide) => guide.h1),
    ...tools.map((tool) => tool.h1),
  ];
  const allMetaTitles = [
    hub.metaTitle,
    ...scenarios.map((scenario) => scenario.metaTitle),
    ...guides.map((guide) => guide.metaTitle),
    ...tools.map((tool) => tool.metaTitle),
  ];
  const allMetaDescriptions = [
    hub.metaDescription,
    ...scenarios.map((scenario) => scenario.metaDescription),
    ...guides.map((guide) => guide.metaDescription),
    ...tools.map((tool) => tool.metaDescription),
  ];

  for (const duplicate of findDuplicateValues(
    allH1s.map((value) => value.trim().toLowerCase())
  )) {
    pushError(
      issues,
      `Duplicate h1 detected across pricing cluster pages: '${duplicate}'.`
    );
  }

  for (const duplicate of findDuplicateValues(
    allMetaTitles.map((value) => value.trim().toLowerCase())
  )) {
    pushError(
      issues,
      `Duplicate metaTitle detected across pricing cluster pages: '${duplicate}'.`
    );
  }

  for (const duplicate of findDuplicateValues(
    allMetaDescriptions.map((value) => value.trim().toLowerCase())
  )) {
    pushError(
      issues,
      `Duplicate metaDescription detected across pricing cluster pages: '${duplicate}'.`
    );
  }

  for (const scenario of scenarios) {
    if (scenario.cluster !== 'pricing') {
      pushError(issues, `${scenario.slug}: cluster must be 'pricing'.`);
    }

    if (scenario.hubParent !== '/pricing/') {
      pushError(issues, `${scenario.slug}: hubParent must be '/pricing/'.`);
    }

    if (normalizePath(scenario.url) !== `/pricing/${scenario.slug}`) {
      pushError(
        issues,
        `${scenario.slug}: url must match '/pricing/${scenario.slug}/' (actual: '${scenario.url}').`
      );
    }

    if (scenario.strategyPaths.length !== 3) {
      pushError(
        issues,
        `${scenario.slug}: strategyPaths must contain exactly 3 paths.`
      );
    }

    if (scenario.nextDecisionLinks.length < 3) {
      pushError(
        issues,
        `${scenario.slug}: nextDecisionLinks must contain at least 3 links.`
      );
    }

    for (const link of scenario.nextDecisionLinks) {
      const href = normalizePath(link.href);

      if (href.startsWith('/pricing/')) {
        if (!scenarioUrlSet.has(href)) {
          pushError(
            issues,
            `${scenario.slug}: nextDecisionLinks contains unknown scenario href '${link.href}'.`
          );
        }
        continue;
      }

      if (href.startsWith('/guides/')) {
        if (!guideUrlSet.has(href)) {
          pushError(
            issues,
            `${scenario.slug}: nextDecisionLinks contains unknown guide href '${link.href}'.`
          );
        }
        continue;
      }

      if (href.startsWith('/tools/')) {
        if (!toolUrlSet.has(href)) {
          pushError(
            issues,
            `${scenario.slug}: nextDecisionLinks contains unknown tool href '${link.href}'.`
          );
        }
        continue;
      }

      if (href.startsWith('/scope/') || href.startsWith('/client-red-flags/')) {
        pushWarn(
          issues,
          `${scenario.slug}: nextDecisionLinks points to future cluster bridge '${link.href}'.`
        );
        continue;
      }

      pushWarn(
        issues,
        `${scenario.slug}: nextDecisionLinks uses non-standard href '${link.href}'.`
      );
    }

    for (const blockedSlug of scenario.doNotCompeteWith) {
      if (blockedSlug === scenario.slug) {
        pushError(
          issues,
          `${scenario.slug}: doNotCompeteWith cannot include itself.`
        );
        continue;
      }

      if (!scenarioSlugsSet.has(blockedSlug)) {
        pushError(
          issues,
          `${scenario.slug}: doNotCompeteWith references unknown scenario slug '${blockedSlug}'.`
        );
      }
    }

    if (!toolSlugsSet.has(scenario.toolCta.toolSlug)) {
      pushError(
        issues,
        `${scenario.slug}: toolCta.toolSlug '${scenario.toolCta.toolSlug}' does not exist in tools.json.`
      );
    }

    const normalizedButtonLabel = scenario.toolCta.buttonLabel
      .trim()
      .toLowerCase();
    if (disallowedToolCtaLabels.has(normalizedButtonLabel)) {
      pushError(
        issues,
        `${scenario.slug}: toolCta.buttonLabel '${scenario.toolCta.buttonLabel}' is too generic. Use task-specific CTA language.`
      );
    }
  }

  if (hub.cluster !== 'pricing') {
    pushError(
      issues,
      `Hub cluster must be 'pricing' (actual: '${hub.cluster}').`
    );
  }

  if (normalizePath(hub.url) !== '/pricing') {
    pushError(issues, `Hub url must be '/pricing/' (actual: '${hub.url}').`);
  }

  for (const bucket of hub.decisionBuckets) {
    const href = normalizePath(bucket.href);
    if (!scenarioUrlSet.has(href)) {
      pushError(
        issues,
        `Hub decision bucket references unknown scenario href '${bucket.href}'.`
      );
    }
  }

  for (const href of hub.featuredScenarios) {
    const normalizedHref = normalizePath(href);
    if (!scenarioUrlSet.has(normalizedHref)) {
      pushError(
        issues,
        `Hub featuredScenarios contains unknown href '${href}'.`
      );
    }

    const featuredSlug = normalizedHref.split('/').filter(Boolean).at(-1);
    if (!featuredSlug) {
      pushError(
        issues,
        `Hub featuredScenarios contains invalid href '${href}'.`
      );
      continue;
    }

    const pageRole = pageRoleByScenarioSlug.get(featuredSlug);
    if (pageRole !== 'pillar') {
      pushError(
        issues,
        `Hub featuredScenarios href '${href}' must reference a pillar scenario (actual pageRole: '${pageRole ?? 'unknown'}').`
      );
    }
  }

  if (hub.featuredScenarios.length !== 4) {
    pushWarn(
      issues,
      `Hub featuredScenarios should include exactly 4 pillar scenarios in launch mode (actual: ${hub.featuredScenarios.length}).`
    );
  }

  for (const href of hub.relatedGuides) {
    if (!guideUrlSet.has(normalizePath(href))) {
      pushError(issues, `Hub relatedGuides contains unknown href '${href}'.`);
    }
  }

  for (const href of hub.relatedTools) {
    if (!toolUrlSet.has(normalizePath(href))) {
      pushError(issues, `Hub relatedTools contains unknown href '${href}'.`);
    }
  }

  for (const guide of guides) {
    if (guide.cluster !== 'pricing') {
      pushError(issues, `${guide.slug}: cluster must be 'pricing'.`);
    }

    if (normalizePath(guide.url) !== `/guides/${guide.slug}`) {
      pushError(
        issues,
        `${guide.slug}: url must match '/guides/${guide.slug}/' (actual: '${guide.url}').`
      );
    }

    if (!toolSlugsSet.has(guide.toolCta.toolSlug)) {
      pushError(
        issues,
        `${guide.slug}: toolCta.toolSlug '${guide.toolCta.toolSlug}' does not exist in tools.json.`
      );
    }

    for (const link of guide.recommendedScenarios) {
      if (!scenarioUrlSet.has(normalizePath(link.href))) {
        pushError(
          issues,
          `${guide.slug}: recommendedScenarios contains unknown scenario href '${link.href}'.`
        );
      }
    }
  }

  for (const tool of tools) {
    if (tool.cluster !== 'pricing') {
      pushError(issues, `${tool.slug}: cluster must be 'pricing'.`);
    }

    if (normalizePath(tool.url) !== `/tools/${tool.slug}`) {
      pushError(
        issues,
        `${tool.slug}: url must match '/tools/${tool.slug}/' (actual: '${tool.url}').`
      );
    }

    const inputNames = tool.inputs.map((input) => input.name);
    for (const duplicate of findDuplicateValues(inputNames)) {
      pushError(issues, `${tool.slug}: duplicate input.name '${duplicate}'.`);
    }

    const clientMessageInput = tool.inputs.find(
      (input) => input.name === 'clientMessage'
    );
    if (!clientMessageInput) {
      pushError(issues, `${tool.slug}: inputs must include 'clientMessage'.`);
    } else if (!clientMessageInput.required) {
      pushError(
        issues,
        `${tool.slug}: 'clientMessage' input must be required.`
      );
    }

    for (const link of tool.relatedScenarios) {
      if (!scenarioUrlSet.has(normalizePath(link.href))) {
        pushError(
          issues,
          `${tool.slug}: relatedScenarios contains unknown scenario href '${link.href}'.`
        );
      }
    }
  }

  return issues;
}

function main() {
  const issues = validatePricingContent();
  const errors = issues.filter((issue) => issue.level === 'error');
  const warnings = issues.filter((issue) => issue.level === 'warn');

  if (issues.length === 0) {
    console.log('Pricing content validation passed with 0 issues.');
    process.exit(0);
  }

  for (const issue of issues) {
    const prefix = issue.level === 'error' ? '[ERROR]' : '[WARN]';
    console.log(`${prefix} ${issue.message}`);
  }

  console.log(
    `\nSummary: ${errors.length} error(s), ${warnings.length} warning(s).`
  );

  if (errors.length > 0) {
    process.exit(1);
  }
}

main();
