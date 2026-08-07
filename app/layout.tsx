import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const playfair = Newsreader({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: "#041b3b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "tustareas.py | Asesoría Académica",
    template: "%s | tustareas.py",
  },
  description: "Tutoría, elaboración y corrección académica con diagnóstico gratuito y acompañamiento profesional hasta la defensa.",
  keywords: ["asesoría académica", "tutoría académica", "tesis", "corrección APA", "trabajos de investigación", "planes de negocio"],
  authors: [{ name: "tustareas.py" }],
  creator: "tustareas.py",
  publisher: "tustareas.py",
  category: "education",
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "tustareas.py | Tu meta académica, bien acompañada",
    description: "Tutoría, elaboración y corrección académica con diagnóstico gratuito y seguimiento hasta la defensa.",
    url: "/",
    siteName: "tustareas.py",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "tustareas.py — Tu meta académica, bien acompañada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "tustareas.py | Asesoría Académica",
    description: "Tu meta académica, bien acompañada.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${manrope.variable} ${playfair.variable}`}>{children}</body></html>;
}
