// app/components/LayoutManager.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Nav from './Nav';
import NavStick from './NavStick';

export default function LayoutManager({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showMainLayout = !pathname.includes('/dashboard');

  return (
    <div className="relative flex flex-col min-h-screen">
      {showMainLayout && <Nav />}
      <main className="flex-1 overflow-auto pb-24 md:pb-safe">
        {children}
      </main>
      {showMainLayout && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <NavStick />
        </div>
      )}
    </div>
  );
}