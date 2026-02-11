"use client";

import React from "react";
import { Download } from "lucide-react";

export const DownloadButton = () => {
  return (
    <a
      href="/resume.pdf"
      download="Sirajul_SQA.pdf"
      className="fixed bottom-6 left-6 z-50 print:hidden flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-neutral-800 transition-all font-bold hover:scale-105 active:scale-95"
      aria-label="Download Resume"
    >
      <Download className="w-5 h-5" />
      <span className="hidden sm:inline">Download PDF</span>
    </a>
  );
};
