"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import MiniSearch, { type SearchResult } from "minisearch";
import { Search, FileText, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION } from "@/lib/navigation";

interface SearchEntry {
  id: string;
  title: string;
  href: string;
  section: string;
  headings: string;
  content: string;
}

/** Lazy-load and cache the search index. Returns null while loading or on failure. */
function useSearchIndex(shouldLoad: boolean) {
  const [engine, setEngine] = useState<MiniSearch<SearchEntry> | null>(null);
  const [loading, setLoading] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!shouldLoad || loaded.current) return;
    loaded.current = true;
    setLoading(true);

    fetch("/search-index.json")
      .then((res) => res.json())
      .then((entries: SearchEntry[]) => {
        const ms = new MiniSearch<SearchEntry>({
          fields: ["title", "headings", "content"],
          storeFields: ["title", "href", "section"],
          searchOptions: {
            boost: { title: 3, headings: 2, content: 1 },
            fuzzy: 0.2,
            prefix: true,
          },
        });
        ms.addAll(entries);
        setEngine(ms);
      })
      .catch(() => {
        // Fallback: full-text search unavailable, cmdk title filter still works
      })
      .finally(() => setLoading(false));
  }, [shouldLoad]);

  return { engine, loading };
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { engine, loading } = useSearchIndex(open);

  // Toggle with Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  // Full-text search results (only when engine is loaded and there's a query)
  const fullTextResults: SearchResult[] =
    engine && query.length >= 2 ? engine.search(query) : [];
  const useFullText = engine !== null && query.length >= 2;

  return (
    <>
      {/* Desktop trigger */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "hidden items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-all sm:flex",
          "hover:border-neon-indigo/30 hover:bg-muted/80 hover:text-foreground"
        )}
        aria-label="Open search"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="text-xs">Search...</span>
        <kbd className="pointer-events-none ml-2 hidden select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
            <Command
              className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              label="Search documentation"
              shouldFilter={!useFullText}
            >
              <div className="flex items-center gap-2 px-4 border-b border-border">
                {loading ? (
                  <Loader2 className="w-4 h-4 text-muted-foreground shrink-0 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <Command.Input
                  placeholder="Search documentation..."
                  className="flex-1 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                {useFullText
                  ? /* Full-text search results */
                    fullTextResults.map((result) => (
                      <Command.Item
                        key={result.id}
                        value={result.id}
                        onSelect={() => navigate(result.href as string)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="block truncate font-medium">
                            {result.title as string}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {result.section as string}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 shrink-0 opacity-0 data-[selected=true]:opacity-100" />
                      </Command.Item>
                    ))
                  : /* Fallback: title-based navigation filtering */
                    NAVIGATION.map((section) => (
                      <Command.Group
                        key={section.title}
                        heading={section.title}
                        className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                      >
                        {section.items.map((item) => (
                          <Command.Item
                            key={item.href}
                            value={`${section.title} ${item.title}`}
                            onSelect={() => navigate(item.href)}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="flex-1">{item.title}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 data-[selected=true]:opacity-100" />
                          </Command.Item>
                        ))}
                      </Command.Group>
                    ))}
              </Command.List>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
                <span>
                  {useFullText
                    ? `${fullTextResults.length} result${fullTextResults.length !== 1 ? "s" : ""}`
                    : "Type to search content"}
                </span>
                <span>
                  <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">
                    esc
                  </kbd>{" "}
                  to close
                </span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
