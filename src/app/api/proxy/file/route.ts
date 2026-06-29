import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { NextRequest, NextResponse } from 'next/server';

import { getAllConfigs } from '@/shared/models/config';

export const runtime = 'nodejs';

const MAX_PROXY_BYTES = 10 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 10_000;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') || '';

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const target = new URL(url);
    if (!['https:', 'http:'].includes(target.protocol)) {
      return new NextResponse('Unsupported URL protocol', { status: 400 });
    }

    const allowedHosts = await getAllowedProxyHosts();
    if (!isAllowedHost(target.hostname, allowedHosts)) {
      return new NextResponse('URL host is not allowed', { status: 403 });
    }

    if (await resolvesToPrivateAddress(target.hostname)) {
      return new NextResponse('URL host is not allowed', { status: 403 });
    }

    const response = await fetch(target, {
      redirect: 'manual',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (response.status >= 300 && response.status < 400) {
      return new NextResponse('Redirects are not allowed', { status: 403 });
    }

    if (!response.ok) {
      return new NextResponse(`Failed to fetch file: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > MAX_PROXY_BYTES) {
      return new NextResponse('File is too large', { status: 413 });
    }

    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';
    const body = Buffer.from(await response.arrayBuffer());

    if (body.byteLength > MAX_PROXY_BYTES) {
      return new NextResponse('File is too large', { status: 413 });
    }

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function getAllowedProxyHosts(): Promise<Set<string>> {
  const configs = await getAllConfigs();
  const configuredHosts = [
    configs.r2_domain,
    configs.s3_domain,
    process.env.FLOWDOCKR_PROXY_ALLOWED_HOSTS || '',
  ];
  const hosts = new Set<string>();

  for (const value of configuredHosts) {
    for (const candidate of String(value || '').split(',')) {
      const host = normalizeHost(candidate);
      if (host) {
        hosts.add(host);
      }
    }
  }

  return hosts;
}

function normalizeHost(value: string): string {
  const trimmed = value.trim().toLowerCase().replace(/\/+$/, '');
  if (!trimmed) {
    return '';
  }

  try {
    return new URL(trimmed).hostname;
  } catch {
    try {
      return new URL(`https://${trimmed}`).hostname;
    } catch {
      return '';
    }
  }
}

function isAllowedHost(hostname: string, allowedHosts: Set<string>): boolean {
  const normalized = hostname.toLowerCase();
  for (const allowed of allowedHosts) {
    if (normalized === allowed || normalized.endsWith(`.${allowed}`)) {
      return true;
    }
  }

  return false;
}

async function resolvesToPrivateAddress(hostname: string): Promise<boolean> {
  const normalizedHostname = hostname.replace(/^\[|\]$/g, '');
  const directIpVersion = isIP(normalizedHostname);
  const addresses = directIpVersion
    ? [{ address: normalizedHostname }]
    : await lookup(normalizedHostname, { all: true, verbatim: false });

  return addresses.some(({ address }) => isPrivateAddress(address));
}

function isPrivateAddress(address: string): boolean {
  if (address.includes(':')) {
    const normalized = address.toLowerCase();
    const mappedIpv4 = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mappedIpv4) {
      return isPrivateAddress(mappedIpv4[1]);
    }

    return (
      normalized === '::1' ||
      normalized === '::' ||
      normalized.startsWith('fc') ||
      normalized.startsWith('fd') ||
      normalized.startsWith('fe80:')
    );
  }

  const octets = address.split('.').map((part) => Number(part));
  if (octets.length !== 4 || octets.some((part) => Number.isNaN(part))) {
    return true;
  }

  const [a, b] = octets;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19))
  );
}
