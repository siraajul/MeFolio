import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SiteSettings } from "@/types/sanity";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { ProjectCaseStudy, type ProjectDetail } from "./ProjectCaseStudy";
import { JsonLd } from "@/components/shared/JsonLd";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

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
    "imageAlt": image.alt,
    link,
    githubLink,
    techStack,
    isImpactDriven,
    problem,
    strategy,
    impact,
    metrics,
    "gallery": gallery[]{ "url": asset->url, alt },
    content
  }
}`;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch<{ project: ProjectDetail } | null>(projectQuery, { slug });
  const project = data?.project;

  if (!project) {
    return { title: "Project Not Found" };
  }

  // Always emit a meta description — fall back to a generated one if the project has none.
  const description =
    project.description?.trim() ||
    `${project.title} — a software testing & QA automation case study by Sirajul Islam, covering strategy, tooling and measurable impact.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630, alt: project.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const data = await client.fetch<{ project: ProjectDetail } | null>(projectQuery, { slug });
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  if (!data || !data.project) {
    notFound();
  }

  const { project } = data;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/#projects" },
      { name: project.title, url: `/projects/${slug}` },
    ]),
    projectJsonLd({
      title: project.title,
      description: project.description,
      slug,
      image: project.image,
      techStack: project.techStack,
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectCaseStudy project={project} settings={settings} />
    </>
  );
}
