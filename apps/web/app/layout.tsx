import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = "Alexei Krivchikov — Frontend Developer";
const description = "Creative frontend developer — folio. Next.js, TypeScript, Motion.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Alexei Krivchikov",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
