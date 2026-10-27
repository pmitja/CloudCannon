import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsEntry = CollectionEntry<'news'>;

/** Categories in display order. `slug` is used for the filter URLs: /insights/<slug>/ */
export const categories = [
  { id: 'press-release', slug: 'press-releases', label: 'Press releases' },
  { id: 'in-the-news', slug: 'in-the-news', label: 'In the news' },
  { id: 'research', slug: 'research', label: 'Research' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? 'News';
}

/** All articles, newest first, optionally filtered by category. */
export async function getNews(category?: string) {
  const all = await getCollection('news');
  return all
    .filter((entry) => !category || category === 'all' || entry.data.category === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function newsUrl(entry: NewsEntry) {
  return `/news/${entry.id}/`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
