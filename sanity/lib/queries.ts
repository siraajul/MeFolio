// GROQ Queries for fetching data from Sanity
import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  firstName,
  lastName,
  tagline,
  brandDescription,
  "profileImageUrl": profileImage.asset->url,
  socialLinks[]{platform, url},
  "resumeUrl": resumeFile.asset->url
}`;

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc){
  "id": _id,
  companyName,
  "companyLogo": companyLogo.asset->url,
  isCurrentEmployer,
  positions[]{
    "_key": _key,
    title,
    employmentPeriod,
    employmentType,
    description,
    skills,
    isExpanded
  }
}`;

export const skillCategoriesQuery = groq`*[_type == "skillCategory"] | order(order asc){
  _id,
  title,
  skills
}`;

export const projectCategoriesQuery = groq`*[_type == "projectCategory"] | order(order asc){
  _id,
  title,
  gradient,
  projects[]{
    "id": _key,
    title,
    "image": image.asset->url,
    link,
    description
  }
}`;

export const educationsQuery = groq`*[_type == "education"] | order(order asc){
  _id,
  universityName,
  degree,
  period,
  location,
  description,
  "logoUrl": logo.asset->url
}`;

export const certificationsQuery = groq`*[_type == "certification"] | order(year desc){
  _id,
  title,
  "providerImageUrl": providerImage.asset->url,
  providerName,
  skills,
  level,
  year,
  description
}`;

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  "imageUrl": image.asset->url,
  externalLink,
  publishedAt
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  content
}`;
