"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION } from "@/lib/navigation";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
      router.push(href);
    },
    [router]
  );

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
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg">
            <Command
              className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              label="Search documentation"
            >
              <div className="flex items-center gap-2 px-4 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <Command.Input
                  placeholder="Search documentation..."
                  className="flex-1 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>
                {NAVIGATION.map((section) => (
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
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
