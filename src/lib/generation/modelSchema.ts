import { z } from 'zod';

const nonEmptyString = z
  .string()
  .transform((value) => value.trim().replace(/^["'\s]+|["'\s]+$/g, ''))
  .refine((value) => value.length > 0, 'Expected non-empty text.');

const boundedReply = nonEmptyString.refine(
  (value) => value.length >= 30 && value.length <= 700,
  'Reply must be between 30 and 700 characters.'
);

const shortBullet = nonEmptyString.refine(
  (value) => value.length >= 10 && value.length <= 220,
  'Bullet must be between 10 and 220 characters.'
);

export const generationModelSchema = z
  .object({
    strategy: z
      .object({
        objective: shortBullet,
        why_it_works: z.array(shortBullet).min(1).max(3),
        what_to_avoid: z.array(shortBullet).min(1).max(3),
        negotiation_framing: nonEmptyString
          .refine(
            (value) => value.length <= 240,
            'Negotiation framing must be 240 characters or fewer.'
          )
          .optional(),
      })
      .strict(),
    replies: z
      .object({
        professional: boundedReply,
        firm: boundedReply,
        softer: boundedReply,
      })
      .strict(),
    risk_insights: z.array(shortBullet).min(1).max(3),
    follow_up: z
      .object({
        reply: boundedReply,
        direction: shortBullet,
      })
      .strict(),
  })
  .strict();

export type GenerationModelOutput = z.infer<typeof generationModelSchema>;
