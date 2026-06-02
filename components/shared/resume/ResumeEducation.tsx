import { Education } from "@/types/sanity";
import { RESUME_HEADING } from "./types";

/** Education section. */
export function ResumeEducation({ educations }: { educations: Education[] }) {
  return (
    <section className="mb-6 break-inside-avoid">
      <h2 className={RESUME_HEADING}>Education</h2>
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
  );
}
