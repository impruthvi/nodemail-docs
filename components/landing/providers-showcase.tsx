"use client";

import { motion } from "motion/react";
import { PROVIDERS } from "@/lib/constants";
import { GlowCard } from "@/components/effects/glow-card";
import { CopyButton } from "@/components/docs/copy-button";

export function ProvidersShowcase() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Works With <span className="text-gradient">Every Provider</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SMTP built-in, plus first-class support for all major email APIs. Install only what you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROVIDERS.map((provider, i) => (
            <motion.div
              key={provider.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlowCard
                glowColor={`${provider.color}22`}
                className="h-full"
              >
                <div className="p-6">
                  {/* Colored top accent */}
                  <div
                    className="w-10 h-1 rounded-full mb-4"
                    style={{ background: provider.color }}
                  />

                  <h3 className="font-display text-lg font-semibold mb-2">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {provider.description}
                  </p>

                  {provider.install !== "Included" ? (
                    <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                      <code className="text-xs font-mono text-muted-foreground flex-1 truncate">
                        {provider.install}
                      </code>
                      <CopyButton text={provider.install} className="shrink-0" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span className="text-xs text-neon-green font-medium">
                        Included in base package
                      </span>
                    </div>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
