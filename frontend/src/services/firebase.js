// Configuración de Firebase - Consultorio Medrano
// Inicialización de Firebase SDK v9+ (modular)

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhw2FXYNLIb8FLbIEPH0QzI-UMOZLFqMY",
  authDomain: "consultorio-medrano.firebaseapp.com",
  projectId: "consultorio-medrano",
  storageBucket: "consultorio-medrano.firebasestorage.app",
  messagingSenderId: "938145394755",
  appId: "1:938145394755:web:ff391b855aa1f3e26ba4f6",
  measurementId: "G-P7HZ621QKH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  getIdToken
};
