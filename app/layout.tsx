import type { Metadata } from "next";
// 1. Importaciones de fuentes de Geist
import { Geist, Geist_Mono } from "next/font/google";
// 2. Importaciones de fuentes adicionales
import { Alfa_Slab_One, Caveat, Bangers, Goldman, Bruno_Ace_SC } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

import Nav from "./components/Nav";
import NavStick from "./components/NavStick";
import LayoutManager from "./components/layoutManager";
import FontProvider from "./font-provider";

// --- Configuración de fuentes ---

// Fuentes Geist (Originales)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fuentes Adicionales
const alfaSlabOne = Alfa_Slab_One({
  weight: "400",
  variable: "--font-alfa-slab-one",
  subsets: ["latin"],
});

const brunoAceSc = Bruno_Ace_SC({
  weight: "400",
  variable: "--font-bruno-ace-sc",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const goldman = Goldman({
  weight: ["400", "700"],
  variable: "--font-goldman",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catiray FC",
  description: "Sitio oficial del Catiray Football Club",
  icons: {
    icon: "/catiray_metal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${alfaSlabOne.variable}
        ${brunoAceSc.variable}
        ${caveat.variable}
        ${bangers.variable}
        ${goldman.variable}
      `.trim()}
      style={{ fontSize: "16px" }}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <FontProvider />
        <AuthProvider>
          <LayoutManager>{children}</LayoutManager>
        </AuthProvider>
      </body>
    </html>
  );
}