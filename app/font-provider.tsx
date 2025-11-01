// app/font-provider.tsx
'use client';

import { useEffect } from 'react';

export default function FontProvider() {
  useEffect(() => {
    // Fuerza a Next a cargar las variables CSS ANTES del render
    document.documentElement.classList.add(
      ...document.body.className.split(' ').filter(c => c.startsWith('__'))
    );
  }, []);
  return null;
}