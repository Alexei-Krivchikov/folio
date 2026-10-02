import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...getProjects().map((project) => `/projects/${project.slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
