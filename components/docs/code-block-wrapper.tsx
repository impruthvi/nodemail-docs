"use client";

import { Children, isValidElement, type ComponentPropsWithoutRef } from "react";
import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!isValidElement(node)) return "";
  const children = (node.props as { children?: React.ReactNode }).children;
  return Children.toArray(children).map(extractText).join("");
}

function getLanguage(children: React.ReactNode): string | null {
  const child = Children.toArray(children)[0];
  if (!isValidElement(child)) return null;
  const props = child.props as Record<string, unknown>;
  // Shiki sets data-language on the <code> element
  if (typeof props["data-language"] === "string") return props["data-language"];
  // Fallback: className like "language-ts"
  if (typeof props.className === "string") {
    const match = props.className.match(/language-(\w+)/);
    if (match) return match[1];
  }
  return null;
}

export function CodeBlockWrapper(props: ComponentPropsWithoutRef<"pre">) {
  const { children, ...rest } = props;
  const code = extractText(children).replace(/\n$/, "");
  const language = getLanguage(children);

  return (
    <div className="group relative my-6 rounded-xl border border-border overflow-hidden bg-[#1e1e2e]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          {language && (
            <span className="text-xs text-muted-foreground font-mono">
              {language}
            </span>
          )}
        </div>
        <CopyButton text={code} />
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        <pre {...rest} className="!my-0 !border-0 !rounded-none !bg-transparent !p-0">
          {children}
        </pre>
      </div>
    </div>
  );
}
