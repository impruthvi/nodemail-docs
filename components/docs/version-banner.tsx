import Link from "next/link";
import { LARAMAIL_VERSION } from "@/lib/constants";

export function VersionBanner() {
  return (
    <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 font-mono font-medium">
        v{LARAMAIL_VERSION}
      </span>
      <span>
        These docs are for laramail v{LARAMAIL_VERSION}.{" "}
        <Link
          href="/docs/changelog"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          View changelog
        </Link>
      </span>
    </div>
  );
}
