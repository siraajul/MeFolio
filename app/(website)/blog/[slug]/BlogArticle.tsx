import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import { SupportKori } from "@/components/shared/SupportKori";
import { getPortableTextComponents } from "@/components/shared/portableTextComponents";

// Blog posts frame inline images at a fixed height; the rest of the block config is shared.
const PortableTextComponents = getPortableTextComponents({
  imageClassName: "relative w-full h-96 my-8 rounded-lg overflow-hidden",
  imageFallbackAlt: "Post Image",
});

// A sibling post within the same series (used for prev/next navigation).
export interface SeriesPost {
  title: string;
  slug: string;
  seriesOrder?: number;
}

/** The shape of a single post as returned by the blog detail GROQ query. */
export interface BlogPost {
  title: string;
  summary?: string;
  imageUrl?: string;
  imageAlt?: string;
  content?: React.ComponentProps<typeof PortableText>["value"];
  publishedAt?: string;
  externalLink?: string;
  slug: string;
  series?: { title: string; slug: string; posts: SeriesPost[] };
  seriesOrder?: number;
}

interface PortableTextChild {
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextChild[];
}

/** Rough reading-time estimate from the post's Portable Text body (~200 wpm). */
function estimateReadingTime(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "1 min read";

  let wordCount = 0;
  for (const block of blocks as PortableTextBlock[]) {
    if (block._type === "block" && block.children) {
      for (const child of block.children) {
        if (child.text) wordCount += child.text.split(/\s+/).length;
      }
    }
  }

  const readingSpeed = 200; // words per minute
  const minutes = Math.ceil(wordCount / readingSpeed);
  return `${minutes} min read`;
}

/** Presentational blog article (data is fetched by the page). */
export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article id="main-content" tabIndex={-1} className="min-h-screen bg-background text-foreground pb-20">

      {/* Back button — sits ABOVE the image on mobile, inside on desktop */}
      <div className="lg:hidden px-4 py-4 bg-background border-b border-neutral-100 dark:border-neutral-900">
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
            alt={post.imageAlt || post.title}
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
                const posts: SeriesPost[] = post.series!.posts;
                const currentIndex = posts.findIndex((p) => p.slug === post.slug);
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
