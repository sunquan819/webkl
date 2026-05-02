import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('LifeTips'),
  }),
});

const blogEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('LifeTips'),
  }),
});

const blogJa = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('LifeTips'),
  }),
});

const blogKo = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('LifeTips'),
  }),
});

const blogDe = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('LifeTips'),
  }),
});

const newsSchema = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string().optional(),
  source: z.string().optional(),
});

const newsZh = defineCollection({
  type: 'content',
  schema: newsSchema,
});

const newsEn = defineCollection({
  type: 'content',
  schema: newsSchema,
});

const newsJa = defineCollection({
  type: 'content',
  schema: newsSchema,
});

const newsKo = defineCollection({
  type: 'content',
  schema: newsSchema,
});

const newsDe = defineCollection({
  type: 'content',
  schema: newsSchema,
});

export const collections = {
  blog,
  'blog-en': blogEn,
  'blog-ja': blogJa,
  'blog-ko': blogKo,
  'blog-de': blogDe,
  'news-zh': newsZh,
  'news-en': newsEn,
  'news-ja': newsJa,
  'news-ko': newsKo,
  'news-de': newsDe,
};