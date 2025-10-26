'use client'; 

import React from 'react';
import { motion } from 'framer-motion';

// NOTA IMPORTANTE: Se mantienen las sustituciones de Next.js y React Icons 
// para evitar errores de compilación en este entorno.

// =================================================================
// 1. DATA FICTICIA Y TIPADO
// =================================================================
interface NewsItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    image: '/0W2A3530.jpg', 
    title: 'Termino de campaña para nuestra escuadra',
    subtitle: 'El equipo Sub-17 demuestra su potencial y lidera la tabla.',
    description:
      'En un partido épico, Catiray FC se impuso 3-1 a su eterno rival en un encuentro lleno de pasión y goles. La estrategia del entrenador dio frutos, destacando la actuación del debutante Felipe Rojas en el mediocampo. Este resultado afianza nuestra posición de liderazgo en el campeonato local. La celebración se extendió hasta altas horas...',
    link: '#',
  },
  {
    id: 2,
    image: '/0W2A3916.jpg',
    title: 'Nuevo Patrocinador: Impulso para la Próxima Temporada',
    subtitle: 'El club firma un acuerdo clave con una compañía tecnológica.',
    description:
      'Catiray FC anuncia con entusiasmo la incorporación de TechCorp como su nuevo patrocinador principal. Este acuerdo estratégico no solo inyecta capital fresco, sino que también promete innovaciones tecnológicas para el análisis de rendimiento de los jugadores. Se espera que la presentación oficial sea la próxima semana en el estadio.',
    link: '#',
  },
  {
    id: 3,
    image: '/0W2A4003.jpg',
    title: 'Entrenamiento Intensivo en la Pretemporada',
    subtitle: 'Preparación física y táctica de cara al torneo internacional.',
    description:
      'El plantel completo ha regresado a los entrenamientos bajo un régimen de doble sesión. El foco está puesto en la resistencia y la cohesión táctica. El cuerpo técnico ha implementado un nuevo método de acondicionamiento físico diseñado para maximizar el rendimiento en altura, buscando el mejor desempeño en los próximos desafíos.',
    link: '#',
  },
  {
    id: 4,
    image: '/0W2A4331.jpg',
    title: 'Inauguración de la Nueva Cancha de Entrenamiento',
    subtitle: 'Un espacio moderno para el desarrollo de talentos locales.',
    description:
      'Catiray FC se enorgullece en anunciar la apertura de su nueva cancha de entrenamiento, equipada con tecnología de punta y áreas especializadas para diferentes disciplinas. Este proyecto, financiado en parte por donaciones de la comunidad, busca fomentar el crecimiento de jóvenes talentos y ofrecer un entorno óptimo para el desarrollo deportivo.',
    link: '#',
  },
  {
    id: 5,
    image: '/0W2A3890.jpg', // Usamos la misma imagen temporalmente
    title: 'Entrevista Exclusiva con el Capitán',
    subtitle: 'Análisis de la temporada y planes futuros del equipo.',
    description:
      'Nuestro capitán compartió sus impresiones sobre la campaña recién finalizada, destacando el espíritu de lucha del equipo. Subrayó la importancia del apoyo de la afición y anticipó que la próxima temporada vendrá cargada de sorpresas y ambición por conseguir títulos importantes a nivel nacional.',
    link: '#',
  },
];

// =================================================================
// 2. COMPONENTE INDIVIDUAL DE NOTICIA (NewsCard)
// =================================================================

interface NewsCardProps {
  news: NewsItem;
  delay: number;
  // Propiedad para determinar el tamaño en pantallas grandes (PC)
  isLarge?: boolean; 
}

const NewsCard: React.FC<NewsCardProps> = ({ news, delay, isLarge = false }) => {
  // Lógica para acortar la descripción (máx 150 caracteres)
  const MAX_LENGTH = 150;
  const shortDescription =
    news.description.length > MAX_LENGTH
      ? news.description.substring(0, MAX_LENGTH)
      : news.description;

  const isLongDescription = news.description.length > MAX_LENGTH;

  // Clases CSS condicionales para el tamaño de la tarjeta y tipografía
  // Eliminamos las clases de altura lg:h-[...] para que el grid ocupe el 100% del espacio de su celda.
  const cardClasses = isLarge 
    ? "lg:min-h-[350px]" // Solo definimos altura mínima para evitar colapso
    : "lg:min-h-[200px]"; // Solo definimos altura mínima para evitar colapso

  const titleClasses = isLarge 
    ? "text-2xl lg:text-3xl"
    : "text-xl lg:text-xl";
  
  const subtitleClasses = isLarge 
    ? "text-base lg:text-lg"
    : "text-sm lg:text-base";
    
  const descriptionClasses = isLarge 
    ? "text-sm lg:text-base"
    : "text-xs lg:text-sm";
    
  // Altura de la imagen en móvil (la misma que antes)
  const imageSizeClasses = "h-[33.33vh] min-h-[250px]"; 
  
  return (
    <motion.div
      className={`w-full bg-black flex flex-col font-bruno-ace-sc snap-start relative transition-shadow duration-300 hover:shadow-2xl hover:shadow-red-800/50 ${cardClasses} lg:h-full`} // Añadimos lg:h-full para que llene la celda del grid
      // Efecto de entrada con Framer Motion (desde abajo y opacidad)
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <div className={`relative w-full overflow-hidden ${imageSizeClasses} lg:h-full`}>
        {/* Usamos <img> en lugar de <Image> de Next.js */}
        <img
          src={news.image}
          alt={news.title}
          // Clases de estilo para simular el comportamiento de 'fill' y 'objectFit: cover'
          className="absolute inset-0 w-full h-full object-cover"
          // Atributo onError para manejar la ausencia de la imagen
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null; 
            (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/1e293b/ffffff?text=Imagen+Faltante';
          }}
        />

        {/* Capa de degradado (overlay) para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Contenido del texto (desde la mitad de la imagen hacia abajo) */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          {/* Posicionado desde el 50% del alto */}
          <div className="pt-[50%]">
            <h2 className={`font-bold mb-1 text-red-400 drop-shadow-lg ${titleClasses}`}>{news.title}</h2>
            <h3 className={`font-semibold mb-2 drop-shadow-md ${subtitleClasses}`}>{news.subtitle}</h3>
            
            {/* Descripción y botón "Más" */}
            <div className="flex justify-between items-end">
              <p className={`font-light max-w-[85%] ${descriptionClasses}`}>
                {shortDescription}
                {isLongDescription && '...'}
              </p>
              
              {isLongDescription && (
                // Usamos <a> en lugar de <Link> de Next.js
                <a 
                  href={news.link} 
                  className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-500 bg-black/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 ml-2"
                  aria-label={`Leer más sobre ${news.title}`}
                >
                  {/* Ícono '+' estilizado con CSS en lugar de react-icons */}
                  <span className="text-lg leading-none pt-px">+</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Separador sutil solo en móvil */}
      <div className="lg:hidden h-px w-full bg-gray-700/50"></div>
    </motion.div>
  );
};


// =================================================================
// 3. COMPONENTE PRINCIPAL (Exportación por defecto)
// =================================================================
export default function News() {
  // Los dos primeros ítems son los grandes de la izquierda
  const largeItems = newsData.slice(0, 2); 
  // Los tres ítems restantes son los del grid a la derecha
  const smallGridItems = newsData.slice(2); 

  // Establecemos una altura explícita (lg:h-[85vh]) para que los grid internos puedan dividir el espacio proporcionalmente.
  return (
    <div className="w-full md:py-20 h-full  font-inter"> 
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:p-4 lg:h-[99vh]">
        
        {/* 1. CONTENEDOR IZQUIERDO: 2 NOTICIAS GRANDES 
            - Ahora usa Grid de 1 columna y 2 filas (lg:grid-rows-2) para una distribución 50/50 perfecta. 
            - El lg:h-full garantiza que use toda la altura del padre (85vh). */}
        <div className="lg:col-span-1 lg:grid lg:grid-rows-2 lg:gap-4 mb-4 lg:mb-0 lg:h-full">
          {largeItems.map((newsItem, index) => (
            <NewsCard 
              key={newsItem.id} 
              news={newsItem} 
              delay={index * 0.1}
              isLarge={true} 
            />
          ))}
        </div>
        
        {/* 2. CONTENEDOR DERECHO: 3 NOTICIAS PEQUEÑAS 
            - Mantiene el grid 2x2.
            - lg:h-full garantiza que use toda la altura del padre (85vh).
            - La distribución 50/50 (grid-rows-2) ahora es más equilibrada visualmente porque las tarjetas ya no tienen alturas auto-impuestas. */}
        <div className="lg:col-span-1 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:h-full">
          {smallGridItems.map((newsItem, index) => {
            // El tercer ítem (índice 2 en smallGridItems) ocupa las dos columnas inferiores
            const isFullRow = index === 2; 

            return (
              <div 
                key={newsItem.id} 
                // La última tarjeta sigue ocupando 2 columnas, y ahora su altura es exactamente el 50% de la columna derecha.
                className={`w-full ${isFullRow ? 'lg:col-span-2' : ''}`} 
              >
                <NewsCard 
                  news={newsItem} 
                  delay={(largeItems.length + index) * 0.1} // Asegura que el delay continúe
                  isLarge={false} 
                />
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
