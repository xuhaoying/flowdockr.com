// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const limitMock = vi.fn();
const whereMock = vi.fn(() => ({ limit: limitMock }));
const fromMock = vi.fn(() => ({ where: whereMock }));
const selectMock = vi.fn(() => ({ from: fromMock }));

vi.mock('@/core/db', () => ({
  db: vi.fn(() => ({
    select: selectMock,
  })),
}));

describe('/api/prompts/by-title', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('queries prompts with a public field whitelist', async () => {
    limitMock.mockResolvedValue([
      {
        id: 'prompt_1',
        title: 'Public prompt',
        description: 'Shown on listing',
        image: null,
        promptTitle: 'reply-generator',
        promptDescription: 'Public description',
        status: 'published',
      },
    ]);

    const { GET } = await import('./route');
    const response = await GET(
      new NextRequest(
        'http://localhost/api/prompts/by-title?title=reply-generator'
      )
    );

    const payload = await response.json();
    const selectedFields = Object.keys(selectMock.mock.calls[0]?.[0] || {});

    expect(response.status).toBe(200);
    expect(selectedFields).toEqual([
      'id',
      'title',
      'description',
      'image',
      'promptTitle',
      'promptDescription',
      'status',
    ]);
    expect(selectedFields).not.toContain('userId');
    expect(payload.data).toEqual({
      id: 'prompt_1',
      title: 'Public prompt',
      description: 'Shown on listing',
      image: null,
      promptTitle: 'reply-generator',
      promptDescription: 'Public description',
      status: 'published',
    });
  });
});
