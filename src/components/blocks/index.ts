/**
 * Section library. The key is the `_name` used in page front matter and in cloudcannon.config.yml.
 * To add a section: create the component, add it here, add a structure in cloudcannon.config.yml.
 */
import { editableBlocks } from './editable';
// Reads the News collection at build time, so it can't re-render in the browser.
// CloudCannon still edits its text in place; the cards refresh on the next build.
import LatestNews from './LatestNews.astro';

export const blocks = {
  ...editableBlocks,
  latest_news: LatestNews,
} as const;
