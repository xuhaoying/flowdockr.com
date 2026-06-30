import { afterEach, describe, expect, it } from 'vitest';

import {
  isSearchIndexingEnabledForHost,
  shouldBlockSearchIndexingForHost,
} from './search-indexing';

describe('search indexing gate', () => {
  const originalAllowIndexing = process.env.ALLOW_INDEXING;
  const originalPublicAllowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING;

  afterEach(() => {
    if (originalAllowIndexing === undefined) {
      delete process.env.ALLOW_INDEXING;
    } else {
      process.env.ALLOW_INDEXING = originalAllowIndexing;
    }

    if (originalPublicAllowIndexing === undefined) {
      delete process.env.NEXT_PUBLIC_ALLOW_INDEXING;
    } else {
      process.env.NEXT_PUBLIC_ALLOW_INDEXING = originalPublicAllowIndexing;
    }
  });

  it('allows indexing for the official production host by default', () => {
    delete process.env.ALLOW_INDEXING;

    expect(shouldBlockSearchIndexingForHost('www.flowdockr.com')).toBe(false);
    expect(isSearchIndexingEnabledForHost('www.flowdockr.com')).toBe(true);
    expect(shouldBlockSearchIndexingForHost('preview.flowdockr.com')).toBe(
      true
    );
    expect(shouldBlockSearchIndexingForHost('localhost:3000')).toBe(true);
  });

  it('blocks indexing when the override is explicitly disabled', () => {
    process.env.ALLOW_INDEXING = 'false';

    expect(shouldBlockSearchIndexingForHost('www.flowdockr.com')).toBe(true);
    expect(isSearchIndexingEnabledForHost('www.flowdockr.com')).toBe(false);
  });

  it('does not trust public build-time indexing variables', () => {
    process.env.ALLOW_INDEXING = 'false';
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';

    expect(shouldBlockSearchIndexingForHost('www.flowdockr.com')).toBe(true);
  });
});
