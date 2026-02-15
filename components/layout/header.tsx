"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Github,
  Package,
  BookOpen,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/search/search-dialog";

const NAV_LINKS = [
  { label: "Docs", href: "/docs", icon: BookOpen },
  { label: "Providers", href: "/docs/providers", icon: Layers },
  {
    label: "GitHub",
    href: "https://github.com/impruthvi/nodemail",
    icon: Github,
    external: true,
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/package/@impruthvi/nodemail",
    icon: Package,
    external: true,
  },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-neon-indigo via-neon-cyan to-neon-pink" />

      {/* Header content */}
      <div className="glass">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Mobile nav + Logo */}
          <div className="flex items-center gap-3">
            <MobileNav />
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-indigo to-neon-cyan shadow-lg shadow-neon-indigo/20">
                <span className="text-sm font-bold text-white">N</span>
              </div>
              <span className="hidden font-display text-lg font-semibold tracking-tight text-foreground sm:inline-block">
                @impruthvi/
                <span className="text-gradient-static">nodemail</span>
              </span>
            </Link>
          </div>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const linkProps = link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              const Component = link.external ? "a" : Link;

              return (
                <Component
                  key={link.label}
                  href={link.href}
                  {...linkProps}
                  className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Component>
              );
            })}
          </nav>

          {/* Right: Search + Theme toggle */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <SearchDialog />

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted && (
                <>
                  <Sun
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      theme === "dark"
                        ? "rotate-0 scale-100"
                        : "-rotate-90 scale-0"
                    )}
                  />
                  <Moon
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-300",
                      theme === "dark"
                        ? "rotate-90 scale-0"
                        : "rotate-0 scale-100"
                    )}
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
