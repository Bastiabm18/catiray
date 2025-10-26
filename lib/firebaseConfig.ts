import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Re-exportamos directamente desde los paquetes de Firebase para evitar problemas de build.
// Esto permite importar directamente los métodos sin inicializar el cliente antes.
export { 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

// Guardaremos las instancias aquí para implementar el patrón Singleton.
let instances: {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
} | null = null;

/**
 * Función central para obtener o inicializar las instancias de Firebase Client.
 * La lógica de comprobación de variables y la inicialización se realiza aquí 
 * para garantizar la carga perezosa (lazy-loading).
 */
export function getFirebaseClientInstances() {
  // 1. Si ya creamos las instancias, las devolvemos inmediatamente.
  if (instances) {
    return instances;
  }

  // 2. Leemos las variables de entorno dentro de la función.
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
  // Si falta, el error solo se lanzará cuando se llame a esta función en runtime.
  if (!firebaseConfig.apiKey) {
      throw new Error("Firebase API Key del cliente no encontrada. Revisa tus variables de entorno.");
  }

  // 4. Inicializamos o recuperamos una instancia existente.
  // Esto previene el error "Firebase: Firebase App named '[DEFAULT]' already exists" (app/duplicate-app).
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  // 5. Creamos y guardamos las instancias de los servicios en caché.
  instances = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };

  return instances;
}

// Para simplificar, también exportamos las funciones get individuales
export const getFirebaseAuth = () => getFirebaseClientInstances().auth;
export const getFirebaseFirestore = () => getFirebaseClientInstances().db;
export const getFirebaseStorage = () => getFirebaseClientInstances().storage;
