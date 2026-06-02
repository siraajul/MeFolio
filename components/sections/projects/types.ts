// Shared types/constants for the Projects section components.

export interface Project {
  id: string;
  image: string;
  title: string;
  link?: string;
  description?: string;
  slug?: string;
}

/** Fallback image shown when a project has no image set. */
export const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200";
