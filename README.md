# LTSE website: Astro + CloudCannon proof of concept

A rebuild of the [ltse.com](https://ltse.com/) homepage, the Partner with LTSE page and the News & Insights section (currently on Webflow). It runs on:

- **Astro**: static site generator. Fast pages, no lock-in, everything lives in Git.
- **shadcn/ui** (React + Tailwind): accessible UI components (navigation menu, mobile sheet, tabs, cards, buttons) restyled with the LTSE brand.
- **CloudCannon**: visual CMS on top of the Git repo. Editors change text, swap images and add, remove or reorder page sections without touching code.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## How it is organised

| What | Where | Edited in CloudCannon as |
| --- | --- | --- |
| Homepage content | `src/content/pages/index.md` | Pages → Home (visual editor) |
| New pages | `src/content/pages/*.md` | Pages → "New page" (block builder) |
| News articles | `src/content/news/*.md` | News & Insights → "New article" |
| Navigation, footer, social links, analytics | `src/data/site.json` | Site settings |
| Section components | `src/components/blocks/*.astro` | "Add section" library |
| Brand colours & fonts | `src/styles/global.css` | developers only |
| shadcn/ui components | `src/components/ui/*` | developers only |
| CMS setup | `cloudcannon.config.yml` | developers only |

### Page builder

Every page is a list of `content_blocks`. Each block has a `_name` that maps to a component in
`src/components/blocks/index.ts`. Editors pick sections from a library (Hero, Logo strip,
Video + press list, Case studies, Intro, Tabs + video, Principles, Statement, Feature columns,
Callout, CTA banner, Latest news). Developers add a new section type in three steps:

1. Create `src/components/blocks/MySection.astro`
2. Register it in `src/components/blocks/editable.ts`
3. Add a structure in `cloudcannon.config.yml` → `_structures.content_blocks`

### News & Insights collection

Articles live in `src/content/news/*.md` (one file per article, the file name is the URL slug).

| Page | URL |
| --- | --- |
| All articles, newest first | `/insights/` |
| Filtered by category | `/insights/press-releases/`, `/insights/in-the-news/`, `/insights/research/` |
| Single article | `/news/<slug>/` (same URLs as ltse.com today, so links and SEO carry over) |

Each article has a title, date, category, source, author, image, short excerpt, an optional link to the
original coverage, and a Markdown body. In CloudCannon editors use **News & Insights → New article** and
write in the Content Editor, or edit the title and body directly on the article page in the Visual Editor.

The **Latest news** section can be added to any page. It shows the newest 1–9 articles, optionally from
one category, and updates by itself when an article is published.

### Analytics

Pick a provider (Plausible, GA4 or Google Tag Manager) and enter an ID in **Site settings → Analytics**.
The script is only added to production builds. You can add more providers in `src/components/Analytics.astro`.

## Connect to CloudCannon (about 5 minutes)

1. Push this folder to a GitHub repository.
2. In CloudCannon: **Create site → connect the repo**. It detects Astro and uses `.cloudcannon/initial-site-settings.json`
   (`npm ci` → `npm run build` → `dist`).
3. Open **Pages → Home** in the Visual Editor and click any heading or text to edit it in place.

## Demo script (for the meeting)

1. Show the site side by side with ltse.com: same structure, same content.
2. In CloudCannon, edit the hero heading on the page itself, then **Save**. A commit lands in Git and the site rebuilds.
3. Add a section (e.g. "CTA banner") and drag it to a new position.
4. Create a new page from the block builder, using the same sections as the homepage.
5. Change the navigation or footer in Site settings. Every page updates.
6. Publish a news article: it appears on /insights/, gets its own page, and shows up in the "Latest news" section on the homepage.
7. Turn on analytics by choosing a provider and pasting an ID.

## Not in this demo yet

- Fonts: LTSE's licensed "Austin News Deck" is swapped for the free Newsreader. Add the licensed font files to `public/fonts` when available.
- Images are loaded from Webflow's CDN. A migration would move them to `public/uploads` or a DAM.
- Other pages, the full news archive (9 sample articles are migrated), forms (contact/advisor), cookie consent, redirects from the Webflow URLs.
