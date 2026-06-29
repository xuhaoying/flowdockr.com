import { consumeCredit, grantCredits } from '@/lib/credits';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
  convertToModelMessages,
  createIdGenerator,
  generateId,
  stepCountIs,
  streamText,
  TextUIPart,
  tool,
  UIMessage,
  validateUIMessages,
} from 'ai';
import { z } from 'zod';

import { findChatById } from '@/shared/models/chat';
import {
  ChatMessageStatus,
  createChatMessage,
  getChatMessages,
  NewChatMessage,
} from '@/shared/models/chat_message';
import { getAllConfigs } from '@/shared/models/config';
import { getUserInfo } from '@/shared/models/user';

const DEFAULT_CHAT_MODEL = 'openai/gpt-4.1-mini';
const DEFAULT_ALLOWED_CHAT_MODELS = [DEFAULT_CHAT_MODEL, 'openai/gpt-4o-mini'];

export async function POST(req: Request) {
  let refundConsumedChatCredit:
    | ((reason: string, error?: unknown) => Promise<void>)
    | undefined;

  try {
    const {
      chatId,
      message,
      model,
      webSearch,
      reasoning,
    }: {
      chatId: string;
      message: UIMessage;
      model: string;
      webSearch: boolean;
      reasoning?: boolean;
    } = await req.json();

    if (!chatId || !model) {
      throw new Error('invalid params');
    }

    if (!message || !message.parts || message.parts.length === 0) {
      throw new Error('invalid message');
    }

    // check user sign
    const user = await getUserInfo();
    if (!user) {
      throw new Error('no auth, please sign in');
    }

    // check chat
    const chat = await findChatById(chatId);
    if (!chat) {
      throw new Error('chat not found');
    }

    if (chat.userId !== user?.id) {
      throw new Error('no permission to access this chat');
    }

    const safeModel = resolveAllowedChatModel(model);

    const configs = await getAllConfigs();
    const openrouterApiKey = configs.openrouter_api_key;
    if (!openrouterApiKey) {
      throw new Error('openrouter_api_key is not set');
    }

    const openrouterBaseUrl = configs.openrouter_base_url;

    const chargedCredits = 1;
    let charged = false;
    let refunded = false;
    refundConsumedChatCredit = async (reason: string, error?: unknown) => {
      if (!charged || refunded) {
        return;
      }

      refunded = true;
      try {
        await grantCredits({
          userId: user.id,
          credits: chargedCredits,
          type: 'generation_refund',
          reason,
          metadata: {
            scenarioSlug: 'chat-message',
            source: 'tool',
            chatId,
            error: errorToMetadata(error),
          },
        });
      } catch (refundError) {
        console.error('failed to refund chat generation credit', refundError);
      }
    };

    await consumeCredit({
      userId: user.id,
      scenarioSlug: 'chat-message',
      sourcePage: 'tool',
      amount: chargedCredits,
      reason: 'Chat message generation',
    });
    charged = true;

    const currentTime = new Date();

    const metadata = {
      model: safeModel,
      webSearch,
      reasoning,
    };

    const provider = 'openrouter';

    // save user message to database
    const userMessage: NewChatMessage = {
      id: generateId().toLowerCase(),
      chatId,
      userId: user?.id,
      status: ChatMessageStatus.CREATED,
      createdAt: currentTime,
      updatedAt: currentTime,
      role: 'user',
      parts: JSON.stringify(message.parts),
      metadata: JSON.stringify(metadata),
      model: safeModel,
      provider: provider,
    };
    await createChatMessage(userMessage);

    const openrouter = createOpenRouter({
      apiKey: openrouterApiKey,
      baseURL: openrouterBaseUrl ? openrouterBaseUrl : undefined,
    });

    // load previous messages from database
    const previousMessages = await getChatMessages({
      userId: user.id,
      chatId,
      status: ChatMessageStatus.CREATED,
      page: 1,
      limit: 10,
    });

    let validatedMessages: UIMessage[] = [];
    if (previousMessages.length > 0) {
      validatedMessages = previousMessages.reverse().map((message) => ({
        id: message.id,
        role: message.role,
        parts: message.parts ? JSON.parse(message.parts) : [],
      })) as UIMessage[];
    }

    const result = streamText({
      model: openrouter.chat(safeModel),
      messages: convertToModelMessages(validatedMessages),
      onError: async ({ error }) => {
        await refundConsumedChatCredit?.('Chat generation failed', error);
      },
      onAbort: async () => {
        await refundConsumedChatCredit?.('Chat generation aborted');
      },
    });

    // send sources and reasoning back to the client
    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: Boolean(reasoning),
      originalMessages: validatedMessages,
      generateMessageId: createIdGenerator({
        size: 16,
      }),
      onFinish: async ({ messages }) => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'assistant') {
          const assistantMessage: NewChatMessage = {
            id: generateId().toLowerCase(),
            chatId,
            userId: user?.id,
            status: ChatMessageStatus.CREATED,
            createdAt: currentTime,
            updatedAt: currentTime,
            model: safeModel,
            provider: provider,
            parts: JSON.stringify(lastMessage.parts),
            role: 'assistant',
          };
          await createChatMessage(assistantMessage);
        }
      },
    });
  } catch (e: any) {
    await refundConsumedChatCredit?.('Chat generation failed before streaming', e);
    console.log('chat failed:', e);
    return new Response(
      e.message === 'NO_CREDITS' ? 'insufficient credits' : e.message,
      {
        status: e.message === 'NO_CREDITS' ? 402 : 500,
      }
    );
  }
}

function resolveAllowedChatModel(requestedModel: unknown): string {
  const allowedModels = String(process.env.FLOWDOCKR_ALLOWED_CHAT_MODELS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const allowlist = new Set(
    allowedModels.length > 0 ? allowedModels : DEFAULT_ALLOWED_CHAT_MODELS
  );

  if (typeof requestedModel !== 'string' || !allowlist.has(requestedModel)) {
    return DEFAULT_CHAT_MODEL;
  }

  return requestedModel;
}

function errorToMetadata(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return {
    message: String(error || 'UNKNOWN_ERROR'),
  };
}
