import packageJson from '../../package.json';

// Load .env files for scripts (tsx/ts-node) - but NOT in Edge Runtime or browser
// This ensures scripts can read DATABASE_URL and other env vars
// Check for real Node.js environment by looking at global 'process' properties
if (
  typeof process !== 'undefined' &&
  typeof process.cwd === 'function' &&
  !process.env.NEXT_RUNTIME // Skip if in Next.js runtime (already loaded)
) {
  try {
    const dotenv = require('dotenv');
    dotenv.config({ path: '.env.development' });
    dotenv.config({ path: '.env', override: false });
  } catch (e) {
    // Silently fail - dotenv might not be available in some environments
  }
}

export type ConfigMap = Record<string, string>;

const FLOWDOCKR_PRODUCTION_SITE_URL = 'https://www.flowdockr.com';
const LOCAL_APP_URL = 'http://localhost:3000';

function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) {
    return trimmed;
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/+$/, '');
  }
}

function normalizeLocalHostname(hostname: string) {
  const trimmed = hostname.trim();
  if (!trimmed || trimmed === '0.0.0.0' || trimmed === '::' || trimmed === '[::]') {
    return 'localhost';
  }

  return trimmed;
}

function isLocalHostname(hostname: string) {
  const normalized = hostname.trim();
  return (
    normalized === 'localhost' ||
    normalized === '127.0.0.1' ||
    normalized === '0.0.0.0' ||
    normalized === '::' ||
    normalized === '[::]'
  );
}

function getConfiguredHostname(configuredUrl: string) {
  if (!configuredUrl) {
    return '';
  }

  try {
    return new URL(configuredUrl).hostname;
  } catch {
    return '';
  }
}

function getDevelopmentAppUrl(configuredUrl: string) {
  const port = process.env.PORT?.trim();
  const explicitHost = process.env.HOSTNAME?.trim() || process.env.HOST?.trim() || '';
  const configuredHostname = getConfiguredHostname(configuredUrl);
  const hostname = isLocalHostname(explicitHost)
    ? normalizeLocalHostname(explicitHost)
    : configuredHostname
      ? normalizeLocalHostname(configuredHostname)
      : 'localhost';

  if (port) {
    return `http://${hostname}:${port}`;
  }

  return configuredUrl || LOCAL_APP_URL;
}

function getAppUrl() {
  const configuredUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL?.trim() || '');

  if (process.env.NODE_ENV !== 'production') {
    return normalizeUrl(getDevelopmentAppUrl(configuredUrl));
  }

  if (configuredUrl) {
    return configuredUrl;
  }

  return FLOWDOCKR_PRODUCTION_SITE_URL;
}

function getSiteUrl(appUrl: string) {
  return process.env.NODE_ENV === 'production'
    ? FLOWDOCKR_PRODUCTION_SITE_URL
    : appUrl;
}

const appUrl = getAppUrl();
const siteUrl = getSiteUrl(appUrl);

export const envConfigs: ConfigMap = {
  app_url: appUrl,
  site_url: siteUrl,
  app_name: process.env.NEXT_PUBLIC_APP_NAME ?? 'FlowDockr',
  app_description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
    'Client Work OS for freelancers',
  app_logo: process.env.NEXT_PUBLIC_APP_LOGO ?? '/logo.png',
  app_favicon: process.env.NEXT_PUBLIC_APP_FAVICON ?? '/favicon.ico',
  app_preview_image:
    process.env.NEXT_PUBLIC_APP_PREVIEW_IMAGE ?? '/preview.png',
  theme: process.env.NEXT_PUBLIC_THEME ?? 'default',
  appearance: process.env.NEXT_PUBLIC_APPEARANCE ?? 'system',
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  database_url: process.env.DATABASE_URL ?? '',
  database_auth_token: process.env.DATABASE_AUTH_TOKEN ?? '',
  database_provider: process.env.DATABASE_PROVIDER ?? 'postgresql',
  db_schema_file: process.env.DB_SCHEMA_FILE ?? './src/config/db/schema.ts',
  // PostgreSQL schema name (e.g. 'web'). Default: 'public'
  db_schema: process.env.DB_SCHEMA ?? 'public',
  // Drizzle migrations journal table name (avoid conflicts across projects)
  db_migrations_table:
    process.env.DB_MIGRATIONS_TABLE ?? '__drizzle_migrations',
  // Drizzle migrations journal schema (default in drizzle-kit is 'drizzle')
  // We keep 'public' as template default for stability on fresh Supabase DBs.
  db_migrations_schema: process.env.DB_MIGRATIONS_SCHEMA ?? 'drizzle',
  // Output folder for drizzle-kit generated migrations
  db_migrations_out:
    process.env.DB_MIGRATIONS_OUT ?? './src/config/db/migrations',
  db_singleton_enabled: process.env.DB_SINGLETON_ENABLED || 'false',
  db_max_connections: process.env.DB_MAX_CONNECTIONS || '1',
  auth_url: normalizeUrl(process.env.AUTH_URL?.trim() || appUrl),
  auth_secret: process.env.AUTH_SECRET ?? '', // openssl rand -base64 32
  cron_secret: process.env.CRON_SECRET ?? '',
  version: packageJson.version,
  locale_detect_enabled:
    process.env.NEXT_PUBLIC_LOCALE_DETECT_ENABLED ?? 'false',
};
