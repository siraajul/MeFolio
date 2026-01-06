import { client } from "@/sanity/lib/client";
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
import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection2 from "@/components/ui/about-section-2";
import ProjectsSection from "@/components/ui/3d-folder";
import { EducationCard } from "@/components/ui/education-card";
import { WorkExperience } from "@/components/ui/work-experience";
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";
import { SiteNavBar } from "@/components/ui/site-navbar";
import { Timeline } from "@/components/ui/timeline";
import { Blog } from "@/components/ui/blog-section";
import { Contact2 } from "@/components/ui/contact-2";
import { Footer } from "@/components/ui/modem-animated-footer";
import { Github, Linkedin, Mail } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch(siteSettingsQuery);
  const about = await client.fetch(aboutQuery);
  const experiences = await client.fetch(experiencesQuery);
  const skillCategories = await client.fetch(skillCategoriesQuery);
  const projectCategories = await client.fetch(projectCategoriesQuery);
  const educations = await client.fetch(educationsQuery);
  const certifications = await client.fetch(certificationsQuery);
  const posts = await client.fetch(postsQuery);

  // Map Certifications to Timeline Data
  const certificationTimelineData = certifications.map((cert: any) => ({
    title: cert.year,
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 uppercase tracking-wide">
          Certification
        </p>
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            {cert.title}
          </h4>
          {cert.level && (
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              {cert.level}
            </p>
          )}
          {cert.description && (
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              {cert.description}
            </p>
          )}
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
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <SiteNavBar />
      <div className="w-full" id="home">
        <PortfolioHero {...heroProps} />
        
        <div id="about">
          {/* Note: AboutSection2 is complex and currently static. 
              Future TODO: Pass dynamic 'about.content' if schema aligned. */}
          <AboutSection2 />
        </div>
        
        {/* Skills Section */}
        <section id="skills" className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center uppercase tracking-tight">
            Technical <span className="text-brand italic">Expertise</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {skillCategories?.length > 0 ? (
              skillCategories.map((category: any) => (
                <div 
                  key={category._id}
                  className="p-6 rounded-2xl border border-border/50 shadow-lg bg-card/30 backdrop-blur-sm hover:border-brand/30 transition-colors"
                >
                  <ExpandableSkillTags
                    title={category.title}
                    skills={category.skills}
                    initialCount={8}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">Add skills in Sanity Studio</p>
            )}
          </div>
        </section>
        
        {/* Experience Section */}
        <section id="experience" className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center uppercase tracking-tight">
            Work <span className="text-brand italic">Experience</span>
          </h2>
          {experiences?.length > 0 ? (
             <WorkExperience
               className="w-full max-w-5xl mx-auto"
               experiences={experiences}
             />
          ) : (
             <p className="text-center text-muted-foreground">Add work experience in Sanity Studio</p>
          )}
        </section>

        <div id="projects">
          <ProjectsSection categories={projectCategories || []} />
        </div>

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
        <section id="writing" className="min-h-screen w-full flex flex-col justify-center bg-background">
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
          <Contact2 />
        </div>

        <Footer
          brandName={settings?.firstName ? `${settings.firstName} ${settings.lastName}` : "Sirajul Islam"}
          brandDescription={settings?.brandDescription || "Senior SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance strategies."}
          socialLinks={settings?.socialLinks?.map((link: any) => ({
            icon: link.platform.toLowerCase().includes("github") ? <Github className="w-6 h-6" /> : 
                  link.platform.toLowerCase().includes("linkedin") ? <Linkedin className="w-6 h-6" /> : 
                  <Mail className="w-6 h-6" />,
            href: link.url,
            label: link.platform,
          })) || [
             { icon: <Github className="w-6 h-6" />, href: "https://github.com", label: "GitHub" },
             { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com", label: "LinkedIn" },
             { icon: <Mail className="w-6 h-6" />, href: "mailto:hello@example.com", label: "Email" }
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
