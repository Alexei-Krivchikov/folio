const SECTION_IDS = ["hero", "projects", "about", "experience", "contact"] as const;

type SectionId = (typeof SECTION_IDS)[number];

export const NAV_SECTION_IDS = SECTION_IDS.filter((id): id is Exclude<SectionId, "hero"> => id !== "hero");

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export function isSectionHash(hash: string): boolean {
  return SECTION_IDS.some((id) => hash === `#${id}`);
}

export function isNavSectionId(id: string): id is NavSectionId {
  return (NAV_SECTION_IDS as readonly string[]).includes(id);
}

const pad = (value: number) => String(value).padStart(2, "0");

export function sectionIndex(id: NavSectionId): string {
  return `[ ${pad(NAV_SECTION_IDS.indexOf(id) + 1)} / ${pad(NAV_SECTION_IDS.length)} ]`;
}

const NAV_LABELS: Record<NavSectionId, string> = {
  projects: "Projects",
  about: "About",
  experience: "Experience",
  contact: "Contact",
};

export const NAV_LINKS: { id: NavSectionId; label: string }[] = NAV_SECTION_IDS.map((id) => ({
  id,
  label: NAV_LABELS[id],
}));
