'use client'; 

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from 'react-icons'; 
import { IoHomeOutline, IoNewspaperOutline, IoPeopleOutline, IoLogInOutline } from "react-icons/io5";

// =================================================================
// 1. TIPOS DE DATOS
// =================================================================
interface NavItem {
  href: string;
  icon: IconType; 
  label: string;
  type: 'icon' | 'logo';
}
// =================================================================


export default function BottomNavBar() {
  const [activeItem, setActiveItem] = useState('/'); 
  const [isOpen, setIsOpen] = useState(true);

  // 2. Definición de los ítems del menú (incluyendo el logo)
  const navItems: NavItem[] = [
    { href: '/', icon: IoHomeOutline, label: 'Home', type: 'icon' },
    { href: '/news', icon: IoNewspaperOutline, label: 'Noticias', type: 'icon' },
    { href: '/', icon: IoHomeOutline, label: 'Logo', type: 'logo' }, // El logo es el tercer elemento (columna 3)
    { href: '/team', icon: IoPeopleOutline, label: 'Equipo', type: 'icon' },
    { href: '/login', icon: IoLogInOutline, label: 'Login', type: 'icon' },
  ];

  // 3. Variantes de Framer Motion para la animación del contenedor
  const containerVariants: any = {
    visible: {
      width: '100%',
      height: '4rem', // h-16
      transition: {
        type: "tween",
        duration: 0.4,
        ease: 'easeInOut',
        delayChildren: 0.2, 
        staggerChildren: 0.1,
      },
    },
    closed: {
        width: '4rem', 
        height: '4rem', 
        transition: {
            type: "tween",
            duration: 0.3,
            ease: 'easeInOut',
            staggerChildren: 0.05, 
            staggerDirection: -1
        }
    }
  };

  // 4. Variantes de Framer Motion para los ítems que se OCULTAN/MUEVEN
  const itemVariants = {
    visible: { 
        opacity: 1, 
        scale: 1, // Escala normal
        pointerEvents: 'auto', 
    },
    closed: { 
        opacity: 0, 
        scale: 0, // Se encoge a CERO
        pointerEvents: 'none', 
    },
  };

  // 5. Renderizado del componente
  return (
    // Contenedor principal que centra el NAV en la parte inferior
    <div className="w-full p-4 bg-transparent fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        
        <motion.nav
            // CLAVE: Usamos grid-cols-5 para que cada ícono ocupe una columna
            className="grid grid-cols-5 items-center bg-red-600/40 backdrop-blur-sm shadow-xl rounded-full"
            variants={containerVariants}
            initial={false} 
            animate={isOpen ? "visible" : "closed"}
        >
            {navItems.map((item, index) => {
                
                // 6. LOGO CENTRAL (Botón de Toggle - SIEMPRE VISIBLE y FIJO)
                if (item.type === 'logo') {
                    return (
                        <div
                            key="club-logo"
                            // Este div ocupa la columna 3 del grid
                            className="flex flex-col items-center justify-center h-full z-20 col-start-3" 
                        >
                            <Link 
                                href={item.href}
                                // Toggles el estado Open/Closed
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    setIsOpen(!isOpen);
                                }}
                            >
                                {/* IMPORTANTE: La imagen del logo NO está usando 'itemVariants', 
                                    por lo que no se encoge al cerrarse. Solo usa whileTap. */}
                                <motion.div
                                    whileTap={{ scale: 0.85, rotate: 15 }}
                                    // CLAVE: Establecemos el tamaño fijo aquí para reforzar
                                    className="rounded-full bg-white border-4 border-red-600 p-1.5 shadow-2xl shadow-red-900/50 cursor-pointer w-[64px] h-[64px] flex items-center justify-center"
                                >
                                    <Image
                                        src="/catiray.png" // Ruta: /public/catiray.png
                                        alt="Logo del Club Catiray"
                                        width={48} 
                                        height={48}
                                        className="rounded-full "
                                        priority 
                                    />
                                </motion.div>
                            </Link>
                        </div>
                    );
                }

                // 7. ÍCONOS DE NAVEGACIÓN (Animados)
                const IconComponent = item.icon;
                const isActive = activeItem === item.href;
                
                return (
                    <motion.div
                        key={item.href}
                        variants={itemVariants} 
                        className="flex flex-col items-center justify-center"
                    >
                        <motion.div
                            whileTap={{ scale: 0.85 }} 
                            className="w-full flex justify-center" 
                        >
                            <Link
                                href={item.href}
                                onClick={() => setActiveItem(item.href)}
                                className={`
                                    flex items-center justify-center w-10 h-10 
                                    rounded-full transition-all duration-300 ease-in-out
                                    shadow-inner
                                    ${
                                        isActive 
                                            ? 'bg-red-700 text-white shadow-red-900' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                    }
                                `}
                            >
                                <IconComponent className="w-6 h-6" /> 
                            </Link>
                        </motion.div>
                    </motion.div>
                );
            })}
        </motion.nav>
    </div>
  );
}