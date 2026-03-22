import { LARAMAIL_VERSION } from "./constants";

export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
  /** Version when this item was added. Shows "New" badge when it matches LARAMAIL_VERSION. */
  since?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "CLI Commands", href: "/docs/cli", since: "1.1.1" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Configuration", href: "/docs/configuration" },
      { title: "Sending Emails", href: "/docs/sending-emails" },
    ],
  },
  {
    title: "Providers",
    items: [
      { title: "Overview", href: "/docs/providers" },
      { title: "SMTP", href: "/docs/providers/smtp" },
      { title: "SendGrid", href: "/docs/providers/sendgrid" },
      { title: "AWS SES", href: "/docs/providers/ses" },
      { title: "Mailgun", href: "/docs/providers/mailgun" },
      { title: "Resend", href: "/docs/providers/resend" },
      { title: "Postmark", href: "/docs/providers/postmark" },
      { title: "Log Transport", href: "/docs/log-transport", since: "1.3.0" },
      {
        title: "Custom Providers",
        href: "/docs/custom-providers",
        since: "1.3.0",
      },
    ],
  },
  {
    title: "Template Engines",
    items: [
      { title: "Overview", href: "/docs/templates" },
      { title: "Handlebars", href: "/docs/templates/handlebars" },
      { title: "EJS", href: "/docs/templates/ejs" },
      { title: "Pug", href: "/docs/templates/pug" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Markdown Mail", href: "/docs/markdown-mail" },
      { title: "Email Priority", href: "/docs/email-priority", since: "1.1.6" },
      {
        title: "Embedded Images",
        href: "/docs/embedded-images",
        since: "1.1.6",
      },
      { title: "Email Events", href: "/docs/email-events", since: "1.1.6" },
      { title: "Email Preview", href: "/docs/email-preview", since: "1.1.6" },
      { title: "Queue Support", href: "/docs/queue" },
      { title: "Rate Limiting", href: "/docs/rate-limiting", since: "1.1.6" },
      {
        title: "Always-To Redirect",
        href: "/docs/always-to",
        since: "1.3.0",
      },
      { title: "Error Handling", href: "/docs/error-handling", since: "1.4.0" },
      { title: "Provider Failover", href: "/docs/failover" },
    ],
  },
  {
    title: "Testing & Reference",
    items: [
      { title: "Testing", href: "/docs/testing" },
      { title: "Type Reference", href: "/docs/type-reference" },
      { title: "Exports", href: "/docs/exports" },
      { title: "Examples", href: "/docs/examples" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Migration Guide", href: "/docs/migration" },
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
];

/** Check if a nav item should show a "New" badge (only for current version). */
export function isNewItem(item: NavItem): boolean {
  return item.since === LARAMAIL_VERSION;
}

// Flatten for search index
export function getAllNavItems(): NavItem[] {
  return NAVIGATION.flatMap((section) =>
    section.items.flatMap((item) => [item, ...(item.items ?? [])])
  );
}
