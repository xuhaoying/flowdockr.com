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
  const override = getIndexingOverride();
  if (override === 'true') {
    return false;
  }

  if (override === 'false') {
    return true;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const isVercelProduction = process.env.VERCEL
    ? process.env.VERCEL_ENV === 'production'
    : true;
  const isVercelPreviewDomain =
    normalizeHostname(hostname).endsWith('.vercel.app');

  return !isProduction || !isVercelProduction || isVercelPreviewDomain;
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
