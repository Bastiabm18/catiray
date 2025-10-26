"use client"
import React from "react";
// Se asume que Framer Motion ya está instalado si usas <motion.div>
import { motion } from "framer-motion";

// Array de sponsors (puedes reemplazar estas URLs y nombres)
const sponsors = [
  {
    src: "/babm_new_bg.png", // Reemplazar con tus rutas
    title: "babm.cl",
    alt: "babm",
  },
  {
    src: "/jaiselec.png", // Reemplazar con tus rutas
    title: "jaiselec",
    alt: "jaiselec",
  },
  {
    src: "/sponsor-verde.png", // Reemplazar con tus rutas
    title: "Energía Verde",
    alt: "Logo del patrocinador Verde",
  },
  {
    src: "/sponsor-gris.png", // Reemplazar con tus rutas
    title: "Finanzas Grises",
    alt: "Logo del patrocinador Gris",
  },
  {
    src: "/sponsor-oro.png", // Añadido un quinto para llenar el grid 2/6
    title: "Capital Oro",
    alt: "Logo del patrocinador Oro",
  },
  {
    src: "/sponsor-plata.png", // Añadido un sexto para llenar el grid 3/6
    title: "Comercio Plata",
    alt: "Logo del patrocinador Plata",
  },
];

// Definición de variantes para la animación de entrada de la lista
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // Pequeño retraso antes de que empiecen los hijos
      staggerChildren: 0.1, // Retraso entre la aparición de cada sponsor
    },
  },
};

// Definición de variantes para la animación de cada ítem
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Sponsors() {
  return (
    // Contenedor principal con padding lateral y fondo
    <div className="w-full h-[70vh] md:h-[50vh] py-12  bg-gray-600/30  text-white shadow-xl px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Título */}
        <h2 className="text-3xl font-bruno-ace-sc font-bold mb-10 text-center text-yellow-700 font-alfa">
          Partners
        </h2>
        
        {/* Contenedor Grid Animado */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20 items-center justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sponsors.map((sponsor, index) => (
            // Contenedor de cada logo con animación
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 h-full w-full"
              variants={itemVariants}
              // Efecto de hover: Escala un poco el logo y lo sube ligeramente
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
              // Efecto de click/tap: Le da un toque de hundimiento
              whileTap={{ scale: 0.95 }}
            >
              {/* Imagen del Sponsor */}
              {/* Nota: En un proyecto real de Next.js se recomienda usar el componente <Image> */}
              <img
                src={sponsor.src}
                alt={sponsor.alt}
                className="h-12 object-contain filter md:grayscale md:hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
                // Fallback para si la imagen no carga
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x48/374151/ffffff?text=Logo' }}
              />
              
              {/* Nombre del Sponsor */}
              <p className="mt-3 text-xs text-gray-400 text-center font-bruno-ace-sc">
                {sponsor.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
