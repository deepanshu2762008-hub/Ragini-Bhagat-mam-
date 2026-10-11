/**
 * Content model for the whole portfolio.
 * src/data/portfolio.ts is the single source of truth — components never
 * hardcode personal information.
 */

export type AchievementCategory =
  | 'Award'
  | 'Certification'
  | 'Professional Development'
  | 'Workshop'
  | 'Responsibility'
  | 'Student Achievement'
  | 'School Contribution';

export interface EducationEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface ExperienceEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface JourneyMilestone {
  year: string;
  label: string;
  description: string;
}

export interface Subject {
  name: string;
  shortDescription: string;
  /** Key into the SubjectArt illustration set (see components/art/SubjectArt.tsx) */
  illustration: string;
}

export interface Skill {
  name: string;
  /** 0–100. Decorative only — drives the hand-drawn stroke weight, never a bar. */
  level: number;
  note?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Achievement {
  category: AchievementCategory;
  title: string;
  year: string;
  description: string;
}

export interface Project {
  name: string;
  year: string;
  role: string;
  description: string;
  images: string[];
  details: string[];
}

export interface GalleryItem {
  image: string;
  caption: string;
  /** degrees the print is tilted on the page */
  rotation: number;
  size: 'sm' | 'md' | 'lg';
  alt: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  thumbnail: string;
  fullImage: string;
  /** Optional real PDF path (e.g. '/documents/xxx.pdf'). Falls back to fullImage. */
  pdf?: string;
  downloadable: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** student / parent / colleague */
  relation: string;
  year: string;
}

export interface Interest {
  name: string;
  /** Key into the InterestArt illustration set (see components/art/InterestArt.tsx) */
  illustration: string;
}

export interface FutureVision {
  statement: string;
  paragraph: string;
}

export interface ContactInformation {
  email: string;
  phone: string;
  institution: string;
  location: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage: string;
}
