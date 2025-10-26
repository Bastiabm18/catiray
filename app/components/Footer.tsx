import React from 'react';
// Iconos de react-icons, asumiendo que el paquete está instalado.
// Se usa Fa6 para versiones más recientes de Font Awesome.
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import NeonSign from './NeonSign';

// Definición de enlaces sociales
const socialLinks = [
  { href: '#', Icon: FaFacebookF, alt: 'Facebook' },
  { href: '#', Icon: FaInstagram, alt: 'Instagram' },
  { href: '#', Icon: FaXTwitter, alt: 'Twitter (X)' },
  { href: '#', Icon: FaTiktok, alt: 'TikTok' },
  { href: '#', Icon: MdEmail, alt: 'Email' },
];

// Definición de enlaces de utilidad
const utilityLinks = [
  { href: '#', name: 'Terminos de uso' },
  { href: '#', name: 'Accessibilidad' },
  { href: '#', name: 'Contactanos' },
];

export default function Footer() {
  return (
    <footer className="w-full h-[80vh] bg-black text-gray-400 flex flex-col justify-evenly pt-8 pb-4">
      {/* Contenedor principal de contenido (Iconos y Enlaces) */}
      <div className=" flex flex-col items-center justify-center space-y-6 px-4">
        
        {/* Fila de Iconos Sociales */}
        <div className="flex space-x-6">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              // Estilo de botón para icono con efecto hover
              className="p-3 rounded-full bg-gray-700 hover:bg-red-600 transition duration-300 transform hover:scale-110"
              aria-label={link.alt}
            >
              <link.Icon className="w-5 h-5 text-white" />
            </a>
          ))}
        </div>

        {/* Separador central (simple) */}
        <div className="w-full max-w-lg border-t border-b border-red-800/50 my-6"></div>

        {/* Enlaces Directos */}
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-sm font-medium">
          {utilityLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

            <div className=' w-full items-center p-0  justify-center flex  '>
                <NeonSign   /> 
            </div>


      {/* Derechos de Autor */}
      <div className="  text-center text-xs text-gray-500 border-t border-gray-800 pt-3">
        © Catiray FC 2025. All rights reserved.
      </div>
    </footer>
  );
}
