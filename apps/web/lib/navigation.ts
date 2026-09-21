export const HEADER_OFFSET = 72;

export const SECTION_IDS = ["hero", "about", "stack", "experience", "projects", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionHash(hash: string): boolean {
  return SECTION_IDS.some((id) => hash === `#${id}`);
}
