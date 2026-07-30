# LOG — Lord of Gyms & Fitness

Brand and marketing site for **LOG (Lord of Gyms & Fitness)** — a premium
fitness destination and athletic streetwear brand from Kathmandu, Nepal.

> Train hard. Wear it louder.

The site presents the brand identity, the logo system, the merchandise range,
and hosts the downloadable brand-book PDFs.

## Tech

- [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (new-york style)
- [Magic UI](https://magicui.design) (animated components, built on `motion`)
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | Lint with ESLint           |

## Project layout

```
public/brand/          Brand PDFs (pitch deck + logo/identity presentation)
src/app/               App Router entry, layout, global styles, favicon
src/components/
  log-mark.tsx         The LOG monogram, drawn as SVG geometry
  sections/            Landing-page sections
  ui/                  shadcn/ui primitives
  magicui/             Magic UI components
```

## Brand palette

Two colours, no exceptions.

| Token        | Hex       | Role                       |
| ------------ | --------- | -------------------------- |
| Tar Road     | `#17181D` | Primary base / foundation  |
| Elegant Grey | `#8B9096` | Industrial / modern accent |
| White        | `#FFFFFF` | Ground / reverse only      |

See [`CLAUDE.md`](./CLAUDE.md) for the full brand and contribution rules.

## Brand documents

The source brand book and pitch deck are served from `public/brand/` and linked
from the **Brand Book** section of the site.
