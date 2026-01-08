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
    profileImageUrl: string;
    brandDescription?: string;
    socialLinks?: SocialLink[];
    ogImageUrl?: string;
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
    content?: any; // portable text
}
