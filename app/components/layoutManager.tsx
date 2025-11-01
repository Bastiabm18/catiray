// app/components/LayoutManager.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Nav from './Nav';
import NavStick from './NavStick';

export default function LayoutManager({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showMainLayout = !pathname.includes('/dashboard') && pathname !== '/login' && pathname !== '/signup';

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* HEADER */}
      {showMainLayout && <Nav />}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto pb-20 md:pb-safe">
        {children}
      </main>

      {/* NAVBAR FIJO ABAJO */}
      {showMainLayout && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <NavStick />
        </div>
      )}
    </div>
  );
}