export interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface SiteSettings extends SanityBody {
    firstName: string;
    lastName: string;
    tagline: string;
    resumeTagline?: string;
    profileImageUrl: string;
    brandDescription?: string;
    location?: string;
    socialLinks?: SocialLink[];
    ogImageUrl?: string;
    cvVideo?: string;
    phoneNumber?: string;
    email?: string;
    linkedin?: string;
    github?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface About extends SanityBody {
    title: string;
    description: string;
    profileImageUrl: string;
}

export interface Experience extends SanityBody {
    id: string; // mapped from _id in query
    companyName: string;
    companyLogo?: string;
    isCurrentEmployer: boolean;
    positions: ExperiencePosition[];
}

export interface ExperiencePosition {
    _key: string;
    title: string;
    employmentPeriod: string;
    employmentType: string;
    description: string;
    skills: string[];
    isExpanded?: boolean;
}

export interface SkillCategory extends SanityBody {
    title: string;
    skills: string[];
}

export interface ProjectCategory extends SanityBody {
    title: string;
    gradient?: string;
    projects: Project[];
}

export interface Project extends SanityBody {
    id: string; // mapped from _key
    title: string;
    description: string;
    image: string; // specific to project category query
    link?: string;
}

export interface Education extends SanityBody {
    universityName: string;
    degree: string;
    period: string; // or startDate/endDate projected
    location: string;
    description: string;
    logoUrl?: string;
}

export interface Certification extends SanityBody {
    title: string;
    providerName: string;
    providerImageUrl?: string;
    year: string;
    level?: string;
    description?: string;
    skills?: string[];
    certificateUrl?: string;
}

export interface Post extends SanityBody {
    title: string;
    slug: { current: string } | string; // handled by projection usually just string if projected
    summary: string;
    imageUrl?: string;
    publishedAt: string;
    externalLink?: string;
    content?: unknown; // portable text
}

export interface Recommendation extends SanityBody {
    name: string;
    position: string;
    company?: string;
    quote: string;
    linkedin?: string;
    email?: string;
    photoUrl?: string;
}

export interface GitHubContribution {
    date: string;
    count: number;
    level: number;
}

export interface ResumeProject {
    _key: string;
    title: string;
    link?: string;
    date?: string;
    techStack?: string[];
    summary?: string[];
}

export interface Resume extends SanityBody {
    title: string;
    professionalSummary?: string;
    contactInfo?: {
        email?: string;
        phone?: string;
        location?: string;
        website?: string;
        linkedin?: string;
        github?: string;
    };
    education?: Education[];
    experience?: Experience[];
    skills?: SkillCategory[];
    certifications?: Certification[];
    references?: Recommendation[];
    resumeProjects?: ResumeProject[];
}
