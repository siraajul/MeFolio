import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";
import {
  siteSettingsQuery,
  aboutQuery,
  experiencesQuery,
  educationsQuery,
  skillCategoriesQuery,
  certificationsQuery,

  recommendationsQuery,
  resumeQuery,
} from "@/sanity/lib/queries";
import { SiteSettings } from "@/types/sanity";
import { ResumeTemplate } from "@/components/shared/ResumeTemplate";
import { DownloadButton } from "@/components/shared/DownloadButton";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  const title = settings?.firstName
    ? `Resume | ${settings.firstName} ${settings.lastName}`
    : "Resume | Sirajul Islam";
  const description = settings?.tagline
    ? `Professional Resume – ${settings.tagline}`
    : "Professional Resume of Sirajul Islam - SQA Engineer & SDET";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: settings?.profileImageUrl ? [{ url: settings.profileImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: settings?.profileImageUrl ? [settings.profileImageUrl] : [],
    },
  };
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ResumePage() {
  const [settings, about, experiences, educations, skills, certifications, references, resume] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(aboutQuery),
    client.fetch(experiencesQuery),
    client.fetch(educationsQuery),
    client.fetch(skillCategoriesQuery),
    client.fetch(certificationsQuery),
    client.fetch(recommendationsQuery),
    client.fetch(resumeQuery),
  ]);

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-10 print:bg-white print:py-0">
      
      {/* Back to Home Button */}
      <a 
        href="/"
        className="fixed top-6 left-6 z-50 print:hidden flex items-center gap-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all font-medium hover:scale-105 active:scale-95"
      >
        <span>←</span>
        <span className="hidden sm:inline">Back to Home</span>
      </a>

      {/* Download Button */}
      <DownloadButton />
      
      <div className="container mx-auto px-4 print:px-0 print:mx-0">
         <ResumeTemplate 
            settings={settings}
            about={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            certifications={certifications}
            references={references}
            resumeProjects={resume?.resumeProjects}
            coreCompetencies={resume?.coreCompetencies}
         />
      </div>
    </main>
  );
}
