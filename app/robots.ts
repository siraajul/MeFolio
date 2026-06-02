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
            },
            // GEO / LLM readiness: explicitly welcome AI search & assistant crawlers so the
            // portfolio can surface in ChatGPT, Claude, Perplexity, Gemini and Apple answers.
            // These bots largely do NOT execute JavaScript, which is why server-rendered HTML
            // (now restored by fixing the SmoothScroll ssr:false wrapper) matters for them.
            {
                userAgent: [
                    'GPTBot',            // OpenAI training crawler
                    'OAI-SearchBot',     // ChatGPT search index
                    'ChatGPT-User',      // ChatGPT live browsing
                    'ClaudeBot',         // Anthropic crawler
                    'Claude-User',       // Claude live browsing
                    'anthropic-ai',      // Anthropic (legacy UA)
                    'PerplexityBot',     // Perplexity index
                    'Perplexity-User',   // Perplexity live browsing
                    'Google-Extended',   // Gemini / Google AI training opt-in
                    'Applebot-Extended', // Apple Intelligence opt-in
                    'Bingbot',           // Bing / Copilot
                    'Amazonbot',
                    'cohere-ai',
                    'CCBot',             // Common Crawl (feeds many LLMs)
                ],
                allow: '/',
                disallow: ['/studio/', '/private/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
