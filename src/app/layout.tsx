import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Unbounded, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ASTRALIS — Le projecteur galaxie qui transforme ton plafond",
  description:
    "ASTRALIS ONE projette une nébuleuse 4K immersive sur ton plafond en 3 secondes. 21 scènes cosmiques, enceinte Bluetooth, minuteur. Livraison suivie offerte, paiement à la livraison.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body className="bg-void text-ink font-sans antialiased grain">{children}</body>
    </html>
  );
}
