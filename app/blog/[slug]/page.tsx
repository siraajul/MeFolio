import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";

// Revalidate every 60 seconds
export const revalidate = 60;

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
      type: "article",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
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

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
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
    code: ({ value }: any) => {
      return (
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm max-w-full">
          <code>{value.code}</code>
        </pre>
      );
    },
  },
};

function estimateReadingTime(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "1 min read";

  let wordCount = 0;
  blocks.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child: any) => {
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
      {/* ... Hero Section ... */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-neutral-100 dark:bg-neutral-900">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No Featured Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {post.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">
              {post.summary}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {post.publishedAt && (
                <p className="text-brand font-mono text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              <span className="text-white/40 text-sm">•</span>
              <p className="text-white/80 font-mono text-sm">
                {estimateReadingTime(post.content)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none prose-a:text-brand prose-img:rounded-2xl">
          {post.content ? (
             <PortableText value={post.content} components={PortableTextComponents} />
          ) : (
            <p className="text-muted-foreground italic">No content available.</p>
          )}
        </div>

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
