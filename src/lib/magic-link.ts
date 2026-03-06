import { envConfigs } from '@/config';
import { getAuth } from '@/core/auth';

function normalizeCallbackUrl(callbackUrl?: string): string {
  const fallback = `${envConfigs.app_url}/dashboard`;
  const raw = String(callbackUrl || '').trim();
  if (!raw) {
    return fallback;
  }

  try {
    const parsed = new URL(raw, envConfigs.app_url);
    const appOrigin = new URL(envConfigs.app_url).origin;

    if (parsed.origin !== appOrigin) {
      return fallback;
    }

    return parsed.toString();
  } catch {
    return fallback;
  }
}

export async function sendMagicLink(email: string, callbackUrl?: string) {
  const auth = await getAuth();
  const callbackURL = normalizeCallbackUrl(callbackUrl);

  await (auth.api as any).signInMagicLink({
    headers: new Headers({
      origin: envConfigs.app_url,
      host: new URL(envConfigs.app_url).host,
    }),
    body: {
      email,
      callbackURL,
    },
  });
}
