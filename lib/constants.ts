import {
  Mail,
  Zap,
  Layout,
  Shield,
  TestTube,
  FileText,
  type LucideIcon,
} from "lucide-react";

// ─── Brand Colors ────────────────────────────────────────────────────────────
export const BRAND = {
  primary: "#6366f1",
  secondary: "#06b6d4",
  accent: "#f472b6",
  gradient: "linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #f472b6 100%)",
} as const;

// ─── Feature Data ────────────────────────────────────────────────────────────
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Mail,
    title: "6 Providers",
    description:
      "SMTP, SendGrid, AWS SES, Mailgun, Resend, Postmark — switch providers with a single config change.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Layout,
    title: "Template Engines",
    description:
      "Handlebars, EJS, and Pug support with caching, partials, and helpers built in.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Queue Support",
    description:
      "Background email sending with BullMQ or Bull. Delay, schedule, and retry with ease.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: FileText,
    title: "Markdown Mail",
    description:
      "Write emails in Markdown with button, panel, and table components. Auto-inlined CSS.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Provider Failover",
    description:
      "Automatic failover chains with retries, delays, and monitoring callbacks.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: TestTube,
    title: "Testing Built-in",
    description:
      "Mail.fake() with Laravel-style assertions. Assert sent, queued, and simulate failures.",
    gradient: "from-violet-500 to-purple-500",
  },
];

// ─── Provider Metadata ───────────────────────────────────────────────────────
export interface Provider {
  name: string;
  slug: string;
  description: string;
  install: string;
  color: string;
}

export const PROVIDERS: Provider[] = [
  {
    name: "SMTP",
    slug: "smtp",
    description: "Built-in via Nodemailer. No additional install needed.",
    install: "Included",
    color: "#6366f1",
  },
  {
    name: "SendGrid",
    slug: "sendgrid",
    description: "Twilio SendGrid cloud email delivery API.",
    install: "npm install @sendgrid/mail",
    color: "#1A82E2",
  },
  {
    name: "AWS SES",
    slug: "ses",
    description: "Amazon Simple Email Service with IAM role support.",
    install: "npm install @aws-sdk/client-ses",
    color: "#FF9900",
  },
  {
    name: "Mailgun",
    slug: "mailgun",
    description: "Powerful email API with EU region support.",
    install: "npm install mailgun.js form-data",
    color: "#F06B66",
  },
  {
    name: "Resend",
    slug: "resend",
    description: "Modern email API built for developers.",
    install: "npm install resend",
    color: "#000000",
  },
  {
    name: "Postmark",
    slug: "postmark",
    description: "Reliable transactional email delivery.",
    install: "npm install postmark",
    color: "#FFDE00",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────
// Dynamic stats fetched at build time from the main nodemail repo
import statsData from "../public/stats.json";

export const STATS = [
  { value: statsData.providers, label: "Providers", suffix: "" },
  { value: statsData.tests, label: "Tests Passing", suffix: "" },
  { value: statsData.coverage, label: "Code Coverage", suffix: "%+" },
] as const;

// ─── Code Examples ───────────────────────────────────────────────────────────
export const CODE_EXAMPLES = {
  quickStart: `import { Mail } from '@impruthvi/nodemail';

Mail.configure({
  default: 'smtp',
  from: { address: 'noreply@example.com', name: 'My App' },
  mailers: {
    smtp: {
      driver: 'smtp',
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'username', pass: 'password' },
    },
  },
});

await Mail.to('user@example.com')
  .subject('Welcome!')
  .html('<h1>Hello World!</h1>')
  .send();`,

  fluentApi: `await Mail.to('user@example.com')
  .subject('Complete Example')
  .html('<h1>Hello!</h1>')
  .text('Hello!')
  .from('custom@example.com')
  .cc(['manager@example.com'])
  .bcc('archive@example.com')
  .replyTo('support@example.com')
  .attachments([{
    filename: 'report.pdf',
    path: './files/report.pdf'
  }])
  .send();`,

  mailable: `class WelcomeEmail extends Mailable {
  constructor(private user: { name: string }) {
    super();
  }

  build() {
    return this
      .subject(\`Welcome, \${this.user.name}!\`)
      .html(\`<h1>Hello \${this.user.name}!</h1>\`);
  }
}

await Mail.to('user@example.com')
  .send(new WelcomeEmail({ name: 'John' }));`,

  markdown: `class WelcomeEmail extends MarkdownMailable {
  constructor(private user: { name: string }) {
    super();
  }

  build(): this {
    return this
      .subject(\`Welcome, \${this.user.name}!\`)
      .markdown(\`# Welcome, {{name}}!

Thank you for joining our platform.

[button url="https://example.com" color="primary"]
  Get Started
[/button]

[panel]Need help? Contact support[/panel]\`,
        { name: this.user.name });
  }
}`,

  queue: `// Queue immediately
await Mail.to('user@example.com')
  .subject('Welcome!')
  .html('<h1>Welcome!</h1>')
  .queue();

// Send in 60 seconds
await Mail.to('user@example.com')
  .subject('Follow Up')
  .html('<p>How are things going?</p>')
  .later(60);

// Schedule for specific time
await Mail.to('user@example.com')
  .subject('Merry Christmas!')
  .html('<h1>Happy Holidays!</h1>')
  .at(new Date('2026-12-25T00:00:00'));`,
} as const;
