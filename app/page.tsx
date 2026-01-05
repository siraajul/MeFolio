import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection2 from "@/components/ui/about-section-2";
import ProjectsSection from "@/components/ui/3d-folder";
import { EducationCard } from "@/components/ui/education-card";
import { WorkExperience, ExperienceItemType } from "@/components/ui/work-experience";
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";
import { SiteNavBar } from "@/components/ui/site-navbar";

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
import { Footer } from "@/components/ui/modem-animated-footer";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";




const CERTIFICATION_DATA = [
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
      <SiteNavBar />
      <div className="w-full" id="home">
        <PortfolioHero />
        <div id="about">
          <AboutSection2 />
        </div>
        
        {/* Skills Section */}
        <section id="skills" className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center uppercase tracking-tight">
            Technical <span className="text-brand italic">Expertise</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {SKILL_CATEGORIES.map((category, index) => (
              <div 
                key={category.title}
                className="p-6 rounded-2xl border border-border/50 shadow-lg bg-card/30 backdrop-blur-sm hover:border-brand/30 transition-colors"
              >
                <ExpandableSkillTags
                  title={category.title}
                  skills={category.skills}
                  initialCount={8}
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* Experience Section */}
        <section id="experience" className="min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center uppercase tracking-tight">
            Work <span className="text-brand italic">Experience</span>
          </h2>
          <WorkExperience
            className="w-full max-w-5xl mx-auto"
            experiences={WORK_EXPERIENCE}
          />
        </section>

        <div id="projects">
          <ProjectsSection />
        </div>



        {/* Education Section */}
        <section id="education" className="w-full flex flex-col justify-center items-center py-12 px-4">
           <div className="mb-12 text-center">
             <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
               Academic <span className="text-brand italic">Education</span>
             </h2>
             <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
               My foundation in Computer Science and Engineering.
             </p>
           </div>
           
           <EducationCard
             universityName="Daffodil International University"
             degree="B.Sc. in Computer Science and Engineering"
             period="2019 - 2023"
             location="Dhaka, Bangladesh"
             description="Graduated with a strong foundation in software engineering, algorithms, and database systems. Relevant coursework included Software Quality Assurance, Data Structures, and Web Development. Capstone Project: Automated Testing Framework for E-commerce Microservices."
             logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Daffodil_International_University_logo.svg/1200px-Daffodil_International_University_logo.svg.png"
           />
        </section>

        {/* Certification Section */}
        <section id="certifications" className="w-full flex flex-col justify-center py-12">
           <Timeline 
             data={CERTIFICATION_DATA} 
             title={<>Professional <span className="text-brand italic">Certifications</span></>}
             description="My professional qualifications and industry credentials."
           />
        </section>

        {/* Blog Section */}
        <section id="writing" className="min-h-screen w-full flex flex-col justify-center bg-background">
           <Blog posts={BLOG_POSTS} />
        </section>

        {/* Contact Section */}
        <div id="contact">
          <Contact2 />
        </div>

        <Footer
          brandName="Sirajul Islam"
          brandDescription="Senior SQA Automation Engineer & SDET specializing in scalable test frameworks and quality assurance strategies."
          socialLinks={[
            {
              icon: <Github className="w-6 h-6" />,
              href: "https://github.com",
              label: "GitHub",
            },
            {
              icon: <Linkedin className="w-6 h-6" />,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
            {
              icon: <Mail className="w-6 h-6" />,
              href: "mailto:hello@example.com",
              label: "Email",
            },
          ]}
          navLinks={[
            { label: "Home", href: "/" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Blog", href: "#blog" },
          ]}
        />
      </div>
    </>
  );
}
