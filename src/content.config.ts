import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  baseFee: z.number(), // monthly fixed fee in its currency
  currency: z.enum(['USD', 'CNY']),
  feePct: z.number().optional().default(0),
  quotaType: z.enum(['credits', 'currency']),
  quotaAmount: z.number(), // e.g. 20000 credits or 60 USD
  quotaCurrency: z.enum(['USD', 'CNY']).nullable().optional(),
  rateLimit: z
    .object({
      hasLimit: z.enum(['yes', 'no', 'unknown']),
      rolling5h: z.string().nullable().optional(),
      weekly: z.string().nullable().optional(),
      monthly: z.string().nullable().optional(),
    })
    .optional(),
  poolNote: z.string().optional(),
});

const providers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/providers' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nameZh: z.string().optional(),
    kind: z.enum(['official', 'subscription']),
    currency: z.enum(['USD', 'CNY']),
    description: z.string().optional(),
    plans: z.array(planSchema).default([]),
    billing: z
      .object({
        baseFee: z.number(),
        feePct: z.number().optional(),
        currency: z.enum(['USD', 'CNY']).optional(),
        poolNote: z.string().optional(),
      })
      .optional(),
    models: z.array(
      z.object({
        modelId: z.string(), // reference to models collection id
        input: z.number(),
        output: z.number(),
        cacheRead: z.number().nullable(),
        cacheWrite: z.number().nullable(),
        credits: z.number().optional(), // monthly credits / pool face value
        modelQuota: z.number().nullable().optional(), // model-specific allowance e.g. 20 USD
        multiplier: z.number().nullable().optional(), // pool consumption multiplier e.g. 70/20 = 3.5
        quota90: z.number().optional(), // published M(90,9,1) quota (millions)
        quota95: z.number().optional(), // published M(95,4,1) quota
      }),
    ),
  }),
});

const textOfficialSchema = z.object({
  input: z.number(), // official API price per 1M
  output: z.number(),
  cacheRead: z.number().nullable(),
  cacheWrite: z.number().nullable().default(0),
  currency: z.enum(['USD', 'CNY']).default('CNY'),
});

const imageOfficialSchema = z.object({
  pricing: z.object({
    '1k': z.number(),
    '2k': z.number(),
  }),
  currency: z.enum(['USD', 'CNY']).default('CNY'),
});

const models = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/models' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    modality: z.enum(['text', 'image', 'video']).default('text'),
    official: z.union([textOfficialSchema, imageOfficialSchema]),
    providers: z.array(z.string()).default([]), // provider ids that carry this model
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { providers, models, blog };
