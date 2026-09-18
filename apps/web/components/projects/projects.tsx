import { formatProjectMeta, formatProjectNumber, getProjects } from "@/lib/projects";
import { type ProjectCard, ProjectGrid } from "./project-grid";

export function Projects() {
  const projects: ProjectCard[] = getProjects().map((project) => ({
    slug: project.slug,
    number: formatProjectNumber(project.order),
    name: project.name,
    meta: formatProjectMeta(project),
    summary: project.summary,
    stack: project.stack,
    cover: project.cover,
  }));

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-16">
      <ProjectGrid projects={projects} />
    </section>
  );
}
