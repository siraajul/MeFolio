"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ExpandableSkillTags } from "@/components/shared/ExpandableSkillTags";
import { SkillCategory } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="min-h-0 md:min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center uppercase tracking-tight">
        Technical <span className="text-brand italic">Expertise</span>
      </h2>
      
      {/* Desktop Bento Grid Layout (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-[minmax(0,1fr)]">
        {categories?.length > 0 ? (
          categories.map((category, idx) => {
            // Logic for Bento Grid:
            // 1. Alternating pattern: Row 1 (2-1), Row 2 (1-2), Row 3 (2-1)...
            // 2. "Symmetrical Finishing": If total items are odd, the last item spans full width (3).
            const isLast = idx === categories.length - 1;
            const isOddTotal = categories.length % 2 !== 0;
            
            let colSpanClass = "md:col-span-1";
            if (isLast && isOddTotal) {
              colSpanClass = "md:col-span-3";
            } else {
              // Pattern: 0(2), 1(1) | 2(1), 3(2) | 4(2), 5(1) ...
              // Indices 0, 3, 4, 7... are span-2
              // Logic: (idx % 4 === 0 || idx % 4 === 3)
              colSpanClass = (idx % 4 === 0 || idx % 4 === 3) ? "md:col-span-2" : "md:col-span-1";
            }

            return (
              <div 
                key={category._id}
                className={cn(
                  "p-6 rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1",
                  colSpanClass
                )}
              >
                <div className="h-full flex flex-col">
                  <ExpandableSkillTags
                    title={category.title}
                    skills={category.skills}
                    initialCount={8}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Add skills in Sanity Studio</p>
        )}
      </div>

      {/* Mobile Accordion Layout (Visible only on Mobile) */}
      <div className="md:hidden flex flex-col gap-4 w-full">
         {categories?.length > 0 ? (
          categories.map((category) => (
            <MobileSkillCard key={category._id} category={category} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">Add skills in Sanity Studio</p>
        )}
      </div>
    </section>
  );
}

function MobileSkillCard({ category }: { category: SkillCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen 
          ? "bg-card/50 border-brand/30 shadow-md" 
          : "bg-card/20 border-border/40 hover:bg-card/40"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-lg font-bold uppercase tracking-tight text-foreground">
          {category.title}
        </span>
        <div className={cn(
          "p-2 rounded-full bg-muted/50 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180 bg-brand/10 text-brand"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-6 pt-0 border-t border-border/30 mt-2">
                 <div className="flex flex-wrap gap-2 pt-4">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
