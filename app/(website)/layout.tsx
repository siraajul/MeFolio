import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { ThemeToggleFab } from "@/components/shared/ThemeToggle";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(siteSettingsQuery);

  return {
    title: {
      default: "Sirajul Islam | SQA Automation Engineer & SDET in Bangladesh",
      template: "%s | Sirajul Islam - SQA Expert"
    },
    description: 
      siteSettings?.tagline || 
      "SQA Automation Engineer & SDET specializing in scalable test frameworks, performance testing, and quality assurance strategies.",
    keywords: [
      "SQA Engineer Bangladesh",
      "Best SQA Engineer in Bangladesh",
      "Top SDET Bangladesh",
      "Test Automation Engineer Dhaka",
      "Software Quality Assurance Expert",
      "Playwright Automation Expert",
      "QA Automation Portfolio",
      "Sirajul Islam SQA",
      "Remote SQA Engineer",
      "Senior SDET Portfolio"
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.vercel.app"),
    openGraph: {
      title: "Sirajul Islam | SQA Automation Engineer",
      description: 
        siteSettings?.tagline || 
        "Expert in Test Automation, SDET, and Quality Assurance strategies.",
      type: "website",
      images: siteSettings?.ogImageUrl ? [{ url: siteSettings.ogImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sirajul Islam | SQA Automation Engineer",
      description: siteSettings?.tagline || "Expert in Test Automation, SDET, and Quality Assurance strategies.",
      images: siteSettings?.ogImageUrl ? [siteSettings.ogImageUrl] : [],
    },
  };
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <SmoothScroll>
        {children}
        <ThemeToggleFab />
      </SmoothScroll>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteSettings?.firstName ? `${siteSettings.firstName} ${siteSettings.lastName}` : "Sirajul Islam",
            jobTitle: siteSettings?.tagline || "SQA Automation Engineer",
            url: process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.vercel.app",
            sameAs: [
              ...(siteSettings?.github ? [siteSettings.github] : []),
              ...(siteSettings?.linkedin ? [siteSettings.linkedin] : []),
              ...(siteSettings?.socialLinks?.map((l: { url: string }) => l.url) || []),
            ].filter(Boolean),
            description: siteSettings?.brandDescription || "SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance.",
          }),
        }}
      />
    </>
  );
}
