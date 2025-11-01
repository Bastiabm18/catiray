// app/components/LayoutManager.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Nav from './Nav';
import NavStick from './NavStick';

interface LayoutManagerProps {
  children: ReactNode;
}

export default function LayoutManager({ children }: LayoutManagerProps) {
  const pathname = usePathname();

  // Esta es la lógica que se ejecutará en CADA cambio de ruta
  const showMainLayout = !pathname.includes('/dashboard');

  return (
    <>
      {/* Renderizado condicional basado en la ruta actual */}
      {showMainLayout && <Nav />}
      {showMainLayout && <NavStick />}
      
      <main>{children}</main>
      
    </>
  );
}