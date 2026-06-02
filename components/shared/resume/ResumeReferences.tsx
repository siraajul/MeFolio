import { Recommendation } from "@/types/sanity";
import { RESUME_HEADING } from "./types";

/** References section (hidden when there are none). */
export function ResumeReferences({ references }: { references: Recommendation[] }) {
  if (!references || references.length === 0) return null;

  return (
    <section className="break-inside-avoid">
      <h2 className={RESUME_HEADING}>References</h2>
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
  );
}
