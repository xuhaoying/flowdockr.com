// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  consumeCredit: vi.fn(),
  grantCredits: vi.fn(),
  createOpenRouter: vi.fn(),
  convertToModelMessages: vi.fn((messages) => messages),
  createIdGenerator: vi.fn(() => () => 'assistant_msg_1'),
  generateId: vi.fn(() => 'generated_msg_1'),
  streamText: vi.fn(),
  findChatById: vi.fn(),
  createChatMessage: vi.fn(),
  getChatMessages: vi.fn(),
  getAllConfigs: vi.fn(),
  getUserInfo: vi.fn(),
}));

vi.mock('@/lib/credits', () => ({
  consumeCredit: mocks.consumeCredit,
  grantCredits: mocks.grantCredits,
}));

vi.mock('@openrouter/ai-sdk-provider', () => ({
  createOpenRouter: mocks.createOpenRouter,
}));

vi.mock('ai', () => ({
  convertToModelMessages: mocks.convertToModelMessages,
  createIdGenerator: mocks.createIdGenerator,
  generateId: mocks.generateId,
  stepCountIs: vi.fn(),
  streamText: mocks.streamText,
  tool: vi.fn(),
}));

vi.mock('@/shared/models/chat', () => ({
  findChatById: mocks.findChatById,
}));

vi.mock('@/shared/models/chat_message', () => ({
  ChatMessageStatus: {
    CREATED: 'created',
    DELETED: 'deleted',
  },
  createChatMessage: mocks.createChatMessage,
  getChatMessages: mocks.getChatMessages,
}));

vi.mock('@/shared/models/config', () => ({
  getAllConfigs: mocks.getAllConfigs,
}));

vi.mock('@/shared/models/user', () => ({
  getUserInfo: mocks.getUserInfo,
}));

function makeChatRequest() {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId: 'chat_123',
      model: 'openai/gpt-4o-mini',
      webSearch: false,
      reasoning: false,
      message: {
        id: 'user_msg_1',
        role: 'user',
        parts: [{ type: 'text', text: 'Please help with this objection.' }],
      },
    }),
  });
}

describe('/api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getUserInfo.mockResolvedValue({ id: 'user_123' });
    mocks.findChatById.mockResolvedValue({
      id: 'chat_123',
      userId: 'user_123',
    });
    mocks.getAllConfigs.mockResolvedValue({
      openrouter_api_key: 'test-openrouter-key',
      openrouter_base_url: '',
    });
    mocks.createOpenRouter.mockReturnValue({
      chat: vi.fn((model: string) => ({ model })),
    });
    mocks.consumeCredit.mockResolvedValue(4);
    mocks.grantCredits.mockResolvedValue(5);
    mocks.createChatMessage.mockResolvedValue({});
    mocks.getChatMessages.mockResolvedValue([
      {
        id: 'user_msg_1',
        role: 'user',
        parts: JSON.stringify([
          { type: 'text', text: 'Please help with this objection.' },
        ]),
      },
    ]);
    mocks.streamText.mockImplementation(() => ({
      toUIMessageStreamResponse: vi.fn(() => new Response('ok')),
    }));
  });

  it('does not refund when credit consumption fails before any charge is recorded', async () => {
    mocks.consumeCredit.mockRejectedValueOnce(new Error('NO_CREDITS'));

    const { POST } = await import('./route');
    const response = await POST(makeChatRequest());

    expect(response.status).toBe(402);
    expect(await response.text()).toBe('insufficient credits');
    expect(mocks.grantCredits).not.toHaveBeenCalled();
  });

  it('refunds exactly once when the streaming provider reports a fatal error', async () => {
    let onError: ((event: { error: unknown }) => PromiseLike<void> | void) | undefined;
    mocks.streamText.mockImplementation((options) => {
      onError = options.onError;
      return {
        toUIMessageStreamResponse: vi.fn(() => new Response('ok')),
      };
    });

    const { POST } = await import('./route');
    const response = await POST(makeChatRequest());

    expect(response.status).toBe(200);
    expect(mocks.consumeCredit).toHaveBeenCalledWith({
      userId: 'user_123',
      scenarioSlug: 'chat-message',
      sourcePage: 'tool',
      amount: 1,
      reason: 'Chat message generation',
    });

    await onError?.({ error: new Error('provider down') });
    await onError?.({ error: new Error('provider down again') });

    expect(mocks.grantCredits).toHaveBeenCalledTimes(1);
    expect(mocks.grantCredits).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user_123',
        credits: 1,
        type: 'generation_refund',
        reason: 'Chat generation failed',
        metadata: expect.objectContaining({
          chatId: 'chat_123',
          scenarioSlug: 'chat-message',
          source: 'tool',
        }),
      })
    );
  });
});
