"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

interface CircularProgressProps {
  score: number;
  label: string;
  delay?: number;
}

function CircularProgress({ score, label, delay = 0 }: CircularProgressProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentScore, setCurrentScore] = useState(0);

  // SVG parameters
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // 1.5 seconds to animate
      const incrementTime = 20;
      const totalSteps = duration / incrementTime;
      const stepValue = score / totalSteps;

      const timer = setTimeout(() => {
        const counter = setInterval(() => {
          start += stepValue;
          if (start >= score) {
            setCurrentScore(score);
            clearInterval(counter);
          } else {
            setCurrentScore(Math.floor(start));
          }
        }, incrementTime);
      }, delay * 1000); // Wait for the delay before starting

      return () => clearTimeout(timer);
    }
  }, [isInView, score, delay]);

  // Determine color based on score (Lighthouse standard colors)
  const getColor = (val: number) => {
    if (val >= 90) return "text-emerald-500 stroke-emerald-500";
    if (val >= 50) return "text-amber-500 stroke-amber-500";
    return "text-red-500 stroke-red-500";
  };

  const colorClasses = getColor(score);
  const strokeDashoffset = isInView ? circumference - (score / 100) * circumference : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center group">
      <div className="relative flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
        {/* Background Circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-neutral-200 dark:text-neutral-800"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            className={colorClasses.split(" ")[1]}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Number Text inside circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-mono font-bold ${colorClasses.split(" ")[0]}`}>
            {currentScore}
          </span>
        </div>
      </div>
      <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 tracking-wide uppercase">
        {label}
      </h4>
    </div>
  );
}

export function AuditScores() {
  const scores = [
    { label: "Performance", score: 100, delay: 0 },
    { label: "Accessibility", score: 100, delay: 0.2 },
    { label: "Best Practices", score: 100, delay: 0.4 },
    { label: "SEO", score: 100, delay: 0.6 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-500/10 text-emerald-500 rounded-xl mb-4 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6 mr-2" />
            <span className="text-sm font-bold tracking-wider uppercase">Quality Assured</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            Perfect Lighthouse Audits
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            As an SDET, I don't just write functional code. I enforce strict quality gates in my CI/CD pipelines to guarantee <strong>flawless performance, accessibility, and SEO</strong> before any code reaches production.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
          {scores.map((item, index) => (
            <CircularProgress
              key={index}
              score={item.score}
              label={item.label}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
