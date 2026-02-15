"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CODE_EXAMPLES } from "@/lib/constants";
import { CodeBlock } from "@/components/ui/code-block";

const TABS = [
  { key: "fluentApi", label: "Fluent API" },
  { key: "mailable", label: "Mailable" },
  { key: "markdown", label: "Markdown Mail" },
  { key: "queue", label: "Queue" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function CodePreview() {
  const [active, setActive] = useState<TabKey>("fluentApi");

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            See It <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A fluent, Laravel-inspired API that makes sending emails a joy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-border/50 px-1 pt-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  active === tab.key
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {active === tab.key && (
                  <motion.div
                    layoutId="code-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Code content */}
          <div className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <CodeBlock
                  code={CODE_EXAMPLES[active]}
                  language="typescript"
                  className="border-0 rounded-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
