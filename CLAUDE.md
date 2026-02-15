# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation website for `@impruthvi/nodemail` — a Laravel-inspired Node.js email library. Built with Next.js 16, MDX, and Tailwind CSS v4. The site serves as the public-facing docs at nodemail.impruthvi.me.

## Commands

- `bun dev` — Start dev server
- `bun run build` — Production build
- `bun run lint` — Run ESLint
- `bun start` — Start production server

## Architecture

**Next.js 16 App Router + MDX documentation site.**

- **`app/page.tsx`** — Landing page with hero, features grid, code preview, providers showcase, CTA
- **`app/docs/layout.tsx`** — Docs layout: header + sidebar (left) + main content + table of contents (right)
- **`app/docs/**/page.mdx`** — All documentation pages are MDX files
- **`lib/navigation.ts`** — Defines the sidebar navigation structure (`NAVIGATION` array of `NavSection[]`). This is the single source of truth for doc page ordering and hierarchy.
- **`lib/constants.ts`** — Site-wide constants
- **`lib/utils.ts`** — Utility functions (includes shadcn `cn()` helper)
- **`mdx-components.tsx`** — MDX component overrides (root-level, required by `@next/mdx`)

### Component Organization

- **`components/ui/`** — shadcn/ui components (new-york style, Radix primitives)
- **`components/landing/`** — Landing page sections (hero, features-grid, code-preview, etc.)
- **`components/layout/`** — Shared layout: header, sidebar, footer, table-of-contents, mobile-nav
- **`components/docs/`** — Doc-specific: code copy button, API tables, callouts
- **`components/search/`** — Search dialog (cmdk-based)
- **`components/effects/`** — Visual effects: particle background, glow cards, gradient orbs

### Key Configuration

- **MDX**: Configured via `@next/mdx` in `next.config.ts` with `pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]`
- **Syntax highlighting**: Shiki via `@shikijs/rehype`
- **shadcn/ui**: new-york style, Radix UI, lucide icons, CSS variables, `@/` path aliases
- **Theming**: `next-themes` with dark mode default, class-based theme switching
- **Animations**: `motion` (Framer Motion) + `tw-animate-css`
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`
- **Tailwind CSS v4**: Uses `@tailwindcss/postcss`

### Adding a New Doc Page

1. Create `app/docs/<section>/page.mdx`
2. Add the entry to `NAVIGATION` in `lib/navigation.ts`

### Content Source

`DOCUMENT.md` at the project root contains the complete reference documentation for the `@impruthvi/nodemail` package. This is the authoritative source for all doc page content.
