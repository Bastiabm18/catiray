// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutManager from "./components/layoutManager";

export const metadata = {
  title: "Catiray FC",
  description: "Sitio oficial del Catiray Football Club",
  icons: { icon: "/catiray_metal.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* CARGA TODAS LAS FUENTES CON GOOGLE FONTS (SIEMPRE FUNCIONA) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Alfa+Slab+One&family=Bangers&family=Bruno+Ace+SC&family=Caveat:wght@400..700&family=Goldman:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className="antialiased font-sans">
        <AuthProvider>
          <LayoutManager>{children}</LayoutManager>
        </AuthProvider>
      </body>
    </html>
  );
}