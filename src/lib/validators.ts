import { z } from 'zod';

export const generateSchema = z
  .object({
    scenarioSlug: z.string().min(1).max(120),
    message: z.string().min(6).max(4000).optional(),
    clientMessage: z.string().min(6).max(4000).optional(),
    sourcePage: z.enum(['home', 'scenario', 'tool']).optional(),
    serviceType: z
      .enum([
        'designer',
        'developer',
        'copywriter',
        'marketer',
        'video_editor',
        'consultant',
        'other',
      ])
      .optional(),
    tone: z
      .enum(['professional_firm', 'warm_confident', 'direct', 'diplomatic'])
      .optional(),
    goal: z
      .enum([
        'protect_price',
        'keep_relationship',
        'close_faster',
        'offer_scope_reduction',
      ])
      .optional(),
    userRateContext: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.message && !data.clientMessage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'message is required.',
        path: ['message'],
      });
    }
  })
  .transform((data) => ({
    scenarioSlug: data.scenarioSlug,
    message: (data.message || data.clientMessage || '').trim(),
    sourcePage: data.sourcePage || 'tool',
    serviceType: data.serviceType || 'other',
    tone: data.tone || 'professional_firm',
    goal: data.goal || 'protect_price',
    userRateContext: data.userRateContext,
  }));

export const checkoutSchema = z
  .object({
    packageId: z.enum(['quick_help', 'pro', 'studio']).optional(),
    packCode: z.enum(['quick_help', 'pro', 'studio']).optional(),
    email: z.string().email().optional(),
    anonymousSessionId: z.string().min(10).max(120).optional(),
    scenarioSlug: z.string().min(1).max(120).optional(),
    returnTo: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.packageId && !data.packCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'packageId is required.',
        path: ['packageId'],
      });
    }
  })
  .transform((data) => ({
    packageId: data.packageId || data.packCode!,
    email: data.email,
    anonymousSessionId: data.anonymousSessionId,
    scenarioSlug: data.scenarioSlug,
    returnTo: data.returnTo,
  }));

export const magicLinkSchema = z.object({
  email: z.string().email(),
  callbackUrl: z.string().max(500).optional(),
});
