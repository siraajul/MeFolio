/**
 * Schema.org JSON-LD builders for content pages (blog posts, project case studies).
 *
 * `author`/`publisher` reference the Person entity declared once in the (website) layout via
 * its `@id` (`${BASE_URL}/#person`), so we don't duplicate identity data on every page and
 * search engines / AI assistants resolve them to the same author.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com";
const PERSON_REF = { "@id": `${BASE_URL}/#person` };

export interface BreadcrumbItem {
  name: string;
  /** Absolute or root-relative URL for this crumb. */
  url: string;
}

/** BreadcrumbList (e.g. Home › Blog › Post Title) — powers breadcrumb rich results. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/** BlogPosting schema for an article page. */
export function blogPostingJsonLd(opts: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  datePublished?: string;
}) {
  const url = `${BASE_URL}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished, dateModified: opts.datePublished } : {}),
    author: PERSON_REF,
    publisher: PERSON_REF,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "en-US",
  };
}

/** CreativeWork schema for a project case study. */
export function projectJsonLd(opts: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  techStack?: string[];
}) {
  const url = `${BASE_URL}/projects/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.techStack && opts.techStack.length ? { keywords: opts.techStack.join(", ") } : {}),
    author: PERSON_REF,
    creator: PERSON_REF,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "en-US",
  };
}
