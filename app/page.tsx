import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection2 from "@/components/ui/about-section-2";
import ProjectsSection from "@/components/ui/3d-folder";
import { WorkExperience, ExperienceItemType } from "@/components/ui/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "sqa-current",
    companyName: "TechCorp Solutions",
    // companyLogo: "", // Add logo URL if available
    positions: [
      {
        id: "pos-1",
        title: "Senior QA Automation Engineer",
        employmentPeriod: "Jan 2023 — Present",
        employmentType: "Full-time",
        icon: "code",
        description: `- Architected and maintained a scalable test automation framework using Playwright and TypeScript, reducing regression time by 60%.
- Integrated automated tests into CI/CD pipelines (GitHub Actions) for continuous feedback.
- Mentored junior QA engineers on automation best practices and code reviews.
- Collaborated with developers to define testable requirements and ensure testability of new features.`,
        skills: ["Playwright", "TypeScript", "GitHub Actions", "Docker", "Agile"],
        isExpanded: true,
      },
      {
        id: "pos-2",
        title: "QA Engineer",
        employmentPeriod: "Jun 2021 — Dec 2022",
        employmentType: "Full-time",
        icon: "code",
        description: `- Developed E2E tests for web applications using Cypress.
- Performed API testing using Postman and REST Assured.
- Conducted manual exploratory testing to uncover complex edge cases.`,
        skills: ["Cypress", "JavaScript", "Postman", "SQL", "Jira"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "sqa-past",
    companyName: "InnovateX",
    positions: [
      {
        id: "pos-3",
        title: "Junior QA Tester",
        employmentPeriod: "Jan 2020 — May 2021",
        employmentType: "Full-time",
        icon: "business",
        description: `- Executed manual test cases for web and mobile applications.
- Reported and tracked bugs using Jira, verifying fixes in subsequent builds.
- specific focus on mobile usability and cross-browser compatibility.`,
        skills: ["Manual Testing", "Jira", "Mobile Testing", "TestRail"],
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full">
        <PortfolioHero />
        <AboutSection2 />
        
        {/* Experience Section */}
        <section className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center uppercase tracking-tight">
            Work <span className="text-brand italic">Experience</span>
          </h2>
          <WorkExperience
            className="w-full max-w-5xl mx-auto rounded-3xl border border-border/50 shadow-xl bg-card/30 backdrop-blur-sm"
            experiences={WORK_EXPERIENCE}
          />
        </section>

        <ProjectsSection />
      </div>
    </>
  );
}
