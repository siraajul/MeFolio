"use client";

import { useState, useMemo } from "react";
import { highlight } from "sugar-high";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Syntax-highlight the code using sugar-high
  const highlightedHtml = useMemo(() => highlight(code), [code]);
  const lines = highlightedHtml.split("\n");
  const displayLabel = filename || language || "";

  return (
    <div className="code-block-wrapper group relative my-8 rounded-xl overflow-hidden border border-neutral-800 bg-[#0d1117] shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-neutral-800">
        {/* Window dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {displayLabel && (
            <span className="text-xs font-mono text-neutral-500 ml-2">
              {displayLabel}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors px-2 py-1 rounded-md hover:bg-neutral-800"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with syntax highlighting */}
      <div className="overflow-x-auto">
        <pre className="p-0 m-0 bg-transparent">
          <code className="block text-sm font-mono leading-relaxed">
            {lines.map((line, i) => (
              <div
                key={i}
                className="flex hover:bg-white/[0.03] transition-colors"
              >
                {/* Line number */}
                <span className="select-none text-neutral-600 text-right w-12 shrink-0 px-3 py-0.5 border-r border-neutral-800/50 text-xs leading-relaxed">
                  {i + 1}
                </span>
                {/* Syntax-highlighted line content */}
                <span
                  className="sh-line px-4 py-0.5 whitespace-pre leading-relaxed min-w-0"
                  dangerouslySetInnerHTML={{ __html: line || " " }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Bottom fade effect */}
      {lines.length > 20 && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
      )}
    </div>
  );
}
