import Link from "next/link";
import {
  FileQuestion,
  ArrowLeft,
  BookOpen,
  Rocket,
  Server,
  Settings,
} from "lucide-react";

const POPULAR_PAGES = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    description: "Learn what laramail is and how it works",
    icon: BookOpen,
  },
  {
    title: "Quick Start",
    href: "/docs/quick-start",
    description: "Send your first email in under 2 minutes",
    icon: Rocket,
  },
  {
    title: "Providers",
    href: "/docs/providers",
    description: "SMTP, SendGrid, SES, Mailgun, Resend, Postmark & more",
    icon: Server,
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    description: "Set up mailers, templates, and queue drivers",
    icon: Settings,
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/50">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gradient mb-3">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page doesn&apos;t exist. It may have been moved or removed.
        </p>

        {/* Popular pages */}
        <div className="grid gap-3 text-left mb-8">
          {POPULAR_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/30 hover:bg-muted/50"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <page.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {page.title}
                </span>
                <p className="text-xs text-muted-foreground">
                  {page.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Back home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
