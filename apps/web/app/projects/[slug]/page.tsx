import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { formatProjectMeta, getNextProject, getProject, getProjectLinks, getProjects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => <h2 className="mt-12 text-2xl font-semibold text-white" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-zinc-400" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-400" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-zinc-200" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-white underline underline-offset-4" {...props} />,
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
        <Link href="/#projects" className="text-sm text-zinc-500 transition-colors hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-white md:text-5xl">{project.name}</h1>
        <p className="mt-3 text-sm text-zinc-500">{formatProjectMeta(project)}</p>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}

        <MDXContent code={project.body} components={mdxComponents} />

        {nextProject && (
          <nav className="mt-16 border-t border-zinc-800 pt-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Next project</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="mt-3 inline-block text-2xl font-semibold text-white transition-colors hover:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {nextProject.name} →
            </Link>
          </nav>
        )}
      </article>
    </main>
  );
}
