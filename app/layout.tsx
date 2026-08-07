import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./site-url";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const playfair = Newsreader({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
export const viewport: Viewport = {
  themeColor: "#041b3b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "tustareas.py",
  title: {
    default: "tustareas.py | Asesoría académica online",
    template: "%s | tustareas.py",
  },
  description: "Tutoría, desarrollo y corrección académica online con diagnóstico gratuito, metodología, normas APA 7 y acompañamiento profesional hasta la defensa.",
  keywords: ["asesoría académica online", "tutoría académica", "asesoría de tesis", "corrección APA 7", "trabajos de investigación", "planes de negocio", "Paraguay"],
  authors: [{ name: "tustareas.py" }],
  creator: "tustareas.py",
  publisher: "tustareas.py",
  category: "education",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "tustareas.py | Tu meta académica, bien acompañada",
    description: "Tutoría, desarrollo y corrección académica con diagnóstico gratuito y seguimiento profesional hasta la defensa.",
    url: "/",
    siteName: "tustareas.py",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "tustareas.py — Tu meta académica, bien acompañada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "tustareas.py | Asesoría académica online",
    description: "Tutoría, desarrollo y corrección académica con acompañamiento hasta la defensa.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  appleWebApp: { capable: true, title: "tustareas.py", statusBarStyle: "default" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "tustareas.py",
  url: siteUrl,
  logo: `${siteUrl}/logo-tustareas.png`,
  image: `${siteUrl}/og.png`,
  description: "Asesoría académica online: tutoría, desarrollo y corrección de trabajos académicos con acompañamiento hasta la defensa.",
  email: "tustareas.py.edu@gmail.com",
  telephone: "+595993372593",
  areaServed: "Worldwide",
  sameAs: ["https://www.instagram.com/tustareas.py/"],
  knowsAbout: ["Tutoría académica", "Metodología de investigación", "Normas APA 7", "Corrección académica", "Tesis"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PY">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
