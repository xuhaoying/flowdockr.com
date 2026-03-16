type ToolSourcePage = 'home' | 'scenario' | 'tool';

export function hasCanonicalScenarioFunnel(params: {
  sourcePage: ToolSourcePage;
  funnelScenarioSlug?: string;
}): boolean {
  return (
    params.sourcePage === 'scenario' &&
    Boolean(String(params.funnelScenarioSlug || '').trim())
  );
}

export function getCanonicalScenarioSlugForCheckoutSuccess(params: {
  returnTo: string;
  scenarioSlug: string;
}): string {
  const scenarioSlug = params.scenarioSlug.trim();
  if (!scenarioSlug) {
    return '';
  }

  const pathname = params.returnTo.split('?')[0]?.split('#')[0]?.trim() || '';
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 2) {
    return segments[0] === 'scenario' && segments[1] === scenarioSlug
      ? scenarioSlug
      : '';
  }

  if (segments.length === 3) {
    return segments[1] === 'scenario' && segments[2] === scenarioSlug
      ? scenarioSlug
      : '';
  }

  return '';
}
