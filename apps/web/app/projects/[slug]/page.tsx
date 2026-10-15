import { MDXContent } from "@content-collections/mdx/react";
import { HudLabel } from "@folio/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { formatProjectMeta, getNextProject, getProject, getProjectLinks, getProjects } from "@/lib/projects";

export const dynamicParams = false;

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
  h2: (props: ComponentProps<"h2">) => <h2 className="mt-12 text-2xl font-semibold text-foreground" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-accent underline underline-offset-4" {...props} />,
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(slug);
  const links = getProjectLinks(project);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <Link
          href="/#projects"
          className="inline-flex h-11 items-center text-sm text-muted transition-colors hover:text-accent md:h-auto"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-foreground md:text-5xl">{project.name}</h1>
        <p className="mt-3 text-sm text-muted">{formatProjectMeta(project)}</p>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg border border-border px-4 py-3 text-sm text-foreground md:py-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}

        <MDXContent code={project.body} components={mdxComponents} />

        {project.gallery.length > 0 && (
          <section aria-label="Screenshots" className="mt-12 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <div
                key={`${image.src}#${image.alt}`}
                className="relative aspect-video overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 768px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </section>
        )}

        {nextProject && (
          <nav className="mt-16 border-t border-border pt-8">
            <HudLabel as="p">[ Next project ]</HudLabel>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="mt-3 inline-flex min-h-11 items-center text-2xl font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {nextProject.name} →
            </Link>
          </nav>
        )}
      </article>
    </main>
  );
}
