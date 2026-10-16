import { HeroSection } from "@/components/hero/HeroSection";
import { ResourceExplorer } from "@/components/discovery/ResourceExplorer";
import { ComponentShowcase } from "@/components/showcase/ComponentShowcase";
import { DesignFoundations } from "@/components/foundations/DesignFoundations";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section with Asymmetric Geometric Composition */}
      <HeroSection />

      {/* 2. Resource Discovery Panel */}
      <ResourceExplorer initialLimit={6} />

      {/* 3. Component Showcase & Live Playground */}
      <ComponentShowcase />

      {/* 4. Atomic Design Foundations & WCAG 2.2 AA Principles */}
      <DesignFoundations />
    </div>
  );
}
