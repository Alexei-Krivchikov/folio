export const HEADER_TOP_GAP = 16;

export const HEADER_PILL_HEIGHT = 56;

export const HEADER_OFFSET = HEADER_TOP_GAP + HEADER_PILL_HEIGHT + 16;

export const SECTION_IDS = ["hero", "projects", "about", "experience", "contact"] as const;

export function isSectionHash(hash: string): boolean {
  return SECTION_IDS.some((id) => hash === `#${id}`);
}

export const NAV_SECTION_IDS = ["projects", "about", "experience", "contact"] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export function isNavSectionId(id: string): id is NavSectionId {
  return (NAV_SECTION_IDS as readonly string[]).includes(id);
}

export const NAV_LINKS: { id: NavSectionId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
