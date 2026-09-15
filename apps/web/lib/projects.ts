import { allProjects, type Project } from "content-collections";

export type { Project };

export function getProjects(): Project[] {
  return [...allProjects].sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function formatProjectNumber(order: number): string {
  return `_${String(order).padStart(2, "0")}.`;
}

export const projectTypeLabel: Record<Project["type"], string> = {
  commercial: "Commercial",
  personal: "Personal",
};
