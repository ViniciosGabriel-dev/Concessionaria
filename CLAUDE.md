# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Top Multimarcas** — a Brazilian used car dealership website built with Next.js 14 (App Router) and TypeScript. No external state management or UI libraries.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

## Architecture

### Routing (App Router)

- `/` → [app/page.tsx](app/page.tsx) — Home page, assembles all sections
- `/estoque` → [app/estoque/page.tsx](app/estoque/page.tsx) — Full stock page
- `/veiculo/[id]` → [app/veiculo/[id]/page.tsx](app/veiculo/[id]/page.tsx) — Vehicle detail page (statically generated via `generateStaticParams`)
- `/sobre` → [app/sobre/page.tsx](app/sobre/page.tsx) — About page

### Vehicle Data

All vehicles are hardcoded in [lib/veiculos.ts](lib/veiculos.ts) in the `veiculos` array. The `Veiculo` interface is defined there too. `formatBRL` and `formatKm` utility functions live in the same file — always use these for displaying prices and mileage.

Key data notes:
- `fotos` is an **integer** (photo count badge), not image URLs. `img` is the single card image URL.
- `parcela` is pre-calculated per vehicle at 1.29%/month over 60 installments — it is not computed at runtime.
- `destaque: true` vehicles appear first in the default sort order.

### Key Components

- [components/StockBrowser.tsx](components/StockBrowser.tsx) — `'use client'`; contains the Hero section, brand filter pills, search/filter bar, stock grid with pagination, and `VehicleCard`. All filter state lives here. `getFiltered()` is a pure function that takes filter values and returns the filtered+sorted array.
- [components/VeiculoContactForm.tsx](components/VeiculoContactForm.tsx) — Sticky sidebar contact form on the vehicle detail page.
- [components/SimilarCarousel.tsx](components/SimilarCarousel.tsx) — Horizontal scroll carousel of related vehicles on the detail page.
- [components/WaFloat.tsx](components/WaFloat.tsx) — Floating WhatsApp button present on all pages.

### WhatsApp Number

`WA_NUMBER = '5511977254727'` is defined in [components/StockBrowser.tsx](components/StockBrowser.tsx) and also appears in other components. Use search-and-replace across the codebase to update it.

### Styling

All styles are in [app/globals.css](app/globals.css) — a single CSS file using custom properties. No CSS modules or Tailwind.

CSS design tokens at `:root`:
- Brand red: `#E8282A`, brand blue: `#1D6DD4`, WhatsApp green: `#25D366`
- `--radius: 10px`, `--r-sm: 6px`
- `--shadow`, `--shadow-md`, `--shadow-lg`

### Image Handling

The detail page and most components use plain `<img>` tags with `eslint-disable-next-line @next/next/no-img-element` comments — this is intentional since images come from Unsplash URLs. The brand logo pills in `StockBrowser` use Next.js `<Image>` with local `/public` assets.

## Language & Locale

All user-facing text is in Brazilian Portuguese. Currency is BRL formatted as `R$ X.XXX` (no decimals, dot as thousands separator) via `formatBRL`. Dates and numbers follow Brazilian conventions (`pt-BR` locale).
