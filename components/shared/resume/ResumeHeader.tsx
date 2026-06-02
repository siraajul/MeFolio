import React from "react";
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react";
import { SiteSettings, SocialLink } from "@/types/sanity";

/** Resume header: name, tagline, and the row of contact links. */
export function ResumeHeader({ settings }: { settings: SiteSettings }) {
  return (
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
          <span>{process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, '') || "siraajul.com"}</span>
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
  );
}
