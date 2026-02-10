"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "light" | "dark" | "auto";

function getSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeToggleFab() {
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read saved preference
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
      applyTheme(saved === "dark");
    } else {
      // Auto mode — follow system
      setMode("auto");
      applyTheme(getSystemDark());
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const current = localStorage.getItem("theme");
      if (!current || current === "auto") {
        applyTheme(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const cycleTheme = () => {
    // Cycle: light → dark → auto → light ...
    const next: ThemeMode = mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
    setMode(next);

    if (next === "auto") {
      localStorage.removeItem("theme");
      applyTheme(getSystemDark());
    } else {
      localStorage.setItem("theme", next);
      applyTheme(next === "dark");
    }
  };

  if (!mounted) return null;

  const icon =
    mode === "dark" ? "moon" : mode === "light" ? "sun" : "monitor";

  return (
    <button
      onClick={cycleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:scale-110 group"
      aria-label={`Theme: ${mode}. Click to cycle.`}
      title={`Theme: ${mode === "auto" ? "Auto (System)" : mode === "dark" ? "Dark" : "Light"}`}
    >
      <div className="relative w-6 h-6 text-neutral-800 dark:text-neutral-200">
        <AnimatePresence mode="wait" initial={false}>
          {icon === "moon" && (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 fill-current" />
            </motion.div>
          )}
          {icon === "sun" && (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 fill-current" />
            </motion.div>
          )}
          {icon === "monitor" && (
            <motion.div
              key="monitor"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Monitor className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
