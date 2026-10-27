import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Fields can be empty (null) while an editor is still filling in a new page.
const text = z.string().nullish();

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: text,
    seo: z
      .object({ description: text, image: text, no_index: z.boolean().nullish() })
      .nullish(),
    // Each block is picked by `_name` and rendered by BlockRenderer.astro
    content_blocks: z.array(z.looseObject({ _name: z.string() })).nullish(),
  }),
});

// News & Insights articles. The file name is the URL: src/content/news/my-story.md -> /news/my-story/
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: text,
    date: z.coerce.date(),
    category: z.enum(['press-release', 'in-the-news', 'research']).catch('press-release'),
    source: text,
    author: text,
    image: text,
    excerpt: text,
    // Optional link to the original coverage (newspaper article, SEC filing, ...)
    external_url: text,
    seo: z
      .object({ description: text, image: text, no_index: z.boolean().nullish() })
      .nullish(),
  }),
});

export const collections = { pages, news };
