import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; className: string; defaultTitle: string }> = {
  info: {
    icon: Info,
    className: "border-neon-indigo/30 bg-neon-indigo/5",
    defaultTitle: "Info",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/30 bg-amber-500/5",
    defaultTitle: "Warning",
  },
  tip: {
    icon: Lightbulb,
    className: "border-neon-green/30 bg-neon-green/5",
    defaultTitle: "Tip",
  },
  danger: {
    icon: AlertCircle,
    className: "border-red-500/30 bg-red-500/5",
    defaultTitle: "Danger",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, className, defaultTitle } = config[type];

  return (
    <div className={cn("my-6 rounded-xl border p-4", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="font-semibold text-sm">{title ?? defaultTitle}</span>
      </div>
      <div className="text-sm text-muted-foreground [&>p]:mb-0">{children}</div>
    </div>
  );
}
