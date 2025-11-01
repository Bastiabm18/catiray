// app/[lang]/dashboard/page.tsx
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminInstances } from '@/lib/firebase/firebase-admin';
import DashboardLayout from './components/DashboardLayout';
import DashboardContent from './components/DashboardContent'; // Asegúrate de que este componente existe

interface DashboardPageProps {
  params: {
    lang: string;
  };
}

async function DashboardPage({ params }: DashboardPageProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('firebaseAuthSession')?.value;

  if (!sessionCookie) {
    redirect(`/login`);
  }

  let decodedToken;
  try {
    const { auth: adminAuth } = getAdminInstances();
    decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error('[Dashboard] Session verification failed:', error);
    redirect(`/login`);
  }

 
  const userRole = decodedToken.role || 'user';
  if (!['user', 'admin'].includes(userRole)) {
      console.warn(`[Dashboard] Unauthorized access attempt by role: ${userRole}`);
      redirect(`/`);
  }

  return (
    <DashboardLayout
      userEmail={decodedToken.email}
      userName={decodedToken.name}
      userRole={userRole}
      
    >
          {/* 3. Pasa el nuevo componente de contenido como hijo */}
      <DashboardContent
        userName={decodedToken.name} 
      
      />
    </DashboardLayout>
  );
}

export default DashboardPage;
