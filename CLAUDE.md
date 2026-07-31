# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## Project

**LOG — Lord of Gyms & Fitness.** Marketing site for LOG, a premium gym in
Kapur Complex, Hetauda, Nepal. The site sells the gym: its programs (strength,
cardio, Zumba, dance), the retail supplement bar, and membership. It keeps the
strong LOG brand look (mark, palette, type) but the content is gym-first, aimed
at prospective members — not a brand/identity presentation. The brand-book PDFs
are still linked (from the footer) for partners/press.

Tagline: **"Train hard. Wear it louder."**

## Stack

- **Next.js 16** (App Router, Turbopack, React 19) — see the note below
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`, no `tailwind.config`)
- **shadcn/ui** (new-york style, `radix-ui`, `lucide-react`) — `src/components/ui`
- **Magic UI** components (built on `motion`) — `src/components/magicui`

> [!IMPORTANT]
> This is Next.js 16 — APIs, conventions, and file structure may differ from
> older versions. When unsure, read the relevant guide in
> `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Commands

```bash
npm run dev     # start the dev server (http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint — keep this clean before committing
```

## Structure

```
public/brand/                 # the two brand PDFs (served + linked from the site)
src/app/
  layout.tsx                  # fonts (Inter / Anton / JetBrains Mono), metadata, <html class="dark">
  page.tsx                    # composes the landing sections
  globals.css                 # brand tokens + shadcn vars + Magic UI keyframes (Tailwind v4)
  icon.svg                    # favicon — the LOG monogram
src/components/
  log-mark.tsx                # the LOG monogram, drawn as SVG geometry
  icons.tsx                   # Instagram / TikTok glyphs (lucide dropped brand icons)
  illustrations.tsx           # plate emblems, supplement tubs, engraved plate badge,
                              #   plate glyph — geometry, never clip-art
  textures.tsx                # film-grain overlay (SVG fractal noise)
  section-heading.tsx         # shared eyebrow + title + description
  site-header.tsx / site-footer.tsx
  sections/                   # hero, ticker, programs, shop, membership,
                              #   contact, cta
  ui/                         # shadcn primitives (button, card, badge)
  magicui/                    # marquee, blur-fade, animated-grid-pattern, dot-pattern,
                              #   number-ticker, shimmer-button, animated-shiny-text
src/lib/
  utils.ts                    # cn() helper
  site.ts                     # single source of truth for contact + social details
components.json               # shadcn config
```

## Brand rules (do not break these)

The identity is deliberately strict — the design mirrors the brand book in
`public/brand/`.

- **Two colours, no exceptions.**
  - `--tar-road` `#17181D` — primary base / foundation (matte near-black)
  - `--elegant-grey` `#8B9096` — industrial / modern accent
  - White is a **ground or reverse only**, never a third brand colour.
  - No gradients, metallics, or seasonal specials on the mark.
- **Type**
  - Display: **Anton** — heavy, caps only, tracked out (`.font-display`).
  - Body: **Inter** — clean humanist sans.
  - Labels/tags: caps, small, tracked 15% (`.tracking-label`).
- **The mark** (`LogMark`, `src/components/log-mark.tsx`)
  - The `O` is a weight plate (ring with a bored centre).
  - A single horizontal bar channel cuts every letter at the same height.
  - Every dimension derives from the stem weight, so it rebuilds at any scale.
  - Prefer white-on-Tar-Road (the master pairing). Below small sizes, drop the
    wordline and use the monogram alone.

Brand tokens live in `:root` in `globals.css` and are exposed to Tailwind via
`@theme inline` (e.g. `bg-tar-road`, `text-elegant-grey`, `font-display`).

## Conventions

- The site is **dark by default** (`<html class="dark">`); the palette is
  authored dark-first because white-on-Tar-Road is the master lockup.
- Section components are server components; anything using `motion` (Magic UI)
  is a `"use client"` component. Keep that split.
- shadcn/Magic UI CLIs reach `ui.shadcn.com` / `magicui.design`, which are
  blocked in this environment. Add components by writing the files by hand
  (that is how the current ones were added), installing any needed deps from
  npm.
- Run `npm run lint` and `npm run build` before committing; keep lint clean.
- **Contact details** (phone, address, Instagram/TikTok) live in `src/lib/site.ts`
  — update them there, not inline. Current: Kapur Complex, Hetauda ·
  `@logfitnesshtf` · +977 98252 54929.
- `lucide-react` no longer ships brand icons (Instagram, TikTok, etc.). Draw new
  social glyphs in `src/components/icons.tsx` rather than importing from lucide.
- Stock-photo hosts (Unsplash, Pexels, …) are blocked by this environment's
  network policy. Visuals are drawn as SVG in `src/components/illustrations.tsx`
  in the brand's geometry-not-clip-art style. Real gym photography, when
  available, goes in `public/images/` and can replace the emblem/tub panels.
