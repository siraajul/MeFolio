import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClientShell } from "@/components/layout/ClientShell";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(siteSettingsQuery);

  return {
    title: {
      absolute: "Sirajul | SQA - SDET",
      template: "%s | Sirajul Islam"
    },
    description: 
      siteSettings?.tagline || 
      "I help engineering teams ship faster without breaking production. Stop losing weekends to manual testing and hotfixes.",
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com"),
    openGraph: {
      title: "Sirajul | SQA - SDET",
      description: 
        siteSettings?.tagline || 
        "I help engineering teams ship faster without breaking production. Stop losing weekends to manual testing and hotfixes.",
      type: "website",
      ...(siteSettings?.ogImageUrl && {
        images: [{ 
          url: siteSettings.ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Sirajul | SQA - SDET" 
        }]
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: "Sirajul | SQA - SDET",
      description: siteSettings?.tagline || "I help engineering teams ship faster without breaking production. Stop losing weekends to manual testing and hotfixes.",
      ...(siteSettings?.ogImageUrl && {
        images: [siteSettings.ogImageUrl]
      }),
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
      <ClientShell>
        {children}
      </ClientShell>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteSettings?.firstName ? `${siteSettings.firstName} ${siteSettings.lastName}` : "Sirajul Islam",
            jobTitle: siteSettings?.tagline || "SQA Automation Engineer",
            url: process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com",
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
