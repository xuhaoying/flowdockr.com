import { afterEach, describe, expect, it } from 'vitest';

import {
  isSearchIndexingEnabledForHost,
  shouldBlockSearchIndexingForHost,
} from './search-indexing';

describe('search indexing gate', () => {
  const originalAllowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING;

  afterEach(() => {
    if (originalAllowIndexing === undefined) {
      delete process.env.NEXT_PUBLIC_ALLOW_INDEXING;
      return;
    }

    process.env.NEXT_PUBLIC_ALLOW_INDEXING = originalAllowIndexing;
  });

  it('allows indexing only for the official production host when explicitly enabled', () => {
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = 'true';

    expect(shouldBlockSearchIndexingForHost('www.flowdockr.com')).toBe(false);
    expect(isSearchIndexingEnabledForHost('www.flowdockr.com')).toBe(true);
    expect(shouldBlockSearchIndexingForHost('preview.flowdockr.com')).toBe(
      true
    );
    expect(shouldBlockSearchIndexingForHost('localhost:3000')).toBe(true);
  });

  it('blocks indexing when the override is not explicitly enabled', () => {
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = '';

    expect(shouldBlockSearchIndexingForHost('www.flowdockr.com')).toBe(true);
    expect(isSearchIndexingEnabledForHost('www.flowdockr.com')).toBe(false);
  });
});
