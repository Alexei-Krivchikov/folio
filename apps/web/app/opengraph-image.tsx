import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "@/components/og/og-template";

export const alt = "Alexei Krivchikov — Frontend Developer";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    <OgTemplate>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>Frontend Developer</div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", maxWidth: 900 }}>
          Creative frontend developer — folio. Next.js, TypeScript, Motion.
        </div>
      </div>
    </OgTemplate>,
    { ...size },
  );
}
