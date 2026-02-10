import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SiteNavBar } from "@/components/ui/site-navbar";
import { Footer } from "@/components/ui/modem-animated-footer";
import { SiteSettings } from "@/types/sanity";
import { siteSettingsQuery } from "@/sanity/lib/queries";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 60;

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
        images: project.image ? [{ url: project.image }] : [],
    }
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
      <SiteNavBar />
      
      {/* Spacer for navbar */}
      <div className="h-20" />

      <article className="max-w-4xl mx-auto px-6 py-10 md:py-20">
        
        {/* Header */}
        <div className="mb-12">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{project.title}</h1>
            
            {project.description && (
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                    {project.description}
                </p>
            )}

            {/* Links & Tech Stack */}
            <div className="flex flex-col md:flex-row gap-6 md:items-center mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-4">
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-brand/20">
                            <Globe className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                    {/* Fallback for old schema link used as Github if no githubLink */}
                    {project.githubLink ? (
                         <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-neutral-800 text-white rounded-full font-medium hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-all">
                            <Github className="w-4 h-4" /> Authorization
                        </a>
                    ) : (
                         /* Old link might be github? Just in case */
                         null 
                    )}
                </div>

                {project.techStack && (
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Main Image */}
        {project.image && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 border border-neutral-200 dark:border-neutral-800">
                <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )}

        {/* Content */}
        {project.content ? (
             <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-img:rounded-2xl prose-headings:font-bold">
                <PortableText value={project.content} components={PortableTextComponents} />
            </div>
        ) : (
            <div className="text-center py-10 p-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
                <p className="text-muted-foreground">Detailed case study content coming soon.</p>
            </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 hover:scale-[1.02] transition-transform duration-300">
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
