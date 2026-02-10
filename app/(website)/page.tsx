import { client } from "@/sanity/lib/client";
import Image from "next/image";
import {
  siteSettingsQuery,
  aboutQuery,
  experiencesQuery,
  skillCategoriesQuery,
  projectCategoriesQuery,
  educationsQuery,
  certificationsQuery,
  postsQuery,
} from "@/sanity/lib/queries";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import { EducationCard } from "@/components/shared/EducationCard";
import { Experience as ExperienceSection } from "@/components/sections/Experience";
import { Navbar } from "@/components/layout/Navbar";
import { Timeline } from "@/components/ui/timeline";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { Github, Linkedin, Mail } from "lucide-react";
import { Skills as SkillsSection } from "@/components/sections/Skills";
import { GithubActivity } from "@/components/sections/GithubActivity";

import { 
  SiteSettings, 
  About, 
  Experience, 
  SkillCategory, 
  ProjectCategory, 
  Education, 
  Certification, 
  Post 
} from "@/types/sanity";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const about = await client.fetch<About>(aboutQuery);
  const experiences = await client.fetch<Experience[]>(experiencesQuery);
  const skillCategories = await client.fetch<SkillCategory[]>(skillCategoriesQuery);
  const projectCategories = await client.fetch<ProjectCategory[]>(projectCategoriesQuery);
  const educations = await client.fetch<Education[]>(educationsQuery);
  const certifications = await client.fetch<Certification[]>(certificationsQuery);
  const posts = await client.fetch<Post[]>(postsQuery);

  // Map Certifications to Timeline Data
  const certificationTimelineData = certifications.map((cert: Certification) => ({
    title: cert.year,
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 uppercase tracking-wide">
          Certification
        </p>
        <div className="flex items-start gap-4">
          {cert.providerImageUrl && (
            <div className="relative w-12 h-12 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-1 border border-neutral-200 dark:border-neutral-700">
              <Image
                src={cert.providerImageUrl}
                alt={cert.title}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
          <h4 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            {cert.title}
          </h4>
          {cert.providerName && (
             <p className="text-brand font-medium text-sm mb-2">{cert.providerName}</p>
          )}
          {cert.level && (
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base mb-3">
              {cert.level}
            </p>
          )}
          {cert.description && (
            <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
              {cert.description}
            </p>
          )}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {cert.skills.map((skill: string, idx: number) => (
                <span 
                  key={idx}
                  className="inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
       </div>
      </div>
    ),
  }));

  // Fallback defaults for settings if undefined (e.g. initial load before content added)
  const heroProps = {
    firstName: settings?.firstName || "SIRAJUL",
    lastName: settings?.lastName || "ISLAM",
    tagline: settings?.tagline || "Ensuring software reliability and quality through automation.",
    profileImageUrl: settings?.profileImageUrl,
    socialLinks: settings?.socialLinks || [],
    cvVideo: settings?.cvVideo,
  };

  return (
    <>

      <Navbar />
      <div className="w-full" id="home">
        <Hero {...heroProps} />
        
        <div id="about">
          {/* Note: AboutSection is complex and currently static. 
              Future TODO: Pass dynamic 'about.content' if schema aligned. */}
          <AboutSection />
        </div>
        
        <SkillsSection categories={skillCategories} />
        
        {/* Experience Section */}
        <section id="experience" className="min-h-0 md:min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center uppercase tracking-tight">
            Work <span className="text-brand italic">Experience</span>
          </h2>
          {experiences?.length > 0 ? (
             <ExperienceSection
               className="w-full max-w-5xl mx-auto"
               experiences={experiences}
             />
          ) : (
             <p className="text-center text-muted-foreground">Add work experience in Sanity Studio</p>
          )}
        </section>

        <div id="projects">
          <Projects categories={projectCategories || []} />
        </div>

        {/* GitHub Activity Section */}
        <GithubActivity username={
            (settings?.github || settings?.socialLinks?.find((link: any) => link.platform.toLowerCase().includes("github"))?.url || "").split("/").pop() || "siraajul"
        } />

        {/* Education Section */}
        <section id="education" className="w-full flex flex-col justify-center items-center py-8 sm:py-12 px-4">
           <div className="mb-10 sm:mb-12 text-center">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
               Academic <span className="text-brand italic">Education</span>
             </h2>
             <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
               My foundation in Computer Science and Engineering.
             </p>
           </div>
           
           <div className="flex flex-col gap-8 w-full max-w-4xl">
             {educations?.length > 0 ? (
               educations.map((edu: any) => (
                 <EducationCard
                   key={edu._id}
                   universityName={edu.universityName}
                   degree={edu.degree}
                   period={edu.period}
                   location={edu.location}
                   description={edu.description}
                   logoUrl={edu.logoUrl}
                 />
               ))
             ) : (
                <p className="text-center text-muted-foreground">Add education in Sanity Studio</p>
             )}
           </div>
        </section>

        {/* Certification Section */}
        <section id="certifications" className="w-full flex flex-col justify-center py-12">
           <Timeline 
             data={certificationTimelineData} 
             title={<>Professional <span className="text-brand italic">Certifications</span></>}
             description="My professional qualifications and industry credentials."
           />
        </section>

        {/* Blog Section */}
        <section id="writing" className="min-h-0 md:min-h-screen w-full flex flex-col justify-center bg-background">
           <Blog posts={posts?.map((p: any) => ({
             id: p._id,
             title: p.title,
             summary: p.summary,
             image: p.imageUrl,
             link: p.externalLink || `/blog/${p.slug}`,
           })) || []} />
        </section>

        {/* Contact Section */}
        <div id="contact">
          <Contact 
            phone={settings?.phoneNumber}
            email={settings?.email}
            web={{
                label: "LinkedIn",
                url: settings?.linkedin || settings?.socialLinks?.find((link: any) => link.platform.toLowerCase().includes("linkedin"))?.url || "#"
            }}
          />
        </div>

        <Footer
          brandName={settings?.firstName ? `${settings.firstName} ${settings.lastName}` : "Sirajul Islam"}
          brandDescription={settings?.brandDescription || "SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance strategies."}
          socialLinks={[
             ...(settings?.github ? [{ icon: <Github className="w-6 h-6" />, href: settings.github, label: "GitHub" }] : []),
             ...(settings?.linkedin ? [{ icon: <Linkedin className="w-6 h-6" />, href: settings.linkedin, label: "LinkedIn" }] : []),
             ...(settings?.email ? [{ icon: <Mail className="w-6 h-6" />, href: `mailto:${settings.email}`, label: "Email" }] : []),
             ...(settings?.socialLinks?.filter((link: any) => {
               const p = link.platform.toLowerCase();
               return !p.includes('github') && !p.includes('linkedin');
             }).map((link: any) => ({
               icon: <Mail className="w-6 h-6" />,
               href: link.url,
               label: link.platform,
             })) || []),
          ]}
          navLinks={[
            { label: "Home", href: "/" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Blog", href: "#blog" },
          ]}
        />
      </div>
    </>
  );
}
