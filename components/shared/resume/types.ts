// A project entry rendered in the resume (sourced from the Sanity resume document).
export interface ResumeProject {
  _key: string;
  title?: string;
  link?: string;
  date?: string;
  techStack?: string[];
  summary?: string[];
}

/** Shared section-heading classes for the print resume. */
export const RESUME_HEADING =
  "text-lg font-bold uppercase tracking-wider border-b border-neutral-300 dark:border-neutral-700 mb-4 pb-1";
