import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexei Krivchikov — Frontend Developer",
  description: "Creative frontend developer — folio. Next.js, TypeScript, Motion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
