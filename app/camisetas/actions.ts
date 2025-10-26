'use client';

import { 
    collection, 
    getDocs, 
    query, 
    orderBy, 
    limit, 
    Firestore, 
    QuerySnapshot,
    FieldPath,
    doc,
    getDoc
} from 'firebase/firestore';
// Reemplaza esto con tu ruta correcta al SDK cliente de Firebase
import { getFirebaseFirestore } from '@/lib/firebaseConfig';

/**
 * Define la estructura de datos para una publicación/camiseta.
 * He añadido 'imagenes' para replicar tu componente de ejemplo, aunque
 * inicialmente solo usabas 'imageURL'. Mapearemos 'imageURL' a una lista de 'imagenes' 
 * para que la galería del detalle funcione.
 */
export interface PublicacionItem {
  id: string;
  descripcion: string; // "FC Catiray"
  fecha: string; // "2025-2024-2020"
  imageURL: string; // URL principal
  subtitle: string; // "Honor 2025"
  title: string; // "Catiray 2025"
  ubicacion: string; // "santa juana"
  contenido?: string; // Campo opcional para contenido extra (como tu ejemplo)
  imagenes: { url: string; path: string }[]; // Lista de imágenes para la galería
}


const PUBLICACION_COLLECTION = 'publicacion';


/**
 * Obtiene todas las camisetas de la colección, ordenadas por ID descendente.
 */
export async function getAllCamisetas(): Promise<PublicacionItem[]> {
  try {
    const db: Firestore = getFirebaseFirestore();
    const publicacionRef = collection(db, PUBLICACION_COLLECTION);
    
    // Ordena por el ID del documento (más reciente primero)
    const q = query(
        publicacionRef,
        orderBy('id', 'desc')
    );
    
    const snapshot: QuerySnapshot = await getDocs(q);
    
    if (snapshot.empty) {
        return [];
    }

    const data: PublicacionItem[] = snapshot.docs.map(doc => {
      const docData = doc.data();
      const defaultImage = docData.imageURL || 'https://placehold.co/400x600/1A1A1A/ffffff?text=No+Image';

      return {
        id: doc.id,
        descripcion: docData.descripcion || 'Sin descripción',
        fecha: docData.fecha || 'N/A',
        imageURL: defaultImage,
        subtitle: docData.subtitle || 'Sin subtítulo',
        title: docData.title || 'Publicación',
        ubicacion: docData.ubicacion || 'Sin ubicación',
        contenido: docData.contenido || null,
        // Adaptación: Usamos imageURL como la primera y única imagen para la galería.
        imagenes: [
            { url: defaultImage, path: '' } 
        ]
      } as PublicacionItem;
    });

    return data;

  } catch (error) {
    console.error("Error al obtener todas las camisetas:", error);
    return [];
  }
}

/**
 * Obtiene una única camiseta por su ID.
 * @param id El ID del documento a buscar.
 * @returns El objeto PublicacionItem o null si no se encuentra.
 */
export async function getCamisetaById(id: string): Promise<PublicacionItem | null> {
    try {
      const db: Firestore = getFirebaseFirestore();
      const postDocRef = doc(db, PUBLICACION_COLLECTION, id);
      const postDoc = await getDoc(postDocRef);
  
      if (!postDoc.exists()) {
        console.log('No se encontró una camiseta con el ID:', id);
        return null;
      }
  
      const data = postDoc.data();
      const defaultImage = data.imageURL || 'https://placehold.co/400x600/1A1A1A/ffffff?text=No+Image';

      return {
          id: postDoc.id,
          descripcion: data.descripcion || '',
          fecha: data.fecha || 'N/A',
          imageURL: defaultImage,
          subtitle: data.subtitle || '',
          title: data.title || '',
          ubicacion: data.ubicacion || '',
          contenido: data.contenido || null,
          // Adaptación: Usamos imageURL como la primera y única imagen para la galería.
          imagenes: [
            { url: defaultImage, path: '' } 
          ]
      } as PublicacionItem;

    } catch (error) {
      console.error(`Error al obtener la camiseta con ID ${id}:`, error);
      return null;
    }
}
