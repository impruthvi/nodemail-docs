"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, Github, Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CODE_EXAMPLES } from "@/lib/constants";
import { CodeBlock } from "@/components/ui/code-block";
import { GradientOrbs } from "@/components/effects/gradient-orbs";
import { ParticleBackground } from "@/components/effects/particle-background";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-neon-green" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const installCmd = "npm install @impruthvi/nodemail";

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <ParticleBackground className="z-0" />
      <GradientOrbs className="z-0" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link href="/docs/changelog" className="relative inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/[0.03] text-sm text-muted-foreground overflow-hidden hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                <span className="relative z-10">
                  v1.0.1 &mdash; Events, Preview, Rate Limiting &amp; More
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
              </Link>
            </motion.div>

            {/* Heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              Email for Node.js,
              <br />
              <span className="text-gradient">Done Right.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              A fluent, provider-agnostic email library for Node.js with
              built-in templates, queues, failover, and testing utilities.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Link
                href="/docs"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white",
                  "bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 bg-[length:200%_100%]",
                  "hover:bg-[position:100%_0] transition-all duration-500",
                  "shadow-lg shadow-indigo-500/20"
                )}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/impruthvi/nodemail"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold",
                  "border border-white/10 bg-white/[0.03] text-foreground",
                  "hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                )}
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </motion.div>

            {/* Install command */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 w-full max-w-md"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] font-mono text-sm overflow-hidden">
                <span className="text-muted-foreground select-none">$</span>
                <code className="flex-1 text-foreground truncate">
                  {installCmd}
                </code>
                <CopyButton text={installCmd} />
              </div>
            </motion.div>
          </div>

          {/* Right column - code preview */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:block w-full"
          >
            <div className="relative">
              {/* Glow behind code block */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-pink-500/10 blur-2xl" />
              <div className="relative">
                <CodeBlock
                  code={CODE_EXAMPLES.quickStart}
                  language="typescript"
                  filename="quickstart.ts"
                  className="shadow-2xl shadow-black/40"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
