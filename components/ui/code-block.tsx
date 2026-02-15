"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function highlight() {
      const { codeToHtml } = await import("shiki");
      const result = await codeToHtml(code, {
        lang: language,
        theme: "catppuccin-mocha",
      });
      setHtml(result);
    }
    highlight();
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative rounded-xl border border-border overflow-hidden bg-[#1e1e2e]", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          {filename && (
            <span className="text-xs text-muted-foreground font-mono">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-xs text-muted-foreground font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-neon-green" />
              <span className="text-neon-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent [&_.shiki]:!bg-transparent">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="text-gray-300 font-mono">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
