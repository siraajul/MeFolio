"use client";

import {
  BriefcaseBusinessIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const iconMap = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  business: BriefcaseBusinessIcon,
  education: GraduationCapIcon,
} as const;

export type ExperiencePositionIconType = keyof typeof iconMap;

export type ExperiencePositionItemType = {
  id?: string;
  _key?: string;
  title: string;
  employmentPeriod: string;
  employmentType?: string;
  description?: string;
  icon?: ExperiencePositionIconType;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string;
  experiences: ExperienceItemType[];
}) {
  return (
    <div className={cn("px-4", className)}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
        className="flex sm:block overflow-x-auto sm:overflow-visible gap-4 sm:gap-0 sm:space-y-12 snap-x snap-mandatory py-6 sm:py-0 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {experiences.map((experience, index) => (
          <ExperienceItem key={experience.id} experience={experience} index={index} />
        ))}
      </motion.div>
    </div>
  );
}

export function ExperienceItem({
  experience,
  index,
}: {
  experience: ExperienceItemType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-0 sm:pl-0 min-w-[85vw] sm:min-w-0 snap-center sm:snap-none"
    >
      {/* Timeline Connector for Desktop */}
      <div className="hidden sm:block absolute left-[-2px] top-0 bottom-[-48px] w-[2px] bg-gradient-to-b from-border/50 via-border/50 to-transparent last:to-transparent last:via-transparent last:h-full" />
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
        {/* Company Logo / Marker */}
        <div className="relative left-0 sm:relative sm:left-0 flex-none">
           <div className="relative flex items-center justify-start sm:justify-center">
             <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 shadow-sm flex items-center justify-center z-10 group-hover:border-brand/50 group-hover:scale-110 transition-all duration-300">
               {experience.companyLogo ? (
                 <Image
                   src={experience.companyLogo}
                   alt={experience.companyName}
                   width={28}
                   height={28}
                   className="rounded-lg"
                   unoptimized
                 />
               ) : (
                 <BriefcaseBusinessIcon className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />
               )}
             </div>
             {/* Mobile connector line - Hidden for horizontal layout */}
             <div className="hidden absolute top-12 bottom-[-48px] w-[1px] bg-border/40 left-1/2 -translate-x-1/2" />
           </div>
        </div>

        {/* Content Card */}
        <div className="flex-1">
          <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-3xl p-4 sm:p-8 hover:bg-card/50 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
               <div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    {experience.companyName}
                    {experience.isCurrentEmployer && (
                      <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Current
                      </span>
                    )}
                  </h3>
               </div>
             </div>

             <div className="space-y-8">
                {experience.positions.map((position) => (
                  <ExperiencePositionItem key={position._key || position.id || position.title} position={position} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType;
}) {
  const ExperienceIcon = iconMap[position.icon || "code"];

  return (
    <Collapsible defaultOpen={position.isExpanded} asChild>
      <div className="relative group/position">
        <CollapsibleTrigger className="group/trigger w-full text-left select-none">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-xl bg-muted/50 text-muted-foreground group-hover/trigger:text-brand group-hover/trigger:bg-brand/10 transition-colors duration-300">
              <ExperienceIcon className="size-5" />
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                 <h4 className="text-lg font-semibold text-foreground group-hover/trigger:text-brand transition-colors duration-300">
                   {position.title}
                 </h4>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <span>{position.employmentPeriod}</span>
                    <div className="size-1 rounded-full bg-border" />
                    <ChevronsDownUpIcon className="size-4 opacity-0 group-hover/trigger:opacity-100 transition-opacity hidden group-data-[state=open]/trigger:block" />
                    <ChevronsUpDownIcon className="size-4 opacity-0 group-hover/trigger:opacity-100 transition-opacity hidden group-data-[state=closed]/trigger:block" />
                 </div>
              </div>
              
              {position.employmentType && (
                 <p className="text-sm text-muted-foreground/80 font-medium">
                   {position.employmentType}
                 </p>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="pl-[3.25rem] pt-4">
             {position.description && (
               <Prose className="mb-4 text-muted-foreground/90 leading-relaxed">
                 <ReactMarkdown>{position.description}</ReactMarkdown>
               </Prose>
             )}

             {Array.isArray(position.skills) && position.skills.length > 0 && (
               <div className="flex flex-wrap gap-2">
                 {position.skills.map((skill, index) => (
                   <Skill key={index}>{skill}</Skill>
                 ))}
               </div>
             )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-muted-foreground/80 dark:prose-invert",
        "prose-p:my-1 prose-ul:my-2 prose-li:my-0.5",
        "prose-strong:font-medium prose-strong:text-foreground",
        "prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
        className
      )}
      {...props}
    />
  );
}

function Skill({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-brand",
        className
      )}
      {...props}
    />
  );
}
