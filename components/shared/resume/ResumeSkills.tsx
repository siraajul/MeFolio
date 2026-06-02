import { SkillCategory } from "@/types/sanity";
import { RESUME_HEADING } from "./types";

/** Technical-skills section, grouped by category. */
export function ResumeSkills({ skills }: { skills: SkillCategory[] }) {
  return (
    <section className="mb-6 break-inside-avoid">
      <h2 className={RESUME_HEADING}>Technical Skills</h2>
      <div className="grid grid-cols-1 gap-y-3">
        {skills?.map((category: SkillCategory) => (
          <div key={category._id} className="grid grid-cols-[1fr] sm:grid-cols-[150px_1fr] items-baseline gap-2">
            <span className="text-sm font-bold">{category.title}:</span>
            <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{category.skills.join(", ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
