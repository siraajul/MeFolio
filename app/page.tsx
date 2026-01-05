import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection2 from "@/components/ui/about-section-2";
import ProjectsSection from "@/components/ui/3d-folder";
import { WorkExperience, ExperienceItemType } from "@/components/ui/work-experience";
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";

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

const SKILL_CATEGORIES = [
  {
    title: "Web Automation",
    skills: ["Playwright", "Cypress", "Selenium WebDriver", "Puppeteer", "TestCafe", "Robot Framework"],
  },
  {
    title: "API Testing",
    skills: ["Postman", "REST Assured", "SoapUI", "GraphQL", "Swagger/OpenAPI", "Karate"],
  },
  {
    title: "Mobile Testing",
    skills: ["Appium", "Espresso", "XCUITest", "Detox", "Android Studio", "Xcode"],
  },
  {
    title: "Performance Testing",
    skills: ["JMeter", "K6", "Gatling", "Loader.io", "BlazeMeter"],
  },
  {
    title: "CI/CD & DevOps",
    skills: ["GitHub Actions", "Jenkins", "GitLab CI", "Docker", "Kubernetes", "AWS CodeBuild"],
  },
  {
    title: "Languages & Core",
    skills: ["TypeScript", "JavaScript", "Java", "Python", "SQL", "Git", "Linux"],
  },
];

import { Timeline } from "@/components/ui/timeline";
import { Blog, BlogPost } from "@/components/ui/blog-section";
import { Contact2 } from "@/components/ui/contact-2";

const EDUCATION_DATA = [
  {
    title: "2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 uppercase tracking-wide">
          Certification
        </p>
        <div className="">
             <h4 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">ISTQB Certified Tester</h4>
             <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">Foundation Level (CTFL)</p>
             <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
               Certified in fundamental software testing concepts, test lifecycle, and defect management.
             </p>
        </div>
      </div>
    ),
  },
  {
    title: "2019 - 2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 uppercase tracking-wide">
          University Degree
        </p>
        <div className="mb-4">
             <h4 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Bachelor of Science in Computer Science and Engineering</h4>
             <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">Daffodil International University (DIU)</p>
        </div>
         <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base mb-4">
            Graduated with a strong foundation in software engineering, algorithms, and database systems. 
            Relevant coursework included Software Quality Assurance, Data Structures, and Web Development.
         </p>
         <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 text-sm md:text-base space-y-1">
           <li>Major: Software Engineering</li>
           <li>Capstone Project: Automated Testing Framework for E-commerce Microservices</li>
         </ul>
      </div>
    ),
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Mastering Playwright for E2E Testing",
    summary: "A comprehensive guide to setting up a scalable Playwright framework with TypeScript, covering page objects, fixtures, and CI/CD integration.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop", // React generic
    link: "#",
  },
  {
    id: "2",
    title: "Shift-Left Testing: A Practical Approach",
    summary: "How to integrate testing earlier in the development lifecycle to catch bugs sooner and reduce remediation costs.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop", // Code generic
    link: "#",
  },
  {
    id: "3",
    title: "Performance Testing with K6",
    summary: "Load testing your APIs efficiently using K6. Learn how to script user scenarios and analyze performance metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Analytics generic
    link: "#",
  },
  {
    id: "4",
    title: "The Art of Writing Effective Bug Reports",
    summary: "Tips and templates for writing clear, actionable bug reports that developers love, ensuring faster resolution times.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", // Meeting generic
    link: "#",
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
        
        {/* Skills Section */}
        <section className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center uppercase tracking-tight">
            Technical <span className="text-brand italic">Expertise</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {SKILL_CATEGORIES.map((category, index) => (
              <div 
                key={category.title}
                className="p-6 rounded-2xl border border-border/50 shadow-lg bg-card/30 backdrop-blur-sm hover:border-brand/30 transition-colors"
              >
                <ExpandableSkillTags
                  title={category.title}
                  skills={category.skills}
                  initialCount={6}
                />
              </div>
            ))}
          </div>
        </section>
        
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

        {/* Education Section */}
        <section className="min-h-screen w-full flex flex-col justify-center bg-white dark:bg-neutral-950">
           <Timeline data={EDUCATION_DATA} />
        </section>

        {/* Blog Section */}
        <section className="min-h-screen w-full flex flex-col justify-center bg-background">
           <Blog posts={BLOG_POSTS} />
        </section>

        {/* Contact Section */}
        <Contact2 />
      </div>
    </>
  );
}
