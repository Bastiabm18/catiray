'use client'; 

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NeonSign from './NeonSign';

// Componente diseñado para replicar el banner de suscripción de la imagen de referencia.
const Suscribe: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Manejador del envío (simulado)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulación de una llamada a API
        setTimeout(() => {
            if (email.includes('@')) {
                setStatus('success');
                console.log(`Email '${email}' suscrito.`);
            } else {
                setStatus('error');
            }
        }, 1500);
    };
    
    // Ruta del logo de Catiray
    const logoSrc = '/catiray_metal.png';

    // Clases CSS condicionales para el botón
    const buttonClasses = 
        status === 'submitting'
        ? "bg-red-900 cursor-not-allowed"
        : "bg-red-900 hover:bg-red-800 transition-colors";

    return (
        // Contenedor principal: Fondo rojo oscuro con alturas responsivas
        <div className="w-full h-[50vh] lg:h-[75vh] relative bg-catiray-red flex flex-col items-center justify-center p-4 md:p-8 font-inter">
            
            {/* Logo del equipo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <NeonSign />
            </motion.div>

            {/* Título Principal */}
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-widest text-white font-bruno-ace-sc mb-2">
                ¡Únete a nuestra lista de correo!
            </h2>

            {/* Subtítulo / Descripción */}
            <p className="text-sm md:text-lg font-light text-gray-200 max-w-xl text-center mb-8">
                Recibe las últimas noticias, ofertas exclusivas y mucho más directamente en tu bandeja de entrada.
            </p>

            {/* Formulario de Suscripción */}
            <motion.form 
                className="w-full max-w-sm md:max-w-lg flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Campo de Email */}
<div className='borde-2 border-black flex w-full flex-row bg-black p-2 rounded-b-lg'>
                    <input
                    type="email"
                    placeholder="Correo Electrónico"
                    className=" w-2/3 p-4 rounded-lg text-white bg-black placeholder:bg-black  focus:outline-none transition-shadow duration-200 text-lg"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setStatus('idle');
                    }}
                    required
                    disabled={status === 'submitting'}
                />
                
                {/* Botón de Enviar */}
                <button
                    type="submit"
                    className={` w-auto flex items-center justify-center p-4 rounded-lg text-white font-bold uppercase shadow-lg ${buttonClasses}`}
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? (
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <>
                            {/* Icono de Correo (simulado con SVG) */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"></path></svg>
                            Suscribir
                        </>
                    )}
                </button>
</div>
            </motion.form>

            {/* Mensajes de estado */}
            {status === 'success' && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-green-300 font-semibold"
                >
                    ¡Gracias por suscribirte!
                </motion.p>
            )}
            {status === 'error' && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-yellow-300 font-semibold"
                >
                    Por favor, ingresa un correo válido.
                </motion.p>
            )}

        </div>
    );
};

export default Suscribe;
