import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tustareas.py"),
  title: "tustareas.py | Asesoría Académica en Paraguay",
  description: "Tutoría, desarrollo y corrección académica con diagnóstico gratuito y acompañamiento hasta la defensa.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "tustareas.py | Tu meta académica, bien acompañada",
    description: "Asesoría académica profesional en Paraguay.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "tustareas.py — Tu meta académica, bien acompañada" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${manrope.variable} ${playfair.variable}`}>{children}</body></html>;
}
