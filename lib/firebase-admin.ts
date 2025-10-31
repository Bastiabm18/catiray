// lib/firebase/firebase-admin.ts

// ✅ CORRECCIÓN CLAVE: Usamos require() para evitar conflictos de bundling en Vercel.
// Esto garantiza que el Admin SDK se cargue correctamente en el entorno de Node.js (Servidor/Serverless).
const admin = require('firebase-admin');

// Definimos los tipos solo para mantener la seguridad de TypeScript
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let instances: { auth: Auth; firestore: Firestore } | null = null;

/**
 * Inicializa y retorna las instancias de Firebase Admin SDK (Auth y Firestore).
 * Es fundamental que este código SOLO se ejecute en el lado del SERVIDOR.
 * @returns Las instancias de Admin Auth y Admin Firestore.
 */
export function getAdminInstances(): { auth: Auth; firestore: Firestore } {
    if (instances) {
        return instances;
    }

    // Usamos admin.apps (equivalente a getApps)
    if (admin.apps.length === 0) {
        // Obtenemos la clave JSON del service account
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
            ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
            : null;

        if (serviceAccount) {
            admin.initializeApp({
                // Usamos admin.credential.cert (equivalente a cert)
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            // Inicialización sin credenciales explícitas (útil si está en Google Cloud, pero mejor no confiar)
            admin.initializeApp();
        }
    }

    // Obtenemos las instancias de Auth y Firestore
    instances = {
        // Casteamos los resultados para que TypeScript sepa qué tipos son
        auth: admin.auth() as Auth,
        firestore: admin.firestore() as Firestore
    };

    return instances;
}
