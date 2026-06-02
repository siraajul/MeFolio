import { Experience, ExperiencePosition } from "@/types/sanity";
import { RESUME_HEADING } from "./types";

/** Work-experience section: companies, positions, and bulleted descriptions. */
export function ResumeExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="mb-6">
      <h2 className={RESUME_HEADING}>Work Experience</h2>
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
                      <li key={i}>{line.replace(/^[\s\-•]+\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
