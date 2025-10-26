'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaSpinner, FaSearch, FaDownload } from 'react-icons/fa';
import { getAllCamisetas, getCamisetaById, PublicacionItem } from "./actions"; // Importamos las nuevas acciones


// ===================================================================
// Componente para la VISTA DE DETALLE de una sola camiseta
// ===================================================================
function CamisetaDetailView({ item }: { item: PublicacionItem }) {
  const router = useRouter();
  // Establecemos la imagen principal a la primera de la lista (o null si no hay)
  const [mainImage, setMainImage] = useState(item.imagenes.length > 0 ? item.imagenes[0] : null);

  // Efecto para asegurar que si el item cambia, la imagen principal se actualice
  useEffect(() => {
      setMainImage(item.imagenes.length > 0 ? item.imagenes[0] : null);
  }, [item]);

  // Si no hay item, no renderizar nada (manejaría un error, pero el componente principal ya lo filtra)
  if (!item) return null; 
    
  // La función handleDownload fue omitida por solicitud.
  const handleDownload = () => {
    if (mainImage?.url) {
        // En un entorno de Next.js, esta descarga funciona en el navegador
        const link = document.createElement('a');
        link.href = mainImage.url;
        link.download = `${item.title.replace(/\s/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="pt-4 pb-16"
    >
      <motion.button 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push(`/camisetas`)} // Vuelve a la grilla principal
        className="flex items-center gap-2 mb-8 text-catiray-red font-bold hover:text-red-700 transition"
      >
        <FaArrowLeft /> Volver a Uniformes
      </motion.button>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl">
        {/* Columna Izquierda: Detalles */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 flex flex-col pt-4"
        >
          <p className="text-md font-semibold text-gray-500 dark:text-gray-400 uppercase">{item.ubicacion} | {item.fecha}</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mt-2 font-bruno-ace-sc">{item.title}</h1>
          <p className="mt-2 text-2xl font-bold text-catiray-red dark:text-red-400">{item.subtitle}</p>
          
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Descripción:</h2>
          <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
            {item.descripcion}
          </div>
        </motion.div>

        {/* Columna Derecha: Galería */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-3"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImage ? mainImage.url : 'no-image'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="relative w-full aspect-[4/3] rounded-lg shadow-2xl overflow-hidden mb-4 bg-black"
            >
              {mainImage ? (
                <>
                <Image 
                    src={mainImage.url} 
                    alt={item.title} 
                    fill 
                    className="object-contain" 
                    priority 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button 
                  onClick={handleDownload}
                  title="DESCARGAR IMAGEN"
                  className="absolute top-4 right-4 z-10 p-3 bg-gray-900 bg-opacity-50 text-white font-semibold rounded-full animate-pulse hover:bg-gray-900/90 transition shadow-lg"
                >
                  <FaDownload />
                </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">No hay imágenes disponibles</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Miniaturas de la Galería */}
          {item.imagenes.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {item.imagenes.map((img) => (
                <button key={img.url} onClick={() => setMainImage(img)}
                  className={`relative aspect-square rounded-md overflow-hidden transition-all duration-300 ${mainImage?.url === img.url ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-catiray-red' : 'opacity-70 hover:opacity-100'}`}
                >
                  <Image src={img.url} alt={`Miniatura de ${item.title}`} fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Contenido Extra (Iframe o HTML) */}
      <div className='w-full flex items-center justify-center p-10'>
          {item.contenido ? (
            <div className="mt-8 prose dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: item.contenido }}
              />
            </div>
          ) : (<></>)}
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push(`/camisetas`)} 
        className="flex text-right items-center justify-end w-full gap-2 mt-8 text-catiray-red font-bold hover:text-red-700 transition"
      >
        <FaArrowLeft /> Volver a la Grilla
      </motion.button>
    </motion.div>
  );
}

// ===================================================================
// Componente para la VISTA DE GRILLA con todos los posts y filtro
// ===================================================================
function CamisetasGridView({ allCamisetas }: { allCamisetas: PublicacionItem[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filtra por título de la camiseta
    const filteredCamisetas = allCamisetas.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Componente de tarjeta simple para la grilla
    const GridCard: React.FC<{item: PublicacionItem}> = ({ item }) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(`/camisetas?id=${item.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-2xl"
        >
            <div className="relative w-full h-56">
                {item.imageURL ? (
                    <Image 
                        src={item.imageURL} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">Sin Imagen</div>
                )}
                <span className="absolute top-2 right-2 bg-catiray-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">{item.fecha.split('-')[0]}</span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-bruno-ace-sc">{item.title}</h3>
                <p className="text-catiray-red dark:text-red-400 mt-1">{item.subtitle}</p>
            </div>
        </motion.div>
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 pb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-white font-bruno-ace-sc">Catálogo de Uniformes</h1>
        <p className="text-lg text-center text-gray-700 dark:text-gray-400 max-w-3xl mx-auto mb-12">Explora nuestra colección de camisetas históricas y recientes del Catiray F.C.</p>
        
        {/* Barra de Búsqueda */}
        <div className="relative mb-12 max-w-lg mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título (ej: Catiray 2025)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-catiray-red dark:focus:border-catiray-red focus:ring-0 rounded-lg py-3 pl-12 pr-4 transition shadow-inner"
          />
        </div>

        {/* Grilla de Camisetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCamisetas.map(item => (
              <GridCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredCamisetas.length === 0 && (
            <p className="text-center text-gray-500 mt-12">No se encontraron uniformes con ese título.</p>
        )}
      </motion.div>
    );
}

// ===================================================================
// Componente Principal que decide qué vista mostrar
// ===================================================================
function CamisetasPageContent() {
  const searchParams = useSearchParams();
  const camisetaId = searchParams.get('id');

  const [item, setItem] = useState<PublicacionItem | null>(null);
  const [allCamisetas, setAllCamisetas] = useState<PublicacionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();


  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(false);
      try {
        if (camisetaId) {
          // Si hay ID, carga solo ese item
          const fetchedItem = await getCamisetaById(camisetaId);
          if (fetchedItem) {
            setItem(fetchedItem);
          } else {
            setError(true); // El item con ese ID no fue encontrado
          }
        } else {
          // Si no hay ID, carga todos los items para la grilla
          setItem(null); // Asegura que no se muestre el detalle anterior
          const fetchedAllItems = await getAllCamisetas();
          setAllCamisetas(fetchedAllItems);
        }
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [camisetaId]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <FaSpinner className="text-4xl animate-spin text-catiray-red" />
        <p className="ml-4 text-catiray-red dark:text-red-400 text-lg font-bruno-ace-sc">Cargando...</p>
      </div>
    );
  }

  if (error) {
      return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center b bg-black p-8">
        <p className="text-xl text-gray-700 dark:text-gray-300">Uniformes no encontrado o ID inválido.</p>
        <button 
            onClick={() => router.push(`/camisetas`)} 
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-catiray-red text-white rounded-md hover:bg-red-700 transition shadow-md"
        >
          <FaArrowLeft /> Volver al Catálogo
        </button>
      </div>
    );
  }

  // Decide qué vista renderizar
  return (
    <main className="w-full min-h-screen  bg-black text-gray-900 dark:text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl py-10 mx-auto">
        <AnimatePresence mode="wait">
          {camisetaId && item ? (
            <motion.div key="detail">
              <CamisetaDetailView item={item} />
            </motion.div>
          ) : (
            <motion.div key="grid">
              <CamisetasGridView allCamisetas={allCamisetas} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}


// Usamos Suspense para que useSearchParams funcione correctamente en Next.js
export default function page() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center bg-black">
                <FaSpinner className="text-4xl animate-spin text-catiray-red" />
            </div>
        }>
            <CamisetasPageContent />
        </Suspense>
    )
}
