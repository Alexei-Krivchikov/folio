import type { MetadataRoute } from "next";
import { ogColors } from "@/components/og/og-template";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alexei Krivchikov — Frontend Developer",
    short_name: "Alexei Krivchikov",
    description: "Creative frontend developer — folio. Next.js, TypeScript, Motion.",
    background_color: ogColors.background,
    theme_color: ogColors.background,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
