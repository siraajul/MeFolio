import React from "react";
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react";

interface ResumeProps {
  settings: any;
  about: any;
  experiences: any[];
  educations: any[];
  skills: any[];
  certifications: any[];
  references?: any[];
}

export const ResumeTemplate = ({
  settings,
  about,
  experiences,
  educations,
  skills,
  certifications,
  references,
}: ResumeProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8 md:p-12 font-sans shadow-none print:shadow-none print:max-w-none print:w-full print:p-0">
      
      {/* Header */}
      <header className="border-b-2 border-black pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">
          {settings?.firstName} {settings?.lastName}
        </h1>
        <p className="text-lg font-medium text-neutral-700 mb-4">{settings?.tagline}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
          {settings?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{settings.email}</span>
            </div>
          )}
          {settings?.phoneNumber && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{settings.phoneNumber}</span>
            </div>
          )}
          {/* Location - assuming it might be in settings or added to settings. For now hardcode or check if exists */}
          {settings?.location && (
             <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{settings.location}</span>
            </div>
          )}
          
          {settings?.socialLinks?.map((link: any, idx: number) => (
             <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline print:no-underline">
               {link.platform.toLowerCase().includes("linkedin") && <Linkedin className="w-4 h-4" />}
               {link.platform.toLowerCase().includes("github") && <Github className="w-4 h-4" />}
               <span>{link.url.replace(/^https?:\/\//, '')}</span>
             </a>
          ))}
          <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>siraajul.vercel.app</span> {/* Hardcoded for print/fallback */}
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-3 pb-1">
          Professional Summary
        </h2>
        <div className="text-sm leading-relaxed text-neutral-800">
             {/* If about.content is PortableText, we might need a simple serializer or just use plain text if available.
                 For simplicity in this template, we'll try to use tagline or brandDescription if about content is complex object.
                 Assuming about.content is blocks, for resume plain text is better. 
                 Let's use brandDescription for now as it's likely plain text summary. */}
             <p>{settings?.brandDescription || "Experienced Software Quality Assurance Engineer with a strong background in automation testing, performance optimization, and building scalable test frameworks. Dedicated to delivering high-quality software solutions through rigorous testing and continuous improvement."}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-4 pb-1">
          Work Experience
        </h2>
        <div className="flex flex-col gap-6">
          {experiences?.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.companyName}</h3>
                {/* Find the period from positions if available, or just show company period */}
              </div>
              
              {exp.positions?.map((pos: any, idx: number) => (
                <div key={pos._key} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-sm italic">{pos.title}</h4>
                    <span className="text-sm font-medium text-neutral-600">{pos.employmentPeriod}</span>
                  </div>
                  {pos.description && (
                    <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 space-y-1">
                      {pos.description.split('\n').filter((line: string) => line.trim()).map((line: string, i: number) => (
                        <li key={i}>{line.replace(/^-\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      
      {/* Education */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-4 pb-1">
          Education
        </h2>
        <div className="flex flex-col gap-4">
          {educations?.map((edu: any) => (
            <div key={edu._id} className="flex justify-between items-start">
               <div>
                 <h3 className="font-bold text-sm">{edu.universityName}</h3>
                 <p className="text-sm text-neutral-700">{edu.degree}</p>
                 {edu.description && <p className="text-xs text-neutral-500 mt-1">{edu.description}</p>}
               </div>
               <div className="text-right">
                 <span className="text-sm font-medium text-neutral-600 block">{edu.period}</span>
                 <span className="text-xs text-neutral-500 block">{edu.location}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-4 pb-1">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 gap-y-2">
            {skills?.map((category: any) => (
                <div key={category._id} className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-sm font-bold min-w-[120px]">{category.title}:</span>
                    <span className="text-sm text-neutral-700">{category.skills.join(", ")}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Certifications (Optional) */}
      {certifications && certifications.length > 0 && (
        <section className="break-inside-avoid mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-4 pb-1">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 space-y-1">
                {certifications.map((cert: any) => (
                    <li key={cert._id}>
                        <span className="font-semibold">{cert.title}</span> – {cert.providerName} ({cert.year})
                    </li>
                ))}
            </ul>
        </section>
      )}

      {/* References */}
      {/* Note: In a real app, we need to fetch references. For now, we'll assume they are passed in props or we might need to update the query. 
          The current query in page.tsx doesn't fetch references yet. 
          However, the user asked to "add my location, phone, linkedin, mail, github into cv . then at the last references /. recommendation".
          The template receives `settings` which has socialLinks.
          We should update the Contact Info area in Header first.
      */}
      
       {/* References Section */}
       {references && references.length > 0 && (
        <section className="break-inside-avoid">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-neutral-300 mb-4 pb-1">
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {references.map((ref: any) => (
                    <div key={ref._id} className="flex flex-col">
                        <div className="font-bold text-sm">{ref.name}</div>
                        <div className="text-xs text-neutral-600 italic mb-2">{ref.position} {ref.company && `@ ${ref.company}`}</div>
                        <div className="text-sm text-neutral-700 italic">"{ref.quote}"</div>
                        {ref.email && <div className="text-xs text-neutral-500 mt-1">Email: {ref.email}</div>}
                    </div>
                ))}
            </div>
        </section>
       )}
    </div>
  );
};
