import {
  SiteSettings,
  About,
  Experience,
  Education,
  SkillCategory,
  Certification,
  Recommendation,
} from "@/types/sanity";
import { ResumeHeader } from "@/components/shared/resume/ResumeHeader";
import { ResumeExperience } from "@/components/shared/resume/ResumeExperience";
import { ResumeProjects } from "@/components/shared/resume/ResumeProjects";
import { ResumeEducation } from "@/components/shared/resume/ResumeEducation";
import { ResumeSkills } from "@/components/shared/resume/ResumeSkills";
import { ResumeCertifications } from "@/components/shared/resume/ResumeCertifications";
import { ResumeReferences } from "@/components/shared/resume/ResumeReferences";
import { RESUME_HEADING, type ResumeProject } from "@/components/shared/resume/types";

interface ResumeProps {
  settings: SiteSettings;
  about: About;
  experiences: Experience[];
  educations: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
  references?: Recommendation[];
}

const DEMO_COMPETENCIES = [
  "Test Automation Architecture",
  "Performance Engineering",
  "API Testing & Integration",
  "CI/CD Pipeline Design",
  "Mobile App Testing (iOS/Android)",
  "Agile & Scrum Methodologies",
];

/**
 * Print-optimized resume. Composes the individual sections from ./resume/*; the only logic
 * left here is the summary/competencies fallbacks. Rendered on /resume and via PrintButton.
 */
export const ResumeTemplate = ({
  settings,
  experiences,
  educations,
  skills,
  certifications,
  references,
  resumeProjects,
  coreCompetencies,
}: ResumeProps & { resumeProjects?: ResumeProject[]; coreCompetencies?: string[] }) => {
  const competencies = coreCompetencies && coreCompetencies.length > 0 ? coreCompetencies : DEMO_COMPETENCIES;

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white dark:bg-neutral-900 text-black dark:text-neutral-100 p-5 md:p-12 font-sans shadow-none print:shadow-none print:max-w-none print:w-full print:p-0 print:bg-white print:text-black">
      <ResumeHeader settings={settings} />

      {/* Summary */}
      <section className="mb-6">
        <h2 className={RESUME_HEADING.replace("mb-4", "mb-3")}>Professional Summary</h2>
        <div className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
          <p>{settings?.brandDescription || "Experienced Software Quality Assurance Engineer with a strong background in automation testing, performance optimization, and building scalable test frameworks. Dedicated to delivering high-quality software solutions through rigorous testing and continuous improvement."}</p>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="mb-6">
        <h2 className={RESUME_HEADING.replace("mb-4", "mb-3")}>Core Competencies</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-800 dark:text-neutral-200">
          {competencies.map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center">
              <span className="font-medium">• {skill}</span>
            </div>
          ))}
        </div>
      </section>

      <ResumeExperience experiences={experiences} />
      {resumeProjects && <ResumeProjects projects={resumeProjects} />}
      <ResumeEducation educations={educations} />
      <ResumeSkills skills={skills} />
      <ResumeCertifications certifications={certifications} />
      {references && <ResumeReferences references={references} />}
    </div>
  );
};
