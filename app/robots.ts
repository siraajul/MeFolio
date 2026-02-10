import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/studio/', '/private/'],
        },
        sitemap: 'https://siraajul.vercel.app/sitemap.xml',
    }
}
