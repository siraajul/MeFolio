import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClientShell } from "@/components/layout/ClientShell";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(siteSettingsQuery);

  const tagline = siteSettings?.tagline || "SQA Automation Engineer & SDET — I help engineering teams ship faster without breaking production.";

  return {
    title: {
      absolute: "Siraajul — SQA Automation Engineer & SDET | Sirajul Islam",
      template: "%s | Siraajul — Sirajul Islam"
    },
    description: `Siraajul (Sirajul Islam) — ${tagline} Cypress, Playwright, Selenium expert. Visit siraajul.com for portfolio, projects, and QA consulting.`,
    keywords: [
      "Siraajul",
      "siraajul",
      "Sirajul",
      "Sirajul Islam",
      "Siraajul Islam",
      "siraajul.com",
      "SQA Engineer Bangladesh",
      "Best SQA Engineer in Bangladesh",
      "Top SDET Bangladesh",
      "Test Automation Engineer Dhaka",
      "Software Quality Assurance Expert",
      "Playwright Automation Expert",
      "QA Automation Portfolio",
      "Remote SQA Engineer",
      "Senior SDET Portfolio"
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com"),
    openGraph: {
      title: "Siraajul — SQA Automation Engineer & SDET | Sirajul Islam",
      description: `Siraajul (Sirajul Islam) — ${tagline} Visit siraajul.com for portfolio and QA consulting.`,
      type: "profile",
      siteName: "Siraajul — Sirajul Islam",
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com",
    },
    twitter: {
      card: "summary_large_image",
      title: "Siraajul — SQA Automation Engineer & SDET",
      description: `Siraajul (Sirajul Islam) — ${tagline}`,
    },
  };
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await client.fetch(siteSettingsQuery);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://siraajul.com";
  const fullName = siteSettings?.firstName ? `${siteSettings.firstName} ${siteSettings.lastName}` : "Sirajul Islam";
  const tagline = siteSettings?.tagline || "SQA Automation Engineer & SDET";
  const brandDescription = siteSettings?.brandDescription || "SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance.";
  const profileImageUrl = siteSettings?.profileImageUrl;

  const socialLinks = [
    ...(siteSettings?.github ? [siteSettings.github] : []),
    ...(siteSettings?.linkedin ? [siteSettings.linkedin] : []),
    ...(siteSettings?.socialLinks?.map((l: { url: string }) => l.url) || []),
  ].filter(Boolean);

  // Combined JSON-LD graph for maximum SEO signal
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite schema — helps Google show sitelinks & associate the brand name
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: "Siraajul",
        alternateName: ["Siraajul", "Sirajul", "Sirajul Islam", "Siraajul Islam", "siraajul"],
        url: baseUrl,
        description: `Siraajul (${fullName}) — ${brandDescription}`,
        publisher: { "@id": `${baseUrl}/#person` },
        inLanguage: "en-US",
      },
      // 2. ProfilePage schema — tells Google this is a personal profile page
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: `Siraajul — ${fullName}`,
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${baseUrl}/#person` },
        inLanguage: "en-US",
      },
      // 3. Person schema — the main entity, heavily optimized for name search
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: fullName,
        alternateName: ["Siraajul", "Sirajul", "Siraajul Islam", "siraajul"],
        givenName: siteSettings?.firstName || "Sirajul",
        familyName: siteSettings?.lastName || "Islam",
        jobTitle: tagline,
        description: `Siraajul (${fullName}) — ${brandDescription}`,
        url: baseUrl,
        ...(profileImageUrl ? { image: profileImageUrl } : {}),
        sameAs: socialLinks,
        knowsAbout: [
          "Software Quality Assurance",
          "Test Automation",
          "Cypress",
          "Playwright",
          "Selenium",
          "CI/CD",
          "SDET",
          "Performance Testing",
          "API Testing",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Freelance / Available for hire",
        },
      },
    ],
  };

  return (
    <>
      <ClientShell>
        {children}
      </ClientShell>
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
