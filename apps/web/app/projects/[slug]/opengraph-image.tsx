import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "@/components/og/og-template";
import { formatProjectMeta, getProject, getProjects } from "@/lib/projects";

export const alt = "Project preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return new ImageResponse(
    <OgTemplate>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>{project.name}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>{formatProjectMeta(project)}</div>
        <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>{project.stack.join(" · ")}</div>
      </div>
    </OgTemplate>,
    { ...size },
  );
}
