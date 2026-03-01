export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
  badge?: string;
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
      { title: "Email Priority", href: "/docs/email-priority", badge: "New" },
      { title: "Embedded Images", href: "/docs/embedded-images", badge: "New" },
      { title: "Email Events", href: "/docs/email-events", badge: "New" },
      { title: "Email Preview", href: "/docs/email-preview", badge: "New" },
      { title: "Queue Support", href: "/docs/queue" },
      { title: "Rate Limiting", href: "/docs/rate-limiting", badge: "New" },
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

// Flatten for search index
export function getAllNavItems(): NavItem[] {
  return NAVIGATION.flatMap((section) =>
    section.items.flatMap((item) => [item, ...(item.items ?? [])])
  );
}
