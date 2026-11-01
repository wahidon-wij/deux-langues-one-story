/**
 * Language-neutral public facts. Only public channels live here.
 * CONFIDENTIALITY: never add a phone number, postal address, date of birth,
 * student number, identity document, or the name of the current employer,
 * its clients, colleagues, internal tools, clusters, domains or URLs.
 */
export const site = {
  name: "Abdelouahed Akabbab",
  email: "akabbababdelouahed2@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdelouahed-akabbab/",
  linkedinLabel: "linkedin.com/in/abdelouahed-akabbab",
  github: "https://github.com/wahidon-wij",
  githubLabel: "github.com/wahidon-wij",
  photo: "/photo.jpg",
  cv: "/cv.pdf",
  cvDownloadName: "CV_Abdelouahed_Akabbab.pdf",
} as const;

export type Lang = "fr" | "en";

export const LANGS: readonly Lang[] = ["fr", "en"] as const;

export const SECTION_IDS = {
  projects: "projets",
  experience: "experience",
  skills: "competences",
  education: "formation",
  contact: "contact",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

export const PROJECT_HASH_PREFIX = "projet-";
