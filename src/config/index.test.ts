import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = { ...process.env };

async function loadConfigModule() {
  vi.resetModules();
  return import('./index');
}

describe('config app/auth url resolution', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('prefers the active dev server hostname and port over the localhost:3000 fallback', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
    vi.stubEnv('HOSTNAME', '127.0.0.1');
    vi.stubEnv('PORT', '3010');
    delete process.env.AUTH_URL;

    const { envConfigs } = await loadConfigModule();

    expect(envConfigs.app_url).toBe('http://127.0.0.1:3010');
    expect(envConfigs.auth_url).toBe('http://127.0.0.1:3010');
  });

  it('preserves an explicit auth url when one is configured', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
    vi.stubEnv('HOSTNAME', '127.0.0.1');
    vi.stubEnv('PORT', '3010');
    vi.stubEnv('AUTH_URL', 'https://auth.example.com');

    const { envConfigs } = await loadConfigModule();

    expect(envConfigs.app_url).toBe('http://127.0.0.1:3010');
    expect(envConfigs.auth_url).toBe('https://auth.example.com');
  });
});
