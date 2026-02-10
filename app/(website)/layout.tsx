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
    metadataBase: new URL("https://siraajul.vercel.app"),
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

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            name: "Sirajul Islam",
            jobTitle: "SQA Automation Engineer",
            url: "https://mefolio.vercel.app",
            sameAs: [
              "https://github.com/sirajul-islam",
              "https://linkedin.com/in/sirajul-islam-qa",
            ],
            description: "SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance.",
          }),
        }}
      />
    </>
  );
}
