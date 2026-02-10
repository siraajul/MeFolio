"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/ui/smooth-scroll"), { ssr: false });
const ThemeToggleFab = dynamic(() => import("@/components/shared/ThemeToggle").then(m => ({ default: m.ThemeToggleFab })), { ssr: false });

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <ThemeToggleFab />
    </SmoothScroll>
  );
}
