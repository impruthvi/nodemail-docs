import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nodemail.impruthvi.me"),
  title: {
    default: "@impruthvi/nodemail — Email for Node.js, Done Right",
    template: "%s | @impruthvi/nodemail",
  },
  description: "Laravel-inspired, lightweight, modular email library for Node.js with full TypeScript support. 6 providers, template engines, queue support, markdown mail, and more.",
  keywords: ["nodemail", "email", "nodejs", "typescript", "smtp", "sendgrid", "ses", "mailgun", "resend", "postmark", "laravel", "mailable"],
  authors: [{ name: "impruthvi" }],
  openGraph: {
    title: "@impruthvi/nodemail — Email for Node.js, Done Right",
    description: "Laravel-inspired, lightweight, modular email library for Node.js with full TypeScript support.",
    type: "website",
    url: "https://nodemail.impruthvi.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "@impruthvi/nodemail",
    description: "Laravel-inspired email library for Node.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
