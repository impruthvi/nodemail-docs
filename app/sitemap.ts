import { MetadataRoute } from "next";
import { NAVIGATION } from "@/lib/navigation";

const BASE_URL = "https://nodemail.impruthvi.me";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all doc pages from navigation
  const docPages = NAVIGATION.flatMap((section) =>
    section.items.map((item) => ({
      url: `${BASE_URL}${item.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [
    // Homepage - highest priority
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // All documentation pages
    ...docPages,
  ];
}
