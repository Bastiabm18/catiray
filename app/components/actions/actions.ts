// components/actions/actions.ts

"use server";
import { 
    collection, 
    getDocs, 
    query, 
    orderBy, 
    limit, 
    Firestore, 
    QuerySnapshot,
    FieldPath // Necesario para ordenar por el ID del documento
} from 'firebase/firestore';
import { getFirebaseFirestore } from '@/lib/firebase/firebaseConfig';
/**
 * Define la estructura de datos que esperamos de la colección 'publicacion'.
 */
export interface PublicacionItem {
  id: string;
  descripcion: string;
  fecha: string;
  imageURL: string;
  subtitle: string;
  title: string;
  ubicacion: string;
}

/**
 * Obtiene los 6 documentos más recientes de la colección 'publicacion', 
 * ordenados por el ID del documento (que incluye un timestamp).
 * @returns Una promesa que resuelve con un array de PublicacionItem.
 */
export async function fetchPublicaciones(): Promise<PublicacionItem[]> {
  try {
    const db: Firestore = getFirebaseFirestore();
    
    // 1. CREACIÓN DE LA QUERY CON LÍMITE Y ORDEN POR ID
    const publicacionRef = collection(db, 'publicacion');
    const q = query(
        publicacionRef,
        // CLAVE: Usamos doc.id para ordenar por el ID del documento.
        // Esto funciona porque los IDs de Firestore están basados en tiempo (timestamp).
        orderBy('id', 'desc'), 
        limit(6) // Limita a un máximo de 6 documentos
    );
    
    const snapshot: QuerySnapshot = await getDocs(q);
    
    if (snapshot.empty) {
        console.log("No se encontraron publicaciones en la colección 'publicacion'.");
        return [];
    }

    // Mapeamos los documentos a nuestro tipo de dato PublicacionItem.
    const data: PublicacionItem[] = snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: doc.id,
        descripcion: docData.descripcion || 'Sin descripción',
        fecha: docData.fecha || 'N/A',
        imageURL: docData.imageURL || 'https://placehold.co/400x600/1A1A1A/ffffff?text=No+Image',
        subtitle: docData.subtitle || 'Sin subtítulo',
        title: docData.title || 'Publicación',
        ubicacion: docData.ubicacion || 'Sin ubicación',
      } as PublicacionItem;
    });

    return data;

  } catch (error) {
    console.error("Error al obtener las publicaciones de Firebase:", error);
    throw new Error('No se pudieron cargar los datos de las publicaciones. Revisa la conexión a Firebase.');
  }
}