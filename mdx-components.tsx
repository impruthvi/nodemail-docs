import type { MDXComponents } from "mdx/types";
import { CodeBlockWrapper } from "@/components/docs/code-block-wrapper";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: CodeBlockWrapper,
    PackageManagerTabs,
    ...components,
  };
}
