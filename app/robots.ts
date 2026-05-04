import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://siraajul.com';
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio/', '/private/', '/api/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/studio/', '/private/', '/api/'],
            },
            {
                userAgent: 'bingbot',
                allow: '/',
                disallow: ['/studio/', '/private/', '/api/'],
            },
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
