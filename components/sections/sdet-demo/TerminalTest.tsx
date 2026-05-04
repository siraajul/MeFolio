"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, CheckCircle2, Clock } from "lucide-react";

export function TerminalTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(["$ npx playwright test"]);
    setProgress(0);

    const testSteps = [
      { text: "Running 6 tests using 3 workers", delay: 500 },
      { text: "  ✓  [chromium] › home.spec.ts:4:5 › Home Page › should display key personal information (850ms)", delay: 1500 },
      { text: "  ✓  [chromium] › home.spec.ts:23:5 › Home Page › should have working navigation (620ms)", delay: 2500 },
      { text: "  ✓  [firefox] › home.spec.ts:4:5 › Home Page › should display key personal information (910ms)", delay: 3500 },
      { text: "  ✓  [firefox] › home.spec.ts:23:5 › Home Page › should have working navigation (700ms)", delay: 4500 },
      { text: "  ✓  [webkit] › home.spec.ts:4:5 › Home Page › should display key personal information (780ms)", delay: 5500 },
      { text: "  ✓  [webkit] › home.spec.ts:23:5 › Home Page › should have working navigation (650ms)", delay: 6500 },
      { text: "  ", delay: 7000 },
      { text: "  6 passed (4.5s)", delay: 7200 },
    ];

    testSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
        setProgress(((index + 1) / testSteps.length) * 100);
        if (index === testSteps.length - 1) {
          setTimeout(() => setIsRunning(false), 1000);
        }
      }, step.delay);
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="flex items-center text-neutral-400 text-xs gap-2">
          <Terminal size={14} />
          <span>bash — playwright</span>
        </div>
        <div>
          <button
            onClick={startTest}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              isRunning
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-brand text-white hover:bg-brand/90"
            }`}
          >
            {isRunning ? (
              <>
                <Clock size={12} className="animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={12} />
                Run Suite
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-64 overflow-y-auto bg-neutral-900 text-neutral-300 relative">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-600">
            <Terminal size={32} className="mb-2 opacity-50" />
            <p>Click "Run Suite" to execute tests</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <AnimatePresence>
              {logs.map((log, index) => {
                const isCommand = log.startsWith("$");
                const isSuccess = log.includes("✓") || log.includes("passed");
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                      ${isCommand ? "text-white font-semibold mb-2" : ""}
                      ${isSuccess ? "text-green-400" : ""}
                    `}
                  >
                    {log}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-4 bg-neutral-400 mt-1"
              />
            )}
          </div>
        )}

        {/* Progress Bar overlay */}
        {logs.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
