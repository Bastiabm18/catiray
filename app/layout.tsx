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
  weight: "400", // Alfa Slab One solo tiene peso 400
  variable: "--font-alfa-slab-one",
  subsets: ["latin"],
});

const brunoAceSc = Bruno_Ace_SC({
  weight: "400", // Bruno Ace SC solo tiene peso 400
  variable: "--font-bruno-ace-sc",
  subsets: ["latin"],
});


const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const bangers = Bangers({
  weight: "400", // Bangers solo tiene peso 400
  variable: "--font-bangers",
  subsets: ["latin"],
});

const goldman = Goldman({
  weight: ["400", "700"], // Goldman tiene pesos 400 y 700
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
  // Se concatenan todas las variables de fuente en el className del <body>
  return (
    <html lang="en" style={{ fontSize: '12px' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${brunoAceSc.variable} ${geistSans.variable} ${geistMono.variable} ${alfaSlabOne.variable} ${caveat.variable} ${bangers.variable} ${goldman.variable} antialiased`}
      >

        <AuthProvider>
          <LayoutManager>

          {children}
          </LayoutManager>
    
        </AuthProvider>
      </body>
    </html>
  );
}
