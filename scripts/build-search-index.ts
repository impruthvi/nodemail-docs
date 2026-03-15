/**
 * Build-time script: generates a search index from all MDX documentation pages.
 *
 * Reads each app/docs/.../page.mdx file, strips metadata exports and JSX,
 * extracts headings and body text, and writes public/search-index.json.
 *
 * Usage: bun run scripts/build-search-index.ts
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

interface SearchEntry {
  id: string;
  title: string;
  href: string;
  section: string;
  headings: string;
  content: string;
}

const DOCS_DIR = join(import.meta.dir, "..", "app", "docs");
const OUTPUT_PATH = join(import.meta.dir, "..", "public", "search-index.json");

/** Recursively find all page.mdx files under a directory. */
async function findMdxFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findMdxFiles(fullPath)));
    } else if (entry.name === "page.mdx") {
      results.push(fullPath);
    }
  }

  return results;
}

/** Extract title from metadata export or first # heading. */
function extractTitle(raw: string): string {
  // Try metadata export: export const metadata = { title: "..." }
  const metaMatch = raw.match(/title:\s*["']([^"']+)["']/);
  if (metaMatch) return metaMatch[1];

  // Fallback: first # heading
  const headingMatch = raw.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1];

  return "Untitled";
}

/** Extract all ## and ### headings. */
function extractHeadings(raw: string): string {
  const matches = raw.match(/^#{2,3}\s+(.+)$/gm);
  if (!matches) return "";
  return matches.map((h) => h.replace(/^#{2,3}\s+/, "")).join(" ");
}

/** Strip MDX-specific syntax to get plain text content. */
function stripToPlainText(raw: string): string {
  return (
    raw
      // Remove metadata export block
      .replace(/export\s+const\s+metadata\s*=\s*\{[^}]*\};?\s*/gs, "")
      // Remove import statements
      .replace(/^import\s+.*$/gm, "")
      // Remove JSX self-closing tags like <PackageManagerTabs ... />
      .replace(/<[A-Z][A-Za-z]*\s*[^>]*\/>/g, "")
      // Remove JSX opening+closing tags (simple, non-nested)
      .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")
      // Remove code fences (keep the code content for searchability)
      .replace(/```[\w]*\n?/g, "")
      // Remove markdown link syntax but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove markdown formatting
      .replace(/[*_~`#]/g, "")
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")
      // Collapse whitespace
      .replace(/\n{2,}/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** Derive section name from path (e.g., app/docs/providers/smtp → Providers). */
function deriveSection(href: string): string {
  const parts = href.split("/").filter(Boolean); // ["docs", "providers", "smtp"]
  if (parts.length <= 2) return "Getting Started";

  const sectionSlug = parts[1];
  const sectionMap: Record<string, string> = {
    providers: "Providers",
    templates: "Template Engines",
  };

  return sectionMap[sectionSlug] || "Docs";
}

async function main() {
  const files = await findMdxFiles(DOCS_DIR);
  const entries: SearchEntry[] = [];

  for (const file of files) {
    const raw = await readFile(file, "utf-8");
    const relPath = relative(join(DOCS_DIR, ".."), file);
    // app/docs/providers/smtp/page.mdx → /docs/providers/smtp
    const href =
      "/" +
      relPath
        .replace(/\/page\.mdx$/, "")
        .replace(/^app\//, "");

    entries.push({
      id: href,
      title: extractTitle(raw),
      href,
      section: deriveSection(href),
      headings: extractHeadings(raw),
      content: stripToPlainText(raw),
    });
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(entries, null, 2));
  console.log(
    `Search index built: ${entries.length} pages → public/search-index.json`
  );
}

main().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
