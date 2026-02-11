import React from "react";
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react";
import {
  SiteSettings,
  About,
  Experience,
  ExperiencePosition,
  Education,
  SkillCategory,
  Certification,
  Recommendation,
  SocialLink,
} from "@/types/sanity";

interface ResumeProps {
  settings: SiteSettings;
  about: About;
  experiences: Experience[];
  educations: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
  references?: Recommendation[];
}

export const ResumeTemplate = ({
  settings,
  about,
  experiences,
  educations,
  skills,
  certifications,

  references,
  resumeProjects,
  coreCompetencies,
}: ResumeProps & { resumeProjects?: any[]; coreCompetencies?: string[] }) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white dark:bg-neutral-900 text-black dark:text-neutral-100 p-5 md:p-12 font-sans shadow-none print:shadow-none print:max-w-none print:w-full print:p-0 print:bg-white print:text-black">
      
      {/* Header */}
      <header className="border-b-2 border-black dark:border-neutral-300 pb-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
          {settings?.firstName} {settings?.lastName}
        </h1>
        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-4">{settings?.resumeTagline || settings?.tagline}</p>
        
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">

          {settings?.email && (
            <>
                <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{settings.email}</span>
                </div>
                <span className="text-neutral-300">•</span>
            </>
          )}
          {settings?.phoneNumber && (
            <>
                <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{settings.phoneNumber}</span>
                </div>
                <span className="text-neutral-300">•</span>
            </>
          )}
          
          {settings?.linkedin && (
             <>
                <a href={settings.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline print:no-underline">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                </a>
                <span className="text-neutral-300">•</span>
             </>
          )}
          {settings?.github && (
             <>
                <a href={settings.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline print:no-underline">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                </a>
                <span className="text-neutral-300">•</span>
             </>
          )}

          {settings?.socialLinks?.map((link: SocialLink, idx: number) => {
             // Skip if it's already shown via specific fields
             if (link.platform.toLowerCase().includes("linkedin") && settings.linkedin) return null;
             if (link.platform.toLowerCase().includes("github") && settings.github) return null;
             
             return (
              <React.Fragment key={idx}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline print:no-underline">
                    {link.platform.toLowerCase().includes("linkedin") && <Linkedin className="w-4 h-4" />}
                    {link.platform.toLowerCase().includes("github") && <Github className="w-4 h-4" />}
                    <span>{link.url.replace(/^https?:\/\//, '')}</span>
                  </a>
                  <span className="text-neutral-300">•</span>
              </React.Fragment>
             );
          })}
          <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, '').replace('siraajul.vercel.app', 'siraajul.com') || "siraajul.com"}</span>
          </div>
          {settings?.location && (
            <>
                <span className="text-neutral-300">•</span>
                <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{settings.location}</span>
                </div>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-3 pb-1">
          Professional Summary
        </h2>
        <div className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
             <p>{settings?.brandDescription || "Experienced Software Quality Assurance Engineer with a strong background in automation testing, performance optimization, and building scalable test frameworks. Dedicated to delivering high-quality software solutions through rigorous testing and continuous improvement."}</p>
        </div>
      </section>

      {/* Core Competencies */}
      {(() => {
        const demoCompetencies = ["Test Automation Architecture", "Performance Engineering", "API Testing & Integration", "CI/CD Pipeline Design", "Mobile App Testing (iOS/Android)", "Agile & Scrum Methodologies"];
        const competenciesToDisplay = (coreCompetencies && coreCompetencies.length > 0) ? coreCompetencies : demoCompetencies;
        
        return (
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-3 pb-1">
                Core Competencies
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                    {competenciesToDisplay.map((skill: string, idx: number) => (
                        <div key={idx} className="flex items-center">
                            <span className="font-medium">• {skill}</span>
                        </div>
                    ))}
                </div>
            </section>
        );
      })()}

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
          Work Experience
        </h2>
        <div className="flex flex-col gap-6">
          {experiences?.map((exp: Experience) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.companyName}</h3>
              </div>
              
              {exp.positions?.map((pos: ExperiencePosition) => (
                <div key={pos._key} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-sm italic">{pos.title}</h4>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{pos.employmentPeriod}</span>
                  </div>
                  {pos.description && (
                    <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                      {pos.description.split('\n').filter((line: string) => line.trim()).map((line: string, i: number) => (
                        <li key={i}>{line.replace(/^[\s\-\u2022]+\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      
      {/* Resume Projects */}
      {resumeProjects && resumeProjects.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
            Projects
          </h2>
          <div className="flex flex-col gap-4">
            {resumeProjects.map((project: any) => (
              <div key={project._key} className="flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">
                        {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                {project.title} <Globe className="w-3 h-3" />
                            </a>
                        ) : (
                            project.title
                        )}
                    </h3>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{project.date}</span>
                </div>
                {project.techStack && project.techStack.length > 0 && (
                     <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
                        {project.techStack.join(" • ")}
                     </div>
                )}
                {project.summary && project.summary.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                    {project.summary.map((point: string, idx: number) => (
                      <li key={idx}>
                        {point.replace(/^[\s\-\u2022]+\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
          Education
        </h2>
        <div className="flex flex-col gap-4">
          {educations?.map((edu: Education) => (
            <div key={edu._id} className="flex justify-between items-start">
               <div>
                 <h3 className="font-bold text-sm">{edu.universityName}</h3>
                 <p className="text-sm text-neutral-700 dark:text-neutral-300">{edu.degree}</p>
                 {edu.description && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{edu.description}</p>}
               </div>
               <div className="text-right">
                 <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 block">{edu.period}</span>
                 <span className="text-xs text-neutral-500 dark:text-neutral-400 block">{edu.location}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 gap-y-3">
            {skills?.map((category: SkillCategory) => (
                <div key={category._id} className="grid grid-cols-[1fr] sm:grid-cols-[150px_1fr] items-baseline gap-2">
                    <span className="text-sm font-bold">{category.title}:</span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{category.skills.join(", ")}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="break-inside-avoid mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {certifications.map((cert: Certification) => (
                    <li key={cert._id}>
                        <span className="font-semibold">{cert.title}</span> – {cert.providerName} ({cert.year})
                    </li>
                ))}
            </ul>
        </section>
      )}

       {/* References Section */}
       {references && references.length > 0 && (
        <section className="break-inside-avoid">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1">
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {references.map((ref: Recommendation) => (
                    <div key={ref._id} className="flex flex-col">
                        <div className="font-bold text-sm">{ref.name}</div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 italic mb-2">{ref.position} {ref.company && `@ ${ref.company}`}</div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300 italic">&quot;{ref.quote}&quot;</div>
                        {ref.email && <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Email: {ref.email}</div>}
                    </div>
                ))}
            </div>
        </section>
       )}
    </div>
  );
};
