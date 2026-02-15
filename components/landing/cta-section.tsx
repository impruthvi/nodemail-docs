"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";

export function CTASection() {
  const installCmd = "npm install @impruthvi/nodemail";

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-indigo/10 via-transparent to-neon-cyan/10" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to <span className="text-gradient">Send</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Get started in under a minute. One install, one configure, one send.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 bg-card/80 border border-border rounded-xl px-6 py-4 mb-10 max-w-full overflow-hidden">
            <span className="text-neon-cyan font-mono text-sm shrink-0">$</span>
            <code className="font-mono text-sm truncate">{installCmd}</code>
            <CopyButton text={installCmd} />
          </div>

          {/* CTA links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/impruthvi/nodemail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-xl font-semibold text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
