import { Certification } from "@/types/sanity";
import { RESUME_HEADING } from "./types";

/** Certifications section (hidden when there are none). */
export function ResumeCertifications({ certifications }: { certifications: Certification[] }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="break-inside-avoid mb-6">
      <h2 className={RESUME_HEADING}>Certifications</h2>
      <ul className="list-disc list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
        {certifications.map((cert: Certification) => (
          <li key={cert._id}>
            <span className="font-semibold">{cert.title}</span> – {cert.providerName} ({cert.year})
          </li>
        ))}
      </ul>
    </section>
  );
}
