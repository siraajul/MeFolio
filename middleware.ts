import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store using a Map with expiration
// Note: For production with multiple instances, use Redis (Upstash/Vercel KV)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get the pathname
  const { pathname } = request.nextUrl;

  // Apply stricter rate limiting to API routes
  if (pathname.startsWith("/api/")) {
    // Get IP address from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    const key = `${pathname}:${ip}`;

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = pathname.includes("send-otp") ? 3 : 10; // Stricter for OTP

    const entry = rateLimitStore.get(key);

    if (entry) {
      if (now > entry.resetAt) {
        // Reset window
        rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
      } else if (entry.count >= maxRequests) {
        // Rate limit exceeded
        return new NextResponse(
          JSON.stringify({ message: "Too many requests. Please try again later." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-RateLimit-Limit": maxRequests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": Math.ceil(entry.resetAt / 1000).toString(),
            },
          }
        );
      } else {
        entry.count++;
      }
    } else {
      rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    }
  }

  // Security Headers
  // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://us.i.posthog.com https://static.cloudflareinsights.com https://browser.sentry-cdn.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' https: data: blob: https://i.postimg.cc https://images.unsplash.com https://assets.aceternity.com https://assets.chanhdai.com https://cdn.sanity.io;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://cdn.sanity.io https://api.sanity.io https://*.api.sanity.io https://o4510738392809472.ingest.us.sentry.io https://us.i.posthog.com https://www.clarity.ms https://api.github.com https://*.ingest.sentry.io https://github-contributions-api.jogruber.de;
    media-src 'self' https://videos.pexels.com https://*.cloudfront.net;
    frame-src 'self' https://player.vimeo.com https://www.youtube.com https://www.youtube-nocookie.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s+/g, " ").trim();

  // Set security headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|pdf)).*)",
  ],
};
