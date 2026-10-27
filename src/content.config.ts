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

export const collections = { pages };
