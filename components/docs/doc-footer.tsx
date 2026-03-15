"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllNavItems } from "@/lib/navigation";

const GITHUB_EDIT_BASE =
  "https://github.com/impruthvi/laramail-docs/edit/main/app";

export function DocFooter() {
  const pathname = usePathname();
  const allItems = getAllNavItems();
  const currentIndex = allItems.findIndex((item) => item.href === pathname);

  // Don't render if page isn't in navigation
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Construct GitHub edit URL: /docs/foo → /app/docs/foo/page.mdx
  const editUrl = `${GITHUB_EDIT_BASE}${pathname}/page.mdx`;

  return (
    <footer className="mt-16 border-t border-border pt-6 pb-8">
      {/* Prev / Next */}
      <div className="flex items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className={cn(
              "group flex flex-1 flex-col gap-1 rounded-lg border border-border px-4 py-3 transition-colors",
              "hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ChevronLeft className="h-3 w-3" />
              Previous
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={next.href}
            className={cn(
              "group flex flex-1 flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 transition-colors",
              "hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next
              <ChevronRight className="h-3 w-3" />
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Edit on GitHub */}
      <div className="mt-6 flex justify-center">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil className="h-3 w-3" />
          Edit this page on GitHub
        </a>
      </div>
    </footer>
  );
}
