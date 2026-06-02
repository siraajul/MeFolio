import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogArticle, type BlogPost } from "./BlogArticle";

// Use ISR: pre-render at build time, refresh every 60 seconds from Sanity
export const revalidate = 60;

// Pre-render all blog slugs at build time for instant first load
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)].slug.current`
  );
  return (slugs || []).map((slug) => ({ slug }));
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// GROQ Query to fetch a single post
const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  summary,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  content,
  publishedAt,
  externalLink,
  "slug": slug.current,
  "series": series->{
    title,
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)] | order(seriesOrder asc) {
      title,
      "slug": slug.current,
      seriesOrder
    }
  },
  seriesOrder
}`;

// Generate SEO Metadata
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(postQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Always emit a meta description — fall back to a generated one if the post has no summary.
  const description =
    post.summary?.trim() ||
    `${post.title} — an article on software quality assurance, test automation and CI/CD engineering by Sirajul Islam.`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(postQuery, { slug });

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
