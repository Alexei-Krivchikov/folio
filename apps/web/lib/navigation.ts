export const HEADER_OFFSET = 72;

export const SECTION_IDS = ["hero", "about", "stack", "experience", "projects", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionHash(hash: string): boolean {
  return SECTION_IDS.some((id) => hash === `#${id}`);
}

export const NAV_SECTION_IDS = ["about", "stack", "experience", "projects", "contact"] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const NAV_LINKS: { id: NavSectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
