import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://ivonnewebsite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ivonne Wijaya · Portfolio",
  description:
    "Ivonne Wijaya, a Year-2 Computer Science student at NTU building thoughtful full-stack web, mobile, and AI-powered products.",
  keywords: [
    "Ivonne Wijaya",
    "Computer Science",
    "NTU",
    "software engineer",
    "portfolio",
    "full-stack",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Ivonne Wijaya" }],
  openGraph: {
    title: "Ivonne Wijaya · Portfolio",
    description:
      "Year-2 Computer Science student at NTU building thoughtful full-stack web, mobile, and AI-powered products.",
    url: SITE_URL,
    siteName: "Ivonne Wijaya",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ivonne Wijaya, building software that solves real problems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivonne Wijaya · Portfolio",
    description:
      "Year-2 Computer Science student at NTU building thoughtful full-stack web, mobile, and AI-powered products.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF6F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
