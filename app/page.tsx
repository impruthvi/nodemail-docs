import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { CodePreview } from "@/components/landing/code-preview";
import { ProvidersShowcase } from "@/components/landing/providers-showcase";
import { StatsCounter } from "@/components/landing/stats-counter";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <FeaturesGrid />
        <CodePreview />
        <ProvidersShowcase />
        <StatsCounter />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
