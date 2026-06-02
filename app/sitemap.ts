import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

interface PostEntry { slug: string; lastmod: string }
interface ProjectCategoryEntry { _updatedAt: string; slugs: string[] }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siraajul.com'

    // Fetch dynamic routes with their real last-modified dates from Sanity.
    // Posts: prefer publishedAt, then the auto _updatedAt / _createdAt timestamps.
    // Projects are array members inside a projectCategory, so they inherit the
    // category document's _updatedAt (the closest "last edited" signal available).
    const [posts, projectCategories] = await Promise.all([
        client.fetch<PostEntry[]>(groq`*[_type == "post" && defined(slug.current)]{
            "slug": slug.current,
            "lastmod": coalesce(publishedAt, _updatedAt, _createdAt)
        }`),
        client.fetch<ProjectCategoryEntry[]>(groq`*[_type == "projectCategory"]{
            _updatedAt,
            "slugs": projects[defined(slug.current)].slug.current
        }`),
    ])

    const postUrls: MetadataRoute.Sitemap = (posts || []).map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(p.lastmod),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const projectUrls: MetadataRoute.Sitemap = (projectCategories || []).flatMap((cat) =>
        (cat.slugs || []).map((slug) => ({
            url: `${baseUrl}/projects/${slug}`,
            lastModified: new Date(cat._updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    )

    // Newest content date drives the blog index's lastmod; fall back to now.
    const latestPost = postUrls.reduce<Date | null>((latest, u) => {
        const d = u.lastModified ? new Date(u.lastModified) : null
        return d && (!latest || d > latest) ? d : latest
    }, null)

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: latestPost || new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...projectUrls,
        ...postUrls,
    ]
}
