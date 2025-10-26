'use client'; 

import { motion } from 'framer-motion';
import Image from 'next/image';

const NeonSign = () => {
  // Definimos las variaciones de opacidad para el parpadeo
  const blinkOpacity = [1, 0.1, 0.95, 0.25, 1, 0.9, 1, 0.8, 1,1,0.9,0.99, 1, 0.9, 1, 0.8, 1,1,0.9,0.99,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 

  // Ajusta el tamaño deseado para el escudo
  const imageSize = 150; 

  return (
    <div className="relative inline-block"> {/* Contenedor para posicionar */}
      {/* --- Capa de Resplandor (Imagen Borrosa Detrás) --- */}
      <motion.div
        className="absolute inset-0" // Cubre la misma área que la imagen principal
        style={{
          filter: 'blur(10px) brightness(1.5) drop-shadow(0 0 10px #FF3333)', // Desenfoca y aplica un filtro de color rojo
          zIndex: 0, // Asegura que esté detrás de la imagen principal
        }}
        animate={{ opacity: blinkOpacity }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/catiray_metal.png" // MISMA IMAGEN del escudo
          alt="Neon Glow Effect"
          width={imageSize}
          height={imageSize}
          className="w-full h-full object-contain" // Para que ocupe todo el espacio del contenedor
          aria-hidden="true" // Oculta del árbol de accesibilidad
        />
      </motion.div>

      {/* --- Capa de la Imagen Principal (Frente) --- */}
      <motion.div
        className="relative z-10 " // Asegura que esté por encima del resplandor
        animate={{ opacity: blinkOpacity }} // También parpadea ligeramente
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/catiray_metal.png" // La imagen original del escudo
          alt="Catiray Logo"
          width={imageSize}
          height={imageSize}
          className=' animate-pulse'
          priority 
        />
      </motion.div>
    </div>
  );
};

export default NeonSign;