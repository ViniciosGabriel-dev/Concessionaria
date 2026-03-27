# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AutoElite Multimarcas** — a Brazilian used car dealership single-page marketing website. Three files, no build process.

## Running the Project

Open `index.html` directly in a browser, or serve locally:

```bash
python -m http.server 8000
# or
npx http-server .
```

No compilation, bundling, or installation required.

## Architecture

### Files

- [index.html](index.html) — Full page structure with all sections as semantic HTML
- [script.js](script.js) — All interactivity and data; no framework
- [style.css](style.css) — All styles; ~1000 lines with CSS custom properties

### Vehicle Data

Vehicles are hardcoded in the `veiculos` array in [script.js](script.js). Each object has: `marca`, `modelo`, `ano`, `km`, `cambio`, `combustivel`, `cor`, `preco`, `parcela`, `img`, `fotos`, `opcionais[]`, `destaque`. To add or update vehicles, edit this array directly.

### Key JavaScript Patterns

- `renderVeiculos(lista)` — Rebuilds the stock grid from a vehicle array; called after every filter/sort
- `filtrarVeiculos()` — Reads all filter inputs and calls `renderVeiculos` with the filtered subset
- `calcularParcela()` — Payment simulator using hardcoded 1.29%/month interest rate
- `observeCards()` — Must be called after each `renderVeiculos` to attach scroll animations to new cards
- `formatBRL(n)` / `formatKm(n)` — Formatting utilities; use these whenever displaying prices or mileage

### Vehicle Data Notes

- `fotos` is an **integer** (photo count badge), not image URLs. Only `img` holds the single card image URL.
- `parcela` is pre-calculated and stored per vehicle — it does not use `calcularParcela()` (which is for the simulator only).

### WhatsApp Number

`5511999999999` is hardcoded in multiple places: header, floating button, vehicle cards (via `renderVeiculos`), footer, and the empty-state fallback in `renderVeiculos`. Use search-and-replace across all three files to update it.

### CSS Design Tokens

Defined at `:root` in [style.css](style.css):
- Brand red: `#E8282A`, brand blue: `#1D6DD4`, WhatsApp green: `#25D366`
- Radius: `--radius: 10px`, `--r-sm: 6px`
- Shadows: `--shadow`, `--shadow-md`, `--shadow-lg`

### External Dependencies (CDN only)

- Google Fonts — Inter typeface
- Unsplash — vehicle images via URL
- WhatsApp Business API — all contact buttons link to `https://wa.me/...`

## Language & Locale

All user-facing text is in Brazilian Portuguese. Currency is BRL formatted as `R$ X.XXX,XX` (dot as thousands separator, comma as decimal). Dates and numbers follow Brazilian conventions.
