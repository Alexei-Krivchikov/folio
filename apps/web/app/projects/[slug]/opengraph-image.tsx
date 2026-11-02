import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { OgTemplate, ogColors, ogImageContentType, ogImageSize } from "@/components/og/og-template";
import { getOgFonts } from "@/lib/og-fonts";
import { formatProjectMeta, formatProjectNumber, getProject, getProjects } from "@/lib/projects";

export const alt = "Project preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

const DEFAULT_ACCENT = ogColors.accent;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const accent = project.accent ?? DEFAULT_ACCENT;

  return new ImageResponse(
    <OgTemplate accent={accent} watermark={formatProjectNumber(project.order)}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: accent }}>{project.name}</div>
        <div style={{ display: "flex", fontSize: 28, color: ogColors.muted }}>{formatProjectMeta(project)}</div>
        <div style={{ display: "flex", fontSize: 22, color: ogColors.dim, maxWidth: 1040, lineHeight: 1.35 }}>
          {project.stack.join(" · ")}
        </div>
      </div>
    </OgTemplate>,
    { ...size, fonts: await getOgFonts() },
  );
}
