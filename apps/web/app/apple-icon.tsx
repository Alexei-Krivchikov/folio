import { ImageResponse } from "next/og";
import { ogColors } from "@/components/og/og-template";
import { getOgFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: ogColors.background,
        color: ogColors.foreground,
        fontSize: 96,
        fontWeight: 800,
        letterSpacing: -4,
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div style={{ display: "flex" }}>AK</div>
      <div style={{ display: "flex", width: 96, height: 10, marginTop: 4, background: ogColors.accent }} />
    </div>,
    { ...size, fonts: await getOgFonts() },
  );
}
