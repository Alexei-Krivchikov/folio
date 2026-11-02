import { ImageResponse } from "next/og";
import { OgTemplate, ogColors, ogImageContentType, ogImageSize } from "@/components/og/og-template";
import { getOgFonts } from "@/lib/og-fonts";

export const alt = "Alexei Krivchikov — Frontend Developer";
export const size = ogImageSize;
export const contentType = ogImageContentType;

const ACCENT = ogColors.accent;

export default async function Image() {
  const fonts = await getOgFonts();
  return new ImageResponse(
    <OgTemplate accent={ACCENT} watermark=">_">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: ACCENT }}>Frontend Developer</div>
        <div style={{ display: "flex", fontSize: 28, color: ogColors.muted, maxWidth: 900 }}>
          Creative frontend developer — folio. Next.js, TypeScript, Motion.
        </div>
      </div>
    </OgTemplate>,
    { ...size, fonts },
  );
}
