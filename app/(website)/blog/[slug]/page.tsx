import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SupportKori } from "@/components/shared/SupportKori";

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
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found | Sirajul Islam",
    };
  }

  return {
    title: `${post.title} | Sirajul Islam`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${slug}`,
      type: "article",
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

// Type definitions for PortableText components
interface PortableTextImage {
  alt?: string;
  asset: {
    _ref: string;
  };
}

interface PortableTextCode {
  code: string;
  language?: string;
  filename?: string;
}

// Escape HTML to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/\u0026/g, "\u0026amp;")
    .replace(/\u003c/g, "\u0026lt;")
    .replace(/\u003e/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#039;");
}

const PortableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Post Image"}
            fill
            className="object-cover"
            unoptimized // Ensures GIFs remain animated and Sanity handles optimization
          />
        </div>
      );
    },
    code: ({ value }: { value: PortableTextCode }) => {
      // Escape the code content to prevent XSS
      const safeCode = escapeHtml(value.code);
      return (
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm max-w-full">
          {value.language && (
            <div className="text-xs text-neutral-500 mb-2 border-b border-neutral-700 pb-2">
              {value.language}
            </div>
          )}
          <code dangerouslySetInnerHTML={{ __html: safeCode }} />
        </pre>
      );
    },
  },
};

// Type definitions for content blocks
interface PortableTextChild {
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextChild[];
}

function estimateReadingTime(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "1 min read";

  let wordCount = 0;
  blocks.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });

  const readingSpeed = 200; // words per minute
  const minutes = Math.ceil(wordCount / readingSpeed);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-black text-foreground pb-20">

      {/* Back button — sits ABOVE the image on mobile, inside on desktop */}
      <div className="lg:hidden px-4 py-4 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] relative bg-neutral-100 dark:bg-neutral-900">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No Featured Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/50" />

        {/* Back Button — desktop only (hidden on mobile, shown above) */}
        <div className="hidden lg:block absolute top-10 left-10 z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Title + Summary overlay */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-5 sm:p-6 md:p-8 lg:p-12 xl:p-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight line-clamp-3">
              {post.title}
            </h1>
            {/* Summary hidden on very small screens to avoid overflow */}
            <p className="hidden sm:block text-white/80 text-sm md:text-xl max-w-2xl line-clamp-2 md:line-clamp-none">
              {post.summary}
            </p>
            <div className="flex items-center gap-2 md:gap-4 mt-3 md:mt-6 flex-wrap">
              {post.publishedAt && (
                <p className="text-brand font-mono text-xs md:text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
              <span className="text-white/40 text-xs">•</span>
              <p className="text-white/80 font-mono text-xs md:text-sm">
                {estimateReadingTime(post.content)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary shown below image on mobile (since it's hidden inside the hero) */}
      {post.summary && (
        <div className="sm:hidden px-4 pt-5 pb-1">
          <p className="text-muted-foreground text-sm leading-relaxed">{post.summary}</p>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-16 lg:py-20">
        <div className="prose prose-sm sm:prose-base prose-lg dark:prose-invert prose-neutral max-w-none prose-a:text-brand prose-img:rounded-2xl">
          {post.content ? (
             <PortableText value={post.content} components={PortableTextComponents} />
          ) : (
            <p className="text-muted-foreground italic">No content available.</p>
          )}
        </div>

        {/* Support Kori */}
        <SupportKori className="mt-12 mb-12" />

        {/* Series Navigation */}
        {post.series && post.series.posts && (
          <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              More in this series: <span className="text-foreground">{post.series.title}</span>
            </h3>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {(() => {
                const currentOrder = post.seriesOrder;
                const posts = post.series.posts;
                const prevPost = posts.find((p: any) => p.seriesOrder < currentOrder && p.slug !== post.slug) || 
                                 posts.filter((p: any) => p.seriesOrder === currentOrder - 1)[0]; 
                                 // Fallback if logic is tricky, but strictly:
                                 // With sorted list, just find index?
                const currentIndex = posts.findIndex((p: any) => p.slug === post.slug);
                const prev = posts[currentIndex - 1];
                const next = posts[currentIndex + 1];

                return (
                   <>
                    {prev ? (
                      <Link href={`/blog/${prev.slug}`} className="flex-1 group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-brand/50 transition-colors">
                        <div className="text-xs text-muted-foreground mb-1 group-hover:text-brand">Previous Story</div>
                        <div className="font-semibold">{prev.title}</div>
                      </Link>
                    ) : <div className="flex-1" />}
                    
                    {next ? (
                      <Link href={`/blog/${next.slug}`} className="flex-1 group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-brand/50 transition-colors text-right">
                        <div className="text-xs text-muted-foreground mb-1 group-hover:text-brand">Next Story</div>
                        <div className="font-semibold">{next.title}</div>
                      </Link>
                    ) : <div className="flex-1" />}
                   </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
