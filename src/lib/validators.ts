import { z } from 'zod';

export const generateSchema = z.object({
  scenarioSlug: z.string().min(1).max(120),
  clientMessage: z.string().min(8).max(3000),
  serviceType: z.enum([
    'designer',
    'developer',
    'copywriter',
    'marketer',
    'video_editor',
    'consultant',
    'other',
  ]),
  tone: z.enum(['professional_firm', 'warm_confident', 'direct', 'diplomatic']),
  goal: z.enum([
    'protect_price',
    'keep_relationship',
    'close_faster',
    'offer_scope_reduction',
  ]),
  userRateContext: z.string().max(500).optional(),
});

export const checkoutSchema = z.object({
  packageId: z.enum(['starter_10', 'pro_50', 'studio_200']),
  email: z.string().email().optional(),
  anonymousSessionId: z.string().min(10).max(120).optional(),
  scenarioSlug: z.string().min(1).max(120).optional(),
  returnTo: z.string().max(500).optional(),
});

export const magicLinkSchema = z.object({
  email: z.string().email(),
  callbackUrl: z.string().max(500).optional(),
});
