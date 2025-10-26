import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
    {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Para fotos de perfil de Google
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // Para imágenes de Firebase Storage
         pathname: '/babm-web.firebasestorage.app/**', // <-- Este es el path a tu bucket
     
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Para imágenes de placeholder
      },

    ],
  },

};

export default nextConfig;
