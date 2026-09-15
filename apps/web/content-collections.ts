import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "*.mdx",
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
    order: z.number().int().positive(),
    name: z.string().min(1),
    type: z.enum(["commercial", "personal"]),
    year: z.string().min(1),
    summary: z.string().min(1),
    stack: z.array(z.string().min(1)).nonempty(),
    employer: z.string().min(1).optional(),
    links: z
      .object({
        github: z.array(z.object({ label: z.string().min(1), url: z.url() })).optional(),
        website: z.url().optional(),
      })
      .default({}),
    cover: z.string().startsWith("/"),
    gallery: z.array(z.object({ src: z.string().startsWith("/"), alt: z.string().min(1) })).default([]),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const { content: _content, ...project } = document;
    return { ...project, body };
  },
});

export default defineConfig({
  content: [projects],
});
