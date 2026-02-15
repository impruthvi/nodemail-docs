import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { PackageManagerProvider } from "@/components/docs/package-manager-context";
import { DocsBreadcrumbSchema } from "@/components/seo/docs-breadcrumb-schema";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PackageManagerProvider>
      <DocsBreadcrumbSchema />
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex max-w-[1440px] mx-auto">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin border-r border-border py-8 pl-6 pr-4">
            <Sidebar />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 px-6 md:px-10 py-10 max-w-3xl">
            <div className="mdx-content">{children}</div>
          </main>

          {/* Table of contents */}
          <aside className="hidden xl:block w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin py-8 pr-6 pl-4">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </PackageManagerProvider>
  );
}
