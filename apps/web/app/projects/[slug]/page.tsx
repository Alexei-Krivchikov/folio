import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { getProject, getProjects, projectTypeLabel } from "@/lib/projects";

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <Link href="/#projects" className="text-sm text-zinc-500 transition-colors hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-white md:text-5xl">{project.name}</h1>
        <p className="mt-3 text-sm text-zinc-500">
          {projectTypeLabel[project.type]} · {project.year}
        </p>

        <MDXContent code={project.body} components={mdxComponents} />
      </article>
    </main>
  );
}
