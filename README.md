# Nodemail Documentation

Documentation website for [@impruthvi/nodemail](https://www.npmjs.com/package/@impruthvi/nodemail) — a Laravel-inspired Node.js email library.

**Live site:** [nodemail.impruthvi.me](https://nodemail.impruthvi.me)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Content:** MDX with remark-gfm
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (new-york style)
- **Syntax Highlighting:** Shiki
- **Animations:** Motion (Framer Motion)
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/impruthvi/nodemail-doc.git
cd nodemail-doc

# Install dependencies
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
bun run build
bun start
```

### Lint

```bash
bun run lint
```

## Project Structure

```
├── app/
│   ├── docs/           # Documentation pages (MDX)
│   │   ├── layout.tsx  # Docs layout (sidebar + TOC)
│   │   └── **/page.mdx # Individual doc pages
│   ├── page.tsx        # Landing page
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Header, sidebar, footer, TOC
│   ├── landing/        # Landing page sections
│   ├── docs/           # Doc-specific components
│   ├── search/         # Search dialog (cmdk)
│   └── effects/        # Visual effects (particles, etc.)
├── lib/
│   ├── navigation.ts   # Sidebar navigation config
│   ├── constants.ts    # Site-wide constants
│   └── utils.ts        # Utility functions
├── mdx-components.tsx  # MDX component overrides
└── DOCUMENT.md         # Source content for docs
```

## Adding Documentation

1. Create a new MDX file at `app/docs/<section>/page.mdx`
2. Add the navigation entry to `lib/navigation.ts`

Example MDX page:

```mdx
# Page Title

## Section Heading

Content goes here...
```

## Features

- Dark mode (default) with theme switching
- Responsive sidebar navigation
- Table of contents with scroll spy
- Code syntax highlighting with copy button
- Package manager tabs (npm/yarn/pnpm/bun)
- Search dialog (Cmd/Ctrl + K)
- Particle effects and animations

## Documentation Sections

- **Getting Started** — Introduction, Installation, Quick Start
- **Core Concepts** — Configuration, Sending Emails
- **Providers** — SMTP, SendGrid, AWS SES, Mailgun, Resend, Postmark
- **Templates** — Handlebars, EJS, Pug
- **Advanced** — Markdown Mail, Queue Support, Provider Failover
- **Testing & Reference** — Testing, Type Reference, Exports, Examples
- **Resources** — Migration Guide, Troubleshooting

## License

MIT
