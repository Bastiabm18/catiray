'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Importación de Framer Motion
import Image from 'next/image';
// Nota: Se omite la importación de next/image para evitar errores de compilación.

/**
 * Componente de Navegación Superior Fija (Sticky Header)
 * Contiene el logo del club y se fija en la parte superior de la pantalla.
 */
export default function NavStick() {
  return (
    // Contenedor principal: fijo en la parte superior, ancho completo, alto de 16 (4rem)
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-catiray-red opacity-45 shadow-xl transition-all duration-300 ease-in-out"
      // Framer Motion: La cabecera se desliza hacia abajo desde -100px con una transición tipo 'spring'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <nav className="flex items-center justify-start h-16 px-4">
        
        {/* LOGO del club a la izquierda */}
        <a href="/" className="flex items-center transition-opacity hover:opacity-90">
          <Image
            src="/catiray_metal.png" // Ruta solicitada
            alt="Logo Catiray Club Deportivo"
            width={50} // Tamaño de 40px
            height={50}
            className="rounded-full  shadow-lg"
            // Atributo onError para manejar la ausencia de la imagen
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null; 
              (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/cc0000/ffffff?text=Logo';
            }}
          />
          {/* Título o nombre del club al lado del logo (Opcional, pero útil para accesibilidad) */}
          <span className="ml-3 text-xl font-bold text-white font-bruno-ace-sc tracking-wider ">
            CATIRAY F.C.
          </span>
        </a>
        
        {/* Aquí se podrían agregar más elementos de navegación o íconos */}
        <div className="flex-grow">
          {/* Espacio para futuros enlaces a la derecha */}
        </div>

      </nav>
    </motion.header>
  );
}
