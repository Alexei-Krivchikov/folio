import type { ReactNode } from "react";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function OgTemplate({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#fafafa",
        padding: 80,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Alexei Krivchikov</div>
      {children}
    </div>
  );
}
