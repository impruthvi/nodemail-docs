const BASE_URL = "https://nodemail.impruthvi.me";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "@impruthvi/nodemail",
    description:
      "Laravel-inspired, lightweight, modular email library for Node.js with full TypeScript support.",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/docs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

export function SoftwareSourceCodeSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "@impruthvi/nodemail",
    description:
      "Laravel-inspired, lightweight, modular email library for Node.js with full TypeScript support. 6 providers, template engines, queue support, markdown mail, and more.",
    codeRepository: "https://github.com/impruthvi/nodemail",
    programmingLanguage: ["TypeScript", "JavaScript"],
    runtimePlatform: "Node.js",
    author: {
      "@type": "Person",
      name: "impruthvi",
      url: "https://github.com/impruthvi",
    },
    license: "https://opensource.org/licenses/MIT",
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}

interface TechArticleSchemaProps {
  title: string;
  description: string;
  url: string;
}

export function TechArticleSchema({
  title,
  description,
  url,
}: TechArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    author: {
      "@type": "Person",
      name: "impruthvi",
    },
    publisher: {
      "@type": "Organization",
      name: "@impruthvi/nodemail",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${url}`,
    },
  };

  return <JsonLd data={data} />;
}
