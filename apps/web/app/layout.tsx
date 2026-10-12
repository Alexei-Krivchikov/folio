import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-background font-sans text-foreground">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
