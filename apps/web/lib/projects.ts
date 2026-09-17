import { allProjects, type Project } from "content-collections";

export type { Project };

export function getProjects(): Project[] {
  return [...allProjects].sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}

export function formatProjectNumber(order: number): string {
  return `_${String(order).padStart(2, "0")}.`;
}

export const projectTypeLabel: Record<Project["type"], string> = {
  commercial: "Commercial",
  personal: "Personal",
};

export type ProjectLink = { label: string; url: string };

export function getProjectLinks(project: Project): ProjectLink[] {
  const github = (project.links.github ?? []).map((repo) => ({
    label: `GitHub — ${repo.label}`,
    url: repo.url,
  }));
  return project.links.website ? [...github, { label: "Website", url: project.links.website }] : github;
}

export function formatProjectMeta(project: Project): string {
  const type = projectTypeLabel[project.type];
  return [project.employer ? `${type} · ${project.employer}` : type, project.year].join(" · ");
}
