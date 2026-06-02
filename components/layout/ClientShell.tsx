"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
// Static import: SmoothScroll wraps the entire page body and must be server-rendered
// (Lenis only runs in a useEffect). A dynamic() lazy boundary here would exist only on the
// client and shift React's useId counter, causing Radix hydration mismatches in the page.
import SmoothScroll from "@/components/ui/smooth-scroll";

// ThemeToggleFab stays client-only (ssr:false): it reads the theme from the browser. It is
// rendered AFTER children, so it cannot affect their useId values.
const ThemeToggleFab = dynamic(() => import("@/components/shared/ThemeToggle").then(m => ({ default: m.ThemeToggleFab })), { ssr: false });

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every Framer Motion animation respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll>
        {children}
        <ThemeToggleFab />
      </SmoothScroll>
    </MotionConfig>
  );
}
