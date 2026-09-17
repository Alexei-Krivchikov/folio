import Link from "next/link";
import { formatProjectMeta, formatProjectNumber, getProjects } from "@/lib/projects";

export function Projects() {
  const projects = getProjects();

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Selected work</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Projects</h2>

      <ul className="mt-10 grid gap-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="block rounded-xl border border-zinc-800 p-6 transition-colors hover:border-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <p className="font-mono text-sm text-zinc-500">{formatProjectNumber(project.order)}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{formatProjectMeta(project)}</p>
              <p className="mt-3 text-zinc-400">{project.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
