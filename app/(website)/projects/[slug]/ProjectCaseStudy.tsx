import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink, Code2, LayoutTemplate, TrendingDown, BugOff, Zap, ShieldCheck, Clock } from "lucide-react";
import { PortableText } from "next-sanity";
import { Footer } from "@/components/layout/Footer";
import { SiteSettings, SocialLink } from "@/types/sanity";
import { getPortableTextComponents } from "@/components/shared/portableTextComponents";

// Project case studies frame inline images as 16:9 cards; the rest of the block config is shared.
const PortableTextComponents = getPortableTextComponents({
  imageClassName: "relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800",
  imageFallbackAlt: "Project Image",
});

// An impact metric shown in the case-study sidebar (label/value pair with an icon key).
export interface ProjectMetric {
  label?: string;
  value?: string;
  icon?: string;
}

/** The shape of a single project as returned by the project detail GROQ query. */
export interface ProjectDetail {
  title: string;
  description?: string;
  slug?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  githubLink?: string;
  techStack?: string[];
  isImpactDriven?: boolean;
  problem?: string;
  strategy?: string[];
  impact?: string;
  metrics?: ProjectMetric[];
  gallery?: { url: string; alt?: string }[];
  content?: React.ComponentProps<typeof PortableText>["value"];
}

const METRIC_ICONS = { TrendingDown, BugOff, Zap, Clock, ShieldCheck } as const;

/** Presentational case-study article for a single project (data is fetched by the page). */
export function ProjectCaseStudy({ project, settings }: { project: ProjectDetail; settings: SiteSettings | null }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100">
      <article className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* Top Navigation */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Header Section (Split Layout) */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">

          {/* Left Col: Title & Desc */}
          <div className="w-full lg:w-2/3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6 border border-brand/20">
              Case Study
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-neutral-900 dark:text-white">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Right Col: At a Glance Sidebar */}
          <div className="w-full lg:w-1/3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xl lg:sticky lg:top-24">
            <h3 className="text-lg font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-brand" />
              At a Glance
            </h3>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Links */}
            {(project.link || project.githubLink) && (
              <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-2 px-5 py-3 bg-brand text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand/20">
                    <Globe className="w-5 h-5" /> Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-2 px-5 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all border border-neutral-200 dark:border-neutral-700">
                    <Github className="w-5 h-5" /> Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Image */}
        {project.image && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={project.image}
              alt={project.imageAlt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Impact-Driven Section (Conditional) */}
        {project.isImpactDriven && (
          <div className="w-full max-w-5xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xl mb-16">
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Summary Metrics */}
              <div className="w-full md:w-1/3 bg-neutral-50 dark:bg-neutral-950 p-8 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
                <h4 className="text-lg font-bold mb-6 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-4">Key Results</h4>
                <div className="space-y-6">
                  {project.metrics?.map((metric: ProjectMetric, i: number) => {
                    const Icon = METRIC_ICONS[metric.icon as keyof typeof METRIC_ICONS] ?? ShieldCheck;
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="p-3 bg-brand/10 rounded-xl text-brand">
                          <Icon size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold tracking-wider">{metric.label}</p>
                          <p className="text-xl font-extrabold text-neutral-900 dark:text-white">{metric.value}</p>
                        </div>
                      </div>
                    );
                  })}
                  {!project.metrics?.length && (
                    <p className="text-sm text-neutral-500 italic">No metrics provided.</p>
                  )}
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-2/3 p-8">
                <div className="space-y-8">
                  {/* Problem */}
                  {project.problem && (
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        The Problem
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* Strategy */}
                  {project.strategy && project.strategy.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        The Strategy
                      </h4>
                      <ul className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed space-y-2 list-disc pl-5">
                        {project.strategy.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Impact */}
                  {project.impact && (
                    <div className="bg-brand/5 border border-brand/20 p-5 rounded-xl">
                      <h4 className="flex items-center gap-2 text-lg font-bold text-brand mb-3">
                        <ShieldCheck className="w-5 h-5" />
                        The Impact
                      </h4>
                      <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed font-medium">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {project.content ? (
            <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-img:rounded-2xl prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand/80 marker:text-brand">
              <PortableText value={project.content} components={PortableTextComponents} />
            </div>
          ) : (
            <div className="text-center py-10 p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 shadow-sm">
              <p className="text-neutral-500 dark:text-neutral-400">Detailed case study content coming soon.</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow" />
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Project Gallery</h2>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img: { url: string; alt?: string }, idx: number) => (
                <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 hover:scale-[1.02] transition-transform duration-300 bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={img.url}
                    alt={img.alt || `${project.title} gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

      <Footer
        brandName={settings?.firstName ? `${settings.firstName} ${settings.lastName}` : "Sirajul Islam"}
        brandDescription={settings?.brandDescription || "SQA Automation Engineer & SDET"}
        socialLinks={settings?.socialLinks?.map((link: SocialLink) => ({
          icon: link.platform.toLowerCase().includes("github") ? <Github className="w-6 h-6" /> :
                link.platform.toLowerCase().includes("linkedin") ? <ExternalLink className="w-6 h-6" /> :
                <Github className="w-6 h-6" />, // Fallback
          href: link.url,
          label: link.platform,
        })) || []}
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Back to Projects", href: "/#projects" },
        ]}
      />
    </main>
  );
}
