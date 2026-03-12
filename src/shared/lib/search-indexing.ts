const FLOWDOCKR_PRODUCTION_HOSTNAME = 'www.flowdockr.com';

function getHostname(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase().split(':')[0];
}

function getIndexingOverride() {
  const value = process.env.NEXT_PUBLIC_ALLOW_INDEXING;
  return value === 'true' || value === 'false' ? value : undefined;
}

export function shouldBlockSearchIndexingForHost(hostname: string) {
  const normalizedHostname = normalizeHostname(hostname);
  const isOfficialProductionHost =
    normalizedHostname === FLOWDOCKR_PRODUCTION_HOSTNAME;
  const isIndexingExplicitlyEnabled = getIndexingOverride() === 'true';

  return (
    !normalizedHostname ||
    !isOfficialProductionHost ||
    !isIndexingExplicitlyEnabled
  );
}

export function isSearchIndexingEnabledForHost(hostname: string) {
  return !shouldBlockSearchIndexingForHost(hostname);
}

export function isSearchIndexingEnabled(appUrl?: string) {
  const hostname = getHostname(appUrl || process.env.NEXT_PUBLIC_APP_URL || '');
  return isSearchIndexingEnabledForHost(hostname);
}

export function shouldBlockSearchIndexing(appUrl?: string) {
  return !isSearchIndexingEnabled(appUrl);
}
