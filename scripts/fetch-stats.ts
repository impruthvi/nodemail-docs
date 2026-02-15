/**
 * Fetches test stats from the main nodemail repo's GitHub Pages
 * Run during build: bun run scripts/fetch-stats.ts
 */

import fs from "fs";
import path from "path";

const STATS_URL = "https://impruthvi.github.io/nodemail/stats.json";

interface Stats {
  tests: number;
  coverage: number;
  providers: number;
  updatedAt?: string;
}

const FALLBACK_STATS: Stats = {
  tests: 269,
  coverage: 85,
  providers: 6,
};

async function fetchStats(): Promise<Stats> {
  try {
    console.log(`Fetching stats from ${STATS_URL}...`);

    const response = await fetch(STATS_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Fetched stats:", data);

    return {
      tests: data.tests ?? FALLBACK_STATS.tests,
      coverage: data.coverage ?? FALLBACK_STATS.coverage,
      providers: data.providers ?? FALLBACK_STATS.providers,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.warn("Failed to fetch stats, using fallback values:", error);
    return FALLBACK_STATS;
  }
}

async function main() {
  const stats = await fetchStats();

  const outputPath = path.join(process.cwd(), "lib", "stats.json");
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));

  console.log(`\nStats written to ${outputPath}`);
  console.log(`  Tests: ${stats.tests}`);
  console.log(`  Coverage: ${stats.coverage}%`);
  console.log(`  Providers: ${stats.providers}`);
}

main();
