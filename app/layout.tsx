import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, Antic } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SentryProvider } from "@/components/providers/SentryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const antic = Antic({
  variable: "--font-antic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: {
    default: "Siraajul — SQA Automation Engineer & SDET | Sirajul Islam",
    template: "%s | Siraajul — Sirajul Islam",
  },
  description:
    "Siraajul (Sirajul Islam) — SQA Automation Engineer & SDET specializing in Cypress, Playwright, Selenium, CI/CD pipelines, and scalable test frameworks. Visit siraajul.com for portfolio, projects, and QA consulting.",
  keywords: [
    "Siraajul",
    "siraajul",
    "Sirajul",
    "Sirajul Islam",
    "Siraajul Islam",
    "siraajul.com",
    "SQA Engineer",
    "SDET",
    "Automation Engineer",
    "Playwright",
    "Cypress",
    "Selenium",
    "Quality Assurance",
    "Test Automation",
    "CI/CD",
    "Software Testing",
    "SQA Portfolio",
    "SQA Engineer Bangladesh",
    "Best SQA Engineer",
  ],
  authors: [{ name: "Siraajul (Sirajul Islam)", url: "https://siraajul.com" }],
  creator: "Siraajul — Sirajul Islam",
  publisher: "Siraajul — Sirajul Islam",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com",
    siteName: "Siraajul — Sirajul Islam | SQA Engineer Portfolio",
    title: "Siraajul — SQA Automation Engineer & SDET",
    description: "Siraajul (Sirajul Islam) — SQA Automation Engineer & SDET. Cypress, Playwright, Selenium expert. Visit siraajul.com for portfolio and QA consulting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siraajul — SQA Automation Engineer & SDET",
    description:
      "Siraajul (Sirajul Islam) — SQA Automation Engineer & SDET. Cypress, Playwright, Selenium expert.",
    creator: "@sirajul_islam",
  },
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com",
  },
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
    "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${antic.variable} antialiased`}
      >
        {/* Speed up the first image fetch from Sanity's CDN (React 19 hoists these to <head>). */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=(s==='dark')||(s!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){}})()`,
          }}
        />
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity-analytics" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <SentryProvider>
          {children}
        </SentryProvider>
      </body>
    </html>
  );
}
