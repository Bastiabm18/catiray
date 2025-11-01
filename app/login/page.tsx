// src/app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Importa tus componentes personalizados
import NeonSign from '../components/NeonSign';
// Importa tus React Icons
import { FiMail, FiLock, FiLogIn, FiUserPlus, FiXCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc'; // Icono de Google para el botón
import { getFirebaseAuth, getFirebaseFirestore, GoogleAuthProvider, signInWithPopup } from '@/lib/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const {user,loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Lógica de animaciones para el formulario
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

   useEffect(() => {
    if (!loading && user) {
      router.push(`/dashboard`);
    }
  }, [user, loading, router]);

  // Función placeholder para manejar el login con email/password
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con Email:', email, 'Password:', password);
    // Aquí iría la lógica de Firebase Auth: signInWithEmailAndPassword
  };

  // Función placeholder para manejar el login con Google
  const handleGoogleLogin = async () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      if (loggedInUser) {
        const db = getFirebaseFirestore();
        const userDocRef = doc(db, "users", loggedInUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            uid: loggedInUser.uid,
            email: loggedInUser.email,
            displayName: loggedInUser.displayName,
            photoURL: loggedInUser.photoURL,
            role: 'user'
          });
        }
      }
    } catch (err: any) {
      console.error('Error en el inicio de sesión con Google:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('No se pudo iniciar sesión con Google.');
      }
    }
  };

  return (
    // CAMBIO 1: QUITÉ max-h-screen + overflow-y-hidden
    // CAMBIO 2: p-4 → p-4 md:p-8
    // CAMBIO 3: max-w-md → max-w-sm md:max-w-md
    <div className="min-h-screen font-bruno-ace-sc flex items-center justify-center bg-bg-main p-4 md:p-8 font-body">
      <motion.div
        // CAMBIO: p-8 → p-6 md:p-8
        className="bg-red-500/30 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-md border border-red-500/70 relative"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo de Neón Centrado */}
        <div className="flex justify-center -mt-20 mb-8">
          <NeonSign />
        </div>

        <h2 className="text-3xl text-center text-gray-300 mb-6">Iniciar Sesión</h2>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Campo de Correo */}
          <div>
            <label htmlFor="email" className="sr-only">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiMail className="h-5 w-5 text-gray-500" />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-5 w-5 text-gray-500" />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 text-gray-900 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-between space-x-4 pt-2">
            <motion.button
              type="submit"
              className="flex-1 flex items-center justify-center bg-brand-primary text-gray-100 py-2 px-4 bg-red-500 rounded-lg font-semibold hover:bg-brand-primary-dark transition duration-200 shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiLogIn className="mr-2" /> Ingresar
            </motion.button>
            <motion.button
              type="button"
              className="flex-1 flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition duration-200 shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => { setEmail(''); setPassword(''); }} // Simple reinicio
            >
              <FiXCircle className="mr-2" /> Cancelar
            </motion.button>
          </div>
        </form>

        {/* Sección de "No tienes cuenta?" y Google Login */}
        <div className="mt-8 text-center text-neutral-dark">
          <p className="mb-2 text-gray-300">
            ¿No tienes cuenta? <br></br> 
            <Link href="/signup" className="text-brand-secondary text-blue-500 hover:underline font-medium">
              Crea una aquí
            </Link>
          </p>
          <p className="my-4 text-gray-300 font-semibold">O</p> {/* Separador */}
          
          <motion.button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FcGoogle className="h-6 w-6 mr-3" /> Iniciar sesión con Google
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}