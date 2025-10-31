// lib/firebaseConfig.ts

// Usamos solo las funciones del módulo principal que son seguras en Node.js
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

// NO importamos los servicios directamente aquí.
// Simplemente declaramos los tipos para que TypeScript los reconozca.
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

// Nota: No usamos 'let instances' en el scope global, usamos 'globalThis'
// para asegurarnos de que el patrón Singleton funcione correctamente 
// a través de la reconstrucción de Next.js.
declare global {
  var firebaseInstances: {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
    storage: FirebaseStorage;
  } | undefined;
}

// Inicializamos el objeto global si no existe
globalThis.firebaseInstances = globalThis.firebaseInstances || undefined;

/**
 * Función central para obtener o inicializar las instancias de Firebase Client.
 * * ATENCIÓN: Esta función utiliza IMPORTACIÓN DINÁMICA de los módulos
 * 'firebase/auth', 'firebase/firestore', y 'firebase/storage' DENTRO de la función.
 * * Esto asegura que Next.js no intente cargar el código específico del navegador 
 * (como las dependencias de 'firebase/storage') durante el proceso de compilación
 * en el entorno de Node.js, resolviendo el error de "module-not-found".
 */
export async function getFirebaseClientInstances() {
  // 1. Si ya creamos las instancias, las devolvemos inmediatamente.
  if (globalThis.firebaseInstances) {
    return globalThis.firebaseInstances;
  }

  // 2. Leemos las variables de entorno.
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // 3. Verificamos que la clave de API exista.
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API Key del cliente no encontrada. Revisa tus variables de entorno.");
  }

  // 4. Inicializamos o recuperamos una instancia existente.
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  // 5. ¡IMPORTACIÓN DINÁMICA!
  // Importamos los módulos DENTRO de la función y de forma dinámica (await import).
  // Esto le dice a Next.js que solo cargue estos módulos durante el runtime (ya sea en el cliente o el servidor,
  // pero solo cuando se llama la función, evitando el error de compilación).
  const { getAuth } = await import('firebase/auth');
  const { getFirestore } = await import('firebase/firestore');
  const { getStorage } = await import('firebase/storage');
  
  // 6. Creamos y guardamos las instancias de los servicios en caché.
  globalThis.firebaseInstances = {
    app,
    auth: getAuth(app) as Auth,
    db: getFirestore(app) as Firestore,
    storage: getStorage(app) as FirebaseStorage,
  };

  return globalThis.firebaseInstances;
}

// Funciones 'get' individuales (ahora asíncronas)
export const getFirebaseAuth = async () => (await getFirebaseClientInstances()).auth;
export const getFirebaseFirestore = async () => (await getFirebaseClientInstances()).db;
export const getFirebaseStorage = async () => (await getFirebaseClientInstances()).storage;

// ----------------------------------------------------------------------------------
// Re-exportaciones de MÉTODOS
// Se recomienda IMPORTAR y RE-EXPORTAR los métodos en un ARCHIVO SEPARADO 
// O directamente donde se usen (como las Server Actions) para evitar problemas de build.

// Si se usan en el cliente, deben estar en un archivo con 'use client'.
// Si se usan en el servidor/Server Actions, deben estar en un archivo con 'use server'.
// Dado que el error sugiere que las Server Actions están fallando, 
// es mejor IMPORTAR estos métodos DIRECTAMENTE en cada Server Action, 
// o en un archivo con 'use client' si son solo para el cliente.

// Por ahora, para evitar el error de compilación, DEJAMOS DE RE-EXPORTARLOS AQUÍ.
/* export { 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'; 
*/

// Si necesitas estos métodos, impórtalos directamente en el archivo donde los vayas a usar, 
// por ejemplo:
//
// // En tu Server Action (ej. app/camisetas/actions.ts):
// 'use server';
// import { getFirebaseFirestore } from '@/lib/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore/lite'; // Usar 'lite' para Server
