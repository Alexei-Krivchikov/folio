import { ImageResponse } from "next/og";
import { ogColors } from "@/components/og/og-template";
import { getOgFonts } from "@/lib/og-fonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
        fontSize: 19,
        fontWeight: 800,
        letterSpacing: -1,
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div style={{ display: "flex" }}>AK</div>
      <div style={{ display: "flex", width: 18, height: 3, marginTop: 1, background: ogColors.accent }} />
    </div>,
    { ...size, fonts: await getOgFonts() },
  );
}
