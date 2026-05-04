import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink, Code2, LayoutTemplate, TrendingDown, BugOff, Zap, ShieldCheck, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteSettings } from "@/types/sanity";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { Callout } from "@/components/shared/Callout";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { MetricBlock } from "@/components/shared/MetricBlock";
import { DividerBlock } from "@/components/shared/DividerBlock";
import { CtaButton } from "@/components/shared/CtaButton";
import { FileDownload } from "@/components/shared/FileDownload";
import { TableBlock } from "@/components/shared/TableBlock";

// Use ISR: pre-render at build time, refresh every 60 seconds
export const revalidate = 60;

// Pre-render all project slugs at build time for instant first load
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    groq`*[_type == "projectCategory"].projects[defined(slug.current)].slug.current`
  );
  return (slugs || []).map((slug) => ({ slug }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Query to find the project within category
const projectQuery = groq`*[_type == "projectCategory" && count(projects[slug.current == $slug]) > 0][0]{
  "project": projects[slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    "image": image.asset->url,
    link,
    githubLink,
    techStack,
    isImpactDriven,
    problem,
    strategy,
    impact,
    metrics,
    "gallery": gallery[].asset->url,
    content
  }
}`;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(projectQuery, { slug });
  const project = data?.project;

  if (!project) {
    return { title: "Project Not Found | Sirajul Islam" };
  }

  return {
    title: `${project.title} | Sirajul Islam`,
    description: project.description,
    openGraph: {
        title: project.title,
        description: project.description,
        url: `/projects/${slug}`,
        type: "article",
        images: project.image ? [
            {
                url: project.image,
                width: 1200,
                height: 630,
                alt: project.title,
            }
        ] : [],
    },
    twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: project.image ? [project.image] : [],
    },
  };
}

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Project Image"}
            fill
            className="object-cover"
          />
          {value.caption && (
             <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-white text-xs text-center backdrop-blur-sm">
               {value.caption}
             </div>
          )}
        </div>
      );
    },
    code: ({ value }: { value: { code: string; language?: string; filename?: string } }) => {
      return (
        <CodeBlock
          code={value.code}
          language={value.language}
          filename={value.filename}
        />
      );
    },
    callout: ({ value }: { value: any }) => {
      return <Callout style={value.style} title={value.title} body={value.body} />;
    },
    youtubeEmbed: ({ value }: { value: any }) => {
      return <YouTubeEmbed url={value.url} caption={value.caption} />;
    },
    metricBlock: ({ value }: { value: any }) => {
      return <MetricBlock metrics={value.metrics} />;
    },
    dividerBlock: ({ value }: { value: any }) => {
      return <DividerBlock style={value.style} />;
    },
    ctaButton: ({ value }: { value: any }) => {
      return <CtaButton text={value.text} url={value.url} style={value.style} />;
    },
    fileDownload: ({ value }: { value: any }) => {
      const fileUrl = value.file?.asset?._ref
        ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.file.asset._ref.replace('file-', '').replace('-', '.')}`
        : '#';
      return <FileDownload title={value.title} description={value.description} fileUrl={fileUrl} />;
    },
    tableBlock: ({ value }: { value: any }) => {
      return <TableBlock caption={value.caption} hasHeader={value.hasHeader} rows={value.rows} />;
    },
  },
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const data = await client.fetch(projectQuery, { slug });
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  if (!data || !data.project) {
    notFound();
  }

  const { project } = data;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100">

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
                    alt={project.title}
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
                    {project.metrics?.map((metric: any, i: number) => {
                      const Icon = metric.icon === 'TrendingDown' ? TrendingDown :
                                   metric.icon === 'BugOff' ? BugOff :
                                   metric.icon === 'Zap' ? Zap :
                                   metric.icon === 'Clock' ? Clock : ShieldCheck;
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
                    {project.gallery.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 hover:scale-[1.02] transition-transform duration-300 bg-neutral-100 dark:bg-neutral-900">
                            <Image 
                                src={img}
                                alt={`${project.title} gallery ${idx + 1}`}
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
        socialLinks={settings?.socialLinks?.map((link: any) => ({
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
