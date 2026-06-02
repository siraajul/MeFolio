import { Globe } from "lucide-react";
import { RESUME_HEADING, type ResumeProject } from "./types";

/** Projects section (only rendered when the resume document defines projects). */
export function ResumeProjects({ projects }: { projects: ResumeProject[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mb-6 break-inside-avoid">
      <h2 className={RESUME_HEADING}>Projects</h2>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
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
                  <li key={idx}>{point.replace(/^[\s\-•]+\s*/, '')}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
