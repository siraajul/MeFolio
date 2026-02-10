"use client";

import React from "react";
import { Printer } from "lucide-react";

export const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="fixed bottom-6 right-6 z-50 print:hidden flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-neutral-800 transition-all font-bold hover:scale-105 active:scale-95"
      aria-label="Print Resume"
    >
      <Printer className="w-5 h-5" />
      <span className="hidden sm:inline">Print / Save PDF</span>
    </button>
  );
};
