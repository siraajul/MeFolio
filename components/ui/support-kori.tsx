"use client";

import React from "react";

interface SupportKoriProps {
  className?: string;
}

export const SupportKori = ({ className = "" }: SupportKoriProps) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center gap-6 border-t border-neutral-200 dark:border-neutral-800 pt-16 ${className}`}>
       <p className="text-muted-foreground text-center text-lg font-medium">
         Enjoyed my content? <span className="text-foreground">Fuel my creativity!</span>
       </p>
       <a 
         href="https://www.supportkori.com/sirajul"
         target="_blank"
         rel="noreferrer"
         className="group relative inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
       >
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 to-transparent dark:from-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src="/support-kori.png" 
            alt="Support Kori" 
            className="h-12 w-auto object-contain relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
            }}
          />
          <span className="fallback-text hidden text-foreground font-bold relative z-10">Support Kori</span>
       </a>
    </div>
  );
};
