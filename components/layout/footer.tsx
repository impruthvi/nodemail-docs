import Link from "next/link";
import { Github, Package, BookOpen, Heart } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Documentation",
    links: [
      { label: "Getting Started", href: "/docs/introduction" },
      { label: "Configuration", href: "/docs/configuration" },
      { label: "Providers", href: "/docs/providers" },
      { label: "Templates", href: "/docs/templates" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/impruthvi/nodemail",
        external: true,
      },
      {
        label: "npm",
        href: "https://www.npmjs.com/package/@impruthvi/nodemail",
        external: true,
      },
      {
        label: "Issues",
        href: "https://github.com/impruthvi/nodemail/issues",
        external: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Examples", href: "/docs/examples" },
      { label: "Migration Guide", href: "/docs/migration" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-indigo to-neon-cyan shadow-lg shadow-neon-indigo/20">
                <span className="text-sm font-bold text-white">N</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                nodemail
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Laravel-inspired email library for Node.js with full TypeScript
              support.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/impruthvi/nodemail"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.npmjs.com/package/@impruthvi/nodemail"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="npm"
              >
                <Package className="h-4 w-4" />
              </a>
              <Link
                href="/docs"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Documentation"
              >
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            MIT License &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/impruthvi"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              @impruthvi
            </a>
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with
            <Heart className="inline h-3 w-3 text-neon-pink" />
            and{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
