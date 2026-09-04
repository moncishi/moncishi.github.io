import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Schema contract for mock data files (T7).
 * Providers are either `official` (官方, ¥ CNY official API) or
 * `subscription` (订阅聚合, $ USD pool).
 */
const providers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/providers' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nameZh: z.string().optional(),
    kind: z.enum(['official', 'subscription']),
    currency: z.enum(['USD', 'CNY']),
    description: z.string().optional(),
    billing: z
      .object({
        baseFee: z.number(), // monthly fixed fee in its currency
        feePct: z.number().optional(), // e.g. 7 = 7%
        currency: z.enum(['USD', 'CNY']).optional(),
        poolNote: z.string().optional(), // mechanism note (zh)
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
        quota90: z.number().optional(), // published M(90,9,1) quota (millions)
        quota95: z.number().optional(), // published M(95,4,1) quota
      }),
    ),
  }),
});

const models = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/models' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    official: z.object({
      input: z.number(), // ¥ CNY official API price per 1M
      output: z.number(),
      cacheRead: z.number().nullable(),
      cacheWrite: z.number().nullable().default(0),
      currency: z.enum(['USD', 'CNY']).default('CNY'),
    }),
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
