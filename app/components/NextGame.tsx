'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import { FaLocationPin, FaLocationPinLock } from 'react-icons/fa6';

// =================================================================
// 1. DATOS DEL PRÓXIMO PARTIDO
// =================================================================
const nextGameData = {
  // Nota: Usamos una imagen de placeholder, idealmente deberías pasarla por props o usar una URL específica.
  image: '/0W2A4003.jpg', 
  catirayLogo: '/catiray_metal.png', // Logo de Catiray FC
  opponentLogo: 'https://placehold.co/100x100/1e40af/ffffff?text=OPP', // Placeholder para oponente (azul/blanco)
  opponentName: 'Atlético City FC',
  category: 'Copa amistoso fc',
  date: 'Sábado 29 de Julio',
  time: '20:00 HRS',
  location: 'Estadio Santa juana city',
};

// =================================================================
// 2. COMPONENTE PRÓXIMO PARTIDO (NextGame)
// =================================================================

const NextGame: React.FC = () => {
    const game = nextGameData;

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="w-full h-[90vh] md:w-[60vw] md:h-[90vh]   relative overflow-hidden bg-gray-900 flex items-center justify-center font-inter">
            {/* Imagen de Fondo */}
            <img
                src={game.image}
                alt="Próximo Partido de Catiray FC"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null; 
                    (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/1e293b/ffffff?text=Fondo+Próximo+Partido';
                }}
            />

            {/* Capa de Oscuridad y Blur */}
            <div className="absolute inset-0 bg-gray-600/10 backdrop-blur-xs"></div>

            {/* Contenido Centrado (Efecto de Entrada con Framer Motion) */}
            <motion.div
                className="relative z-10 text-white flex flex-col items-center justify-between p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-15 uppercase tracking-wider text-red-500 font-bruno-ace-sc">
                    Próximo Partido
                </h1>

                {/* Marcador VS */}
                <div className="flex items-center space-x-6 md:space-x-12 mb-8">
                    {/* Catiray FC */}
                    <div className="flex flex-col items-center">
                        {/* Logo Catiray */}
                        <img 
                            src={game.catirayLogo} 
                            alt="Catiray FC Logo"
                            className="w-20 h-20 md:w-32 md:h-32 object-contain filter drop-shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).onerror = null; 
                                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/dc2626/ffffff?text=FC';
                            }}
                        />
                        <span className="mt-2 text-lg md:text-xl font-semibold uppercase font-bruno-ace-sc">
                            Catiray FC
                        </span>
                    </div>

                    <span className="text-5xl md:text-7xl font-black text-white/80 font-bruno-ace-sc">
                        VS
                    </span>

                    {/* Oponente */}
                    <div className="flex flex-col items-center">
                        {/* Oponente Logo (Usamos la imagen de placeholder) */}
                        <img 
                            src={game.opponentLogo} 
                            alt="Opponent Logo"
                            className="w-20 h-20 md:w-32 md:h-32 object-contain filter drop-shadow-lg"
                        />
                        <span className="mt-2 text-lg md:text-xl font-semibold uppercase font-bruno-ace-sc">
                            {game.opponentName}
                        </span>
                    </div>
                </div>

                {/* Detalles del Partido */}
                <div className="bg-black/50 p-6 md:p-8 font-bruno-ace-sc rounded-xl border-t-4 border-red-500 shadow-xl w-full max-w-md md:max-w-xl">
                    <p className="text-sm md:text-base text-red-400 mb-2 font-light">
                        {game.category}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-left">
                            <span className="text-4xl md:text-5xl font-extrabold mr-3 font-bruno-ace-sc">
                                {game.date}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl md:text-3xl font-bold font-bruno-ace-sc text-red-500">
                                {game.time}
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-center gap-2 font-sans flex-row mt-4 items-center justify-center flex border-t border-gray-700 pt-3">
                        <FaLocationPinLock/>
                        <p className="text-sm md:text-lg font-medium text-gray-300">
                             {game.location}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
        </div>
    );
};

export default NextGame;
