"use client";

import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/docs/copy-button";
import {
  usePackageManager,
  type PackageManager,
} from "@/components/docs/package-manager-context";

const managers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];

function getCommand(pm: PackageManager, packages: string): string {
  switch (pm) {
    case "npm":
      return `npm install ${packages}`;
    case "yarn":
      return `yarn add ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    case "bun":
      return `bun add ${packages}`;
  }
}

interface PackageManagerTabsProps {
  command: string;
  label?: string;
}

export function PackageManagerTabs({ command, label }: PackageManagerTabsProps) {
  const { manager, setManager } = usePackageManager();
  const fullCommand = getCommand(manager, command);

  return (
    <div className="group relative my-6 rounded-xl border border-border overflow-hidden bg-[#1e1e2e]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          {label && (
            <span className="text-xs text-muted-foreground font-mono">
              {label}
            </span>
          )}
        </div>
        <CopyButton text={fullCommand} />
      </div>
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {managers.map((pm) => (
          <button
            key={pm}
            onClick={() => setManager(pm)}
            className={cn(
              "px-3 py-1.5 text-xs font-mono transition-colors",
              pm === manager
                ? "text-foreground bg-white/[0.06] border-b-2 border-neon-green"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
            )}
          >
            {pm}
          </button>
        ))}
      </div>
      {/* Command */}
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        <pre className="!my-0 !border-0 !rounded-none !bg-transparent !p-0">
          <code className="text-[#cdd6f4]">{fullCommand}</code>
        </pre>
      </div>
    </div>
  );
}
