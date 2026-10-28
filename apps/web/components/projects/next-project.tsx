import { HudLabel } from "@folio/ui";
import Link from "next/link";
import { formatProjectNumber, type Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";

const NEXT_COVER_SIZES = "(min-width: 1072px) 976px, calc(100vw - 48px)";

export function NextProject({ project }: { project: Project }) {
  return (
    <nav aria-label="Next project" className="mt-16 border-t border-border pt-8">
      <HudLabel as="p">[ Next project ]</HudLabel>
      <Link
        href={`/projects/${project.slug}`}
        className="group mt-4 block overflow-hidden rounded-xl border border-border bg-foreground/3 transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/40 hover:shadow-[0_12px_32px_-18px_var(--accent)] focus-visible:border-accent/40 focus-visible:shadow-[0_12px_32px_-18px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
      >
        <ProjectCover
          src={project.cover}
          name={project.name}
          sizes={NEXT_COVER_SIZES}
          className="rounded-none border-0 border-b"
        />
        <div className="flex items-center justify-between gap-4 p-6">
          <div>
            <p className="font-mono text-sm text-muted">{formatProjectNumber(project.order)}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">{project.name}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-3xl text-accent motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-2 motion-safe:group-focus-visible:translate-x-2"
          >
            →
          </span>
        </div>
      </Link>
    </nav>
  );
}
