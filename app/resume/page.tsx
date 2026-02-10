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
} from "@/sanity/lib/queries";
import { ResumeTemplate } from "@/components/ui/resume-template";
import { PrintButton } from "@/components/ui/print-button";

export const metadata: Metadata = {
  title: "Resume | Sirajul Islam",
  description: "Professional Resume of Sirajul Islam - SQA Engineer & SDET",
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ResumePage() {
  const settings = await client.fetch(siteSettingsQuery);
  const about = await client.fetch(aboutQuery);
  const experiences = await client.fetch(experiencesQuery);
  const educations = await client.fetch(educationsQuery);
  const skills = await client.fetch(skillCategoriesQuery);
  const certifications = await client.fetch(certificationsQuery);
  // Fetch all recommendations
  const references = await client.fetch(recommendationsQuery);

  return (
    <main className="min-h-screen bg-neutral-100 py-10 print:bg-white print:py-0">
      
      {/* Print Button */}
      <PrintButton />
      
      <div className="container mx-auto px-4 print:px-0 print:mx-0">


         <ResumeTemplate 
            settings={settings}
            about={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            certifications={certifications}
            references={references}
         />
      </div>
    </main>
  );
}
