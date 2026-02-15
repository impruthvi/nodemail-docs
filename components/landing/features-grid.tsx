"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/constants";
import { GlowCard } from "@/components/effects/glow-card";

const GLOW_COLORS: Record<string, string> = {
  "from-indigo-500 to-blue-500": "oklch(0.637 0.237 265 / 15%)",
  "from-cyan-500 to-teal-500": "oklch(0.7 0.15 190 / 15%)",
  "from-amber-500 to-orange-500": "oklch(0.75 0.18 75 / 15%)",
  "from-pink-500 to-rose-500": "oklch(0.7 0.15 340 / 15%)",
  "from-emerald-500 to-green-500": "oklch(0.7 0.18 160 / 15%)",
  "from-violet-500 to-purple-500": "oklch(0.627 0.265 303 / 15%)",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function FeaturesGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Everything You{" "}
            <span className="text-gradient">Need</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete email toolkit with providers, templates, queues,
            failover, and testing &mdash; all with a fluent API.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            const glowColor =
              GLOW_COLORS[feature.gradient] ?? "oklch(0.637 0.237 265 / 15%)";

            return (
              <motion.div key={feature.title} variants={cardVariants}>
                <GlowCard
                  glowColor={glowColor}
                  className="h-full p-6 hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* Icon pill */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br",
                      feature.gradient,
                      "mb-4"
                    )}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
