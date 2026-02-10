import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Sirajul Islam",
  description: "Browse all articles, tutorials, and insights on software quality assurance and automation.",
  openGraph: {
    title: "All Articles | Sirajul Islam",
    description: "Browse all articles, tutorials, and insights on software quality assurance and automation.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Articles | Sirajul Islam",
    description: "Browse all articles, tutorials, and insights on software quality assurance and automation.",
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogArchivePage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-900 py-16 px-6 md:px-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <Link 
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              All <span className="text-brand italic">Articles</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore my thoughts on software testing, automation frameworks, and the latest in QA technology.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post._id}
              className="flex flex-col gap-4 group bg-card border border-border rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:border-brand/50 hover:-translate-y-1"
            >
              <div className="bg-muted rounded-2xl aspect-video overflow-hidden relative w-full">
                 {post.imageUrl ? (
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 ) : (
                   <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground">
                     No Image
                   </div>
                 )}
              </div>
              <div className="flex flex-col gap-2 px-1 pb-2">
                <div className="text-xs text-brand font-mono mb-1">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </div>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-brand transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {posts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
                <p>No articles found.</p>
            </div>
        )}
      </div>
    </div>
  );
}
