// src/app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NeonSign from '../components/NeonSign';
import { FiMail, FiLock, FiLogIn, FiXCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { getFirebaseAuth, GoogleAuthProvider, signInWithPopup } from '@/lib/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseFirestore } from '@/lib/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Animaciones
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // Redirige si ya está logueado
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Login con email (placeholder)
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con Email:', email, 'Password:', password);
    // Aquí va tu lógica real de Firebase
  };

  // Login con Google
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
      console.error('Error en Google:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('No se pudo iniciar sesión con Google.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main p-4 md:p-8">
      <motion.div
        className="bg-red-500/30 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-md border border-red-500/70"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Neón */}
        <div className="flex justify-center -mt-16 md:-mt-20 mb-6">
          <NeonSign />
        </div>

        <h2 className="text-2xl md:text-3xl text-center text-gray-300 mb-6 font-bold">
          Iniciar Sesión
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center mb-4 text-sm">{error}</p>
        )}

        {/* Formulario */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-3 pt-2">
            <motion.button
              type="submit"
              className="flex-1 flex items-center justify-center bg-red-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiLogIn className="mr-2" /> Ingresar
            </motion.button>
            <motion.button
              type="button"
              className="flex-1 flex items-center justify-center bg-gray-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-600 transition shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                setEmail('');
                setPassword('');
                setError(null);
              }}
            >
              <FiXCircle className="mr-2" /> Cancelar
            </motion.button>
          </div>
        </form>

        {/* Registro + Google */}
        <div className="mt-6 text-center text-sm text-gray-300">
          <p className="mb-2">
            ¿No tienes cuenta? <br />
            <Link href="/signup" className="text-blue-500 hover:underline font-medium">
              Crea una aquí
            </Link>
          </p>
          <p className="my-3 font-bold text-gray-400">O</p>
          
          <motion.button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FcGoogle className="h-6 w-6 mr-3" /> Iniciar con Google
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}