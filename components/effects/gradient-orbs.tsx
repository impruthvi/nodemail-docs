"use client";

import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

export function GradientOrbs({ className }: GradientOrbsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Large indigo orb - top left */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.637 0.237 265 / 15%) 0%, transparent 70%)",
          animationDelay: "0s",
          animationDuration: "8s",
        }}
      />
      {/* Cyan orb - top right */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.15 190 / 12%) 0%, transparent 70%)",
          animationDelay: "2s",
          animationDuration: "10s",
        }}
      />
      {/* Pink orb - bottom center */}
      <div
        className="absolute -bottom-[15%] left-[30%] w-[400px] h-[400px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.15 340 / 10%) 0%, transparent 70%)",
          animationDelay: "4s",
          animationDuration: "12s",
        }}
      />
      {/* Small green accent orb */}
      <div
        className="absolute top-[40%] right-[15%] w-[200px] h-[200px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.18 160 / 8%) 0%, transparent 70%)",
          animationDelay: "1s",
          animationDuration: "7s",
        }}
      />
    </div>
  );
}
