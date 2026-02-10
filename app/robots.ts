import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/studio/', '/private/'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://siraajul.vercel.app'}/sitemap.xml`,
    }
}
