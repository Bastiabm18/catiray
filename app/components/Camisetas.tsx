"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Importamos la acción para obtener los datos
import { fetchPublicaciones, PublicacionItem } from './actions/actions';
// Importamos el ícono de Rayo (simulado con SVG) para consistencia visual
import { FaFootballBall } from 'react-icons/fa';
import router from 'next/router';
import { useRouter } from 'next/navigation';

// Componente individual de tarjeta de Camiseta
interface JerseyCardProps {
    item: PublicacionItem;
    delay: number;
}

const JerseyCard: React.FC<JerseyCardProps> = ({ item, delay }) => {
    return (
        <motion.div
            className="w-full bg-catiray-dark overflow-hidden relative group rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Imagen Principal */}
            <div className="relative h-96 w-full overflow-hidden">
                <img
                    src={item.imageURL}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/1A1A1A/ffffff?text=No+Image';
                    }}
                />
                {/* Capa de Oscuridad/Degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="absolute bottom-0 p-4 w-full text-white font-inter">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold uppercase text-red-400">{item.subtitle}</h3>
                    {/* Usamos el ícono de fútbol para la ubicación/fecha */}
                    <div className="flex items-center text-xs text-gray-300">
                        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7V8h4V4l5 6-5 6z" fill="#D32F2F"/>
                        </svg>
                        {item.ubicacion} - {item.fecha}
                    </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold font-bruno-ace-sc leading-tight">
                    {item.title}
                </h2>
                
                <p className="text-gray-400 mt-1 text-sm">
                    {item.descripcion}
                </p>
                
                {/* Botón de Acción */}
                <a href={`/camisetas?id=${item.id}`} 
                   className="mt-4 inline-flex items-center px-4 py-2 text-sm font-bold uppercase rounded-full transition-colors duration-300 text-white shadow-lg bg-catiray-red hover:bg-red-800"
                >
                    Ver Detalles
                </a>
            </div>
        </motion.div>
    );
};

// Componente Principal: Camisetas
const Camisetas: React.FC = () => {
    const [publicaciones, setPublicaciones] = useState<PublicacionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchPublicaciones();
                setPublicaciones(data);
            } catch (err: any) {
                setError(err.message || 'Error desconocido al cargar las camisetas.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-20 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="font-bruno-ace-sc">Cargando la colección de Camisetas...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-20 text-red-400 bg-catiray-dark p-8 rounded-lg">
                    <p className="text-xl font-bold">¡Error de Conexión!</p>
                    <p className="mt-2 text-sm">No se pudieron cargar los datos de Firebase. Detalles: {error}</p>
                </div>
            );
        }
        
        if (publicaciones.length === 0) {
            return (
                <div className="text-center py-20 text-gray-400 bg-catiray-dark p-8 rounded-lg">
                    <p className="text-xl font-bold">No hay Camisetas disponibles</p>
                    <p className="mt-2 text-sm">La colección 'publicacion' está vacía.</p>
                </div>
            );
        }

        // Renderiza el grid de camisetas
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publicaciones.map((item, index) => (
                    <JerseyCard key={item.id} item={item} delay={index * 0.1} />
                ))}
            </div>
        );
    };

    return (
        <section className="w-full py-16 bg-catiray-dark/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                    className="text-5xl font-extrabold text-white mb-10 border-b-4 pb-2 text-catiray-red font-bruno-ace-sc"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Colección Catiray
                </motion.h2>

                {renderContent()}
            </div>
        </section>
    );
};

export default Camisetas;