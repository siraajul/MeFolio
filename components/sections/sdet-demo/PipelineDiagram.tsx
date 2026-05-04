"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommit, SearchCode, TestTube2, Package, PlayCircle, Rocket, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  { id: "code", icon: GitCommit, label: "Code Push", desc: "Feature Branch", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "lint", icon: SearchCode, label: "Static Analysis", desc: "ESLint & Prettier", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { id: "unit", icon: TestTube2, label: "Unit Tests", desc: "Jest / Vitest", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "build", icon: Package, label: "Build App", desc: "Next.js Build", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { id: "e2e", icon: PlayCircle, label: "E2E Tests", desc: "Playwright Suite", color: "text-brand", bg: "bg-brand/10", border: "border-brand/20" },
  { id: "deploy", icon: Rocket, label: "Deploy", desc: "Production", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
];

export function PipelineDiagram() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="flex flex-col items-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4">
          <GitBranch className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mr-2" />
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">GitHub Actions Pipeline</span>
        </div>
        <h3 className="text-2xl font-bold text-center">Zero-Downtime Deployment Flow</h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-center mt-2 max-w-xl">
          Automated quality gates ensuring every commit is production-ready. E2E tests are executed in parallel across multiple browsers.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />
        
        {/* Connecting Line (Mobile) */}
        <div className="block md:hidden absolute left-1/2 top-0 h-full w-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2 z-0" />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center group w-full md:w-auto"
          >
            {/* Step Node */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${step.bg} ${step.border} border-2 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:shadow-lg bg-white dark:bg-neutral-900`}>
              <step.icon className={`w-8 h-8 md:w-10 md:h-10 ${step.color}`} strokeWidth={1.5} />
            </div>

            {/* Step Info */}
            <div className="text-center bg-white dark:bg-neutral-900 p-2 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 md:bg-transparent md:border-none md:shadow-none md:p-0">
              <h4 className="font-bold text-sm md:text-base text-neutral-900 dark:text-neutral-100 whitespace-nowrap">{step.label}</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{step.desc}</p>
            </div>

            {/* Success Checkmark overlay */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index * 0.15) + 0.3, type: "spring" }}
              className="absolute top-0 right-1/2 md:-right-2 md:top-0 translate-x-8 md:translate-x-0 -translate-y-2 md:-translate-y-2 bg-white dark:bg-neutral-900 rounded-full"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/20" />
            </motion.div>
            
            {/* Mobile Arrow down */}
            {index < steps.length - 1 && (
               <div className="md:hidden text-neutral-300 dark:text-neutral-700 my-2 z-10 bg-white dark:bg-neutral-950">
                  <ArrowRight className="w-5 h-5 rotate-90" />
               </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
