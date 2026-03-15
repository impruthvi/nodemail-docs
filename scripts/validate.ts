/**
 * Build-time validation: checks navigation integrity and search index.
 *
 * Verifies:
 * 1. Every NAVIGATION href maps to a real app/docs/.../page.mdx file
 * 2. No duplicate hrefs in NAVIGATION
 * 3. Search index (if exists) is valid JSON with expected fields
 *
 * Usage: bun run scripts/validate.ts
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
let errors = 0;

// --- Load navigation data ---
// We can't import TS directly, so parse the navigation file for hrefs
const navFile = readFileSync(join(ROOT, "lib", "navigation.ts"), "utf-8");
const hrefMatches = navFile.matchAll(/href:\s*["']([^"']+)["']/g);
const hrefs = [...hrefMatches].map((m) => m[1]);

if (hrefs.length === 0) {
  console.error("FAIL: No hrefs found in lib/navigation.ts");
  process.exit(1);
}

console.log(`Found ${hrefs.length} navigation entries\n`);

// --- Check 1: Every href maps to a real MDX file ---
console.log("Checking navigation hrefs → MDX files...");
for (const href of hrefs) {
  // /docs/foo → app/docs/foo/page.mdx
  const mdxPath = join(ROOT, "app", ...href.split("/").filter(Boolean), "page.mdx");
  if (!existsSync(mdxPath)) {
    console.error(`  FAIL: ${href} → ${mdxPath} does not exist`);
    errors++;
  }
}
if (errors === 0) console.log("  OK: All hrefs map to real MDX files");

// --- Check 2: No duplicate hrefs ---
console.log("\nChecking for duplicate hrefs...");
const seen = new Set<string>();
for (const href of hrefs) {
  if (seen.has(href)) {
    console.error(`  FAIL: Duplicate href: ${href}`);
    errors++;
  }
  seen.add(href);
}
if (!hrefs.some((h) => hrefs.indexOf(h) !== hrefs.lastIndexOf(h))) {
  console.log("  OK: No duplicate hrefs");
}

// --- Check 3: Search index validity (if it exists) ---
const indexPath = join(ROOT, "public", "search-index.json");
console.log("\nChecking search index...");
if (existsSync(indexPath)) {
  try {
    const raw = readFileSync(indexPath, "utf-8");
    const entries = JSON.parse(raw);
    if (!Array.isArray(entries)) {
      console.error("  FAIL: search-index.json is not an array");
      errors++;
    } else {
      const requiredFields = ["id", "title", "href", "content"];
      for (const entry of entries) {
        for (const field of requiredFields) {
          if (typeof entry[field] !== "string") {
            console.error(
              `  FAIL: Entry ${entry.id || "unknown"} missing field: ${field}`
            );
            errors++;
          }
        }
      }
      if (errors === 0) {
        console.log(`  OK: ${entries.length} entries, all fields present`);
      }
    }
  } catch {
    console.error("  FAIL: search-index.json is not valid JSON");
    errors++;
  }
} else {
  console.log("  SKIP: search-index.json not found (run prebuild first)");
}

// --- Summary ---
console.log(
  `\n${errors === 0 ? "All checks passed." : `${errors} error(s) found.`}`
);
if (errors > 0) process.exit(1);
