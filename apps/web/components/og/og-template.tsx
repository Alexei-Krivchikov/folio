import type { ReactNode } from "react";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const GRID_LINE = "rgba(255,255,255,0.05)";

type OgTemplateProps = {
  children: ReactNode;
  accent: string;
  watermark?: string;
};

export function OgTemplate({ children, accent, watermark }: OgTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background: "#09090b",
        backgroundImage: `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        color: "#fafafa",
        padding: 80,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -220,
          width: 640,
          height: 640,
          display: "flex",
          borderRadius: 9999,
          background: `radial-gradient(circle, ${accent}33 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      {watermark ? (
        <div
          style={{
            position: "absolute",
            bottom: -76,
            right: 48,
            display: "flex",
            fontSize: 300,
            fontWeight: 800,
            letterSpacing: -8,
            color: "rgba(255,255,255,0.045)",
          }}
        >
          {watermark}
        </div>
      ) : null}

      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Alexei Krivchikov</div>
      {children}
    </div>
  );
}
