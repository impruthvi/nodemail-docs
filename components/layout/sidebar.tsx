"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION, type NavSection } from "@/lib/navigation";

interface SidebarProps {
  className?: string;
}

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname();
  const isActive = section.items.some(
    (item) =>
      pathname === item.href ||
      item.items?.some((sub) => pathname === sub.href)
  );
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition-colors",
          "text-muted-foreground hover:bg-accent hover:text-foreground",
          isOpen && "text-foreground"
        )}
      >
        <span className="font-display tracking-tight">{section.title}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>

      {/* Section items */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="ml-2 mt-1 space-y-0.5 border-l border-border pl-2">
          {section.items.map((item) => {
            const isItemActive = pathname === item.href;

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center rounded-md px-3 py-1.5 text-sm transition-all duration-200",
                    isItemActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {/* Active indicator - gradient left border */}
                  {isItemActive && (
                    <span className="absolute -left-[calc(0.5rem+1px)] top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-neon-indigo to-neon-cyan" />
                  )}
                  {item.title}
                </Link>

                {/* Sub-items */}
                {item.items && item.items.length > 0 && (
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l border-border/50 pl-2">
                    {item.items.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "relative flex items-center rounded-md px-3 py-1 text-xs transition-all duration-200",
                            isSubActive
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
                          {isSubActive && (
                            <span className="absolute -left-[calc(0.5rem+1px)] top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-neon-indigo to-neon-cyan" />
                          )}
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-full overflow-y-auto scrollbar-thin py-6 pr-2",
        className
      )}
    >
      <nav className="space-y-1">
        {NAVIGATION.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </nav>
    </aside>
  );
}
