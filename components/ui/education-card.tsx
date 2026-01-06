"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationCardProps {
  universityName: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  logoUrl: string;
  className?: string;
}

export function EducationCard({
  universityName,
  degree,
  period,
  location,
  description,
  logoUrl,
  className,
}: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative w-full max-w-2xl mx-auto p-[1px] rounded-3xl overflow-hidden group",
        className
      )}
    >
      {/* Glowing Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-border-flow" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="relative h-full bg-white/50 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center text-center shadow-2xl">
        
        {/* Glow Effect behind Logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand/20 blur-[60px] rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 rounded-full bg-white p-4 shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
          <img 
            src={logoUrl} 
            alt={`${universityName} Logo`} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* University Name */}
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
          {universityName}
        </h3>

        {/* Degree */}
        <div className="flex items-center gap-2 text-brand font-medium text-lg md:text-xl mb-4">
          <GraduationCap className="w-5 h-5" />
          <span>{degree}</span>
        </div>

        {/* Period & Location */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {period}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 self-center" />
          <span>{location}</span>
        </div>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
