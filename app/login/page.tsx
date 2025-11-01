// app/login/page.tsx
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

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  const handleGoogleLogin = async () => {
    // ... tu código
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main p-4">
      <motion.div
        className="bg-red-500/30 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-md border border-red-500/70"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center -mt-16 md:-mt-20 mb-6">
          <NeonSign />
        </div>

        <h2 className="text-2xl md:text-3xl text-center text-gray-300 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Inputs */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FiLogIn className="mr-2" /> Ingresar
            </button>
            <button
              type="button"
              onClick={() => { setEmail(''); setPassword(''); }}
              className="flex-1 flex items-center justify-center bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <FiXCircle className="mr-2" /> Cancelar
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>
            ¿No tienes cuenta? <br />
            <Link href="/signup" className="text-blue-500 hover:underline">
              Crea una aquí
            </Link>
          </p>
          <p className="my-3 font-bold">O</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FcGoogle className="h-6 w-6 mr-3" /> Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}