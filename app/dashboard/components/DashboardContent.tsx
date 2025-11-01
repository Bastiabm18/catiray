'use client';

import { ReactElement } from 'react';
import Link from 'next/link';
import { FaHome, FaComment, FaChartBar, FaQuestion, FaUserCircle } from 'react-icons/fa';
import { BsSignpostSplit } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiFillSetting } from 'react-icons/ai';
import { BsBackspace } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";

// Define la estructura de las traducciones para los items del menú
type MenuTranslations = {
  [key: string]: { name: string };
};



interface MenuItem {
  key: keyof MenuTranslations;
  path: string;
  icon: ReactElement;
  role: string[];
}

// Lista de items del menú para el rol 'user'
const userMenuItems: MenuItem[] = [
  { key: 'home', path: '/dashboard', icon: <FaHome />, role: ['user'] },
  { key: 'profile', path: '/dashboard/profile', icon: <FaUserCircle />, role: ['user'] },
  {key: 'services', path: '/dashboard/servicios', icon: <RiCustomerService2Fill />, role: ['user']},
  { key: 'posts', path: '/dashboard/publicacion', icon: <MdOutlinePostAdd />, role: ['user'] }, // Ejemplo de item solo para admin
  { key: 'reviews', path: '/dashboard/opiniones', icon: <FaComment />, role: ['user'] },
  { key: 'promos', path: '/dashboard/promos', icon: <FaChartBar />, role: ['user'] },
  { key: 'faq', path: '/dashboard/faq', icon: <FaQuestion />, role: ['user'] },
  { key: 'settings', path: '/dashboard/config', icon: <AiFillSetting/>, role: ['user'] },
  {key: 'quit', path: '/', icon: <BsBackspace />, role: ['user']}, // Ejemplo de item para salir
];

interface DashboardContentProps {
  userName?: string | null;
  
}

export default function DashboardContent({ userName }: DashboardContentProps) {
 

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Bienvenido a tu Panel, {userName || 'Usuario'}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userMenuItems.map((item) => (
          <Link key={item.key} href={`/${item.path}`} className="group">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer transform transition duration-200 hover:scale-105 hover:bg-primary-light/20 dark:hover:bg-primary-dark/30">
              <div className="text-3xl mb-3 text-primary-dark dark:text-primary-light">{item.icon}</div>
              <span className="text-md font-semibold text-center">{item.key}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
