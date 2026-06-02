import { ProjectCategory } from "@/types/sanity";
import { AnimatedFolder } from "./projects/AnimatedFolder";

// Re-exported for convenience so existing imports of the Project shape keep working.
export type { Project } from "./projects/types";

interface ProjectsProps {
  categories?: ProjectCategory[];
}

/**
 * "QA Projects" section: renders one {@link AnimatedFolder} per Sanity project category.
 * The interactive pieces (folder, fanned cards, lightbox) live in ./projects/*.
 */
export default function Projects({ categories = [] }: ProjectsProps) {
  return (
    <section className="bg-background text-foreground transition-colors duration-500 selection:bg-accent/30 selection:text-accent-foreground">
      <div className="max-w-7xl mx-auto pt-12 px-4 md:px-6 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          QA <span className="text-brand italic">Projects</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          A showcase of test automation frameworks, performance testing, and quality assurance strategies.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-12 justify-items-center">
            {categories.map((folder, index) => (
              <div
                key={folder._id || folder.title}
                className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <AnimatedFolder
                  title={folder.title}
                  projects={folder.projects}
                  gradient={folder.gradient}
                  className="w-full mx-auto"
                />
              </div>
            ))}
          </div>
        ) : (
             <div className="text-center py-20 text-muted-foreground">
                <p>No projects found. Please add content in Sanity Studio.</p>
             </div>
        )}
      </section>
    </section>
  );
}
