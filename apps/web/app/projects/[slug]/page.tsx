import { MDXContent } from "@content-collections/mdx/react";
import { AccentText, buttonVariants, cn, SectionHeading } from "@folio/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { NextProject } from "@/components/projects/next-project";
import { ProjectCover } from "@/components/projects/project-cover";
import { formatProjectMeta, getNextProject, getProject, getProjectLinks, getProjects } from "@/lib/projects";
import { projectCoverTransitionName } from "@/lib/view-transition";

export const dynamicParams = false;

const COVER_SIZES = "(min-width: 1072px) 976px, calc(100vw - 48px)";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Alexei Krivchikov`,
    description: project.summary,
  };
}

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-14 text-2xl font-semibold tracking-tight text-foreground first:mt-10 md:text-3xl" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted md:text-lg" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mt-4 max-w-[68ch] list-disc space-y-3 pl-5 text-base leading-relaxed text-muted marker:text-accent md:text-lg"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a
      className="rounded-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-from hover:decoration-accent-from focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="break-words rounded-md border border-border bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  AccentText: (props: ComponentProps<typeof AccentText>) => <AccentText className="text-accent" {...props} />,
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(slug);
  const links = getProjectLinks(project);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto w-full max-w-5xl px-6 py-16">
        <Link
          href="/#projects"
          className="inline-flex h-11 items-center text-sm text-muted transition-colors hover:text-accent md:h-auto"
        >
          ← Back
        </Link>

        <div className="mt-8">
          <SectionHeading as="h1" label={`[ ${formatProjectMeta(project)} ]`}>
            {project.name}
          </SectionHeading>
        </div>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {links.map((link, index) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: index === 0 ? "default" : "outline" }), "max-md:h-11")}
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}

        <ProjectCover
          src={project.cover}
          name={project.name}
          sizes={COVER_SIZES}
          priority
          transitionName={projectCoverTransitionName(project.slug)}
          className="mt-10 rounded-xl"
        />

        <div className="max-w-3xl">
          <MDXContent code={project.body} components={mdxComponents} />
        </div>

        {project.gallery.length > 0 && (
          <section aria-label="Screenshots" className="mt-12 flex flex-col gap-6">
            {project.gallery.map((image) => (
              <div key={`${image.src}#${image.alt}`} className="overflow-hidden rounded-xl border border-border">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  quality={90}
                  sizes={COVER_SIZES}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </section>
        )}

        {nextProject && <NextProject project={nextProject} />}
      </article>
    </main>
  );
}
