"use client";

import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/lib/navigation";
import { BreadcrumbListSchema } from "./json-ld";

export function DocsBreadcrumbSchema() {
  const pathname = usePathname();

  // Build breadcrumb items from pathname
  const items = [{ name: "Home", href: "/" }, { name: "Docs", href: "/docs" }];

  // Find current page in navigation
  for (const section of NAVIGATION) {
    for (const item of section.items) {
      if (item.href === pathname) {
        items.push({ name: item.title, href: item.href });
        break;
      }
    }
  }

  return <BreadcrumbListSchema items={items} />;
}
