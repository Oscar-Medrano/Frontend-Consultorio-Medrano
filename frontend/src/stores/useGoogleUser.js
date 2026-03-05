// Store de Pinia para gestionar el usuario de Google
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getIdToken 
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const useGoogleUserStore = defineStore('googleUser', () => {
  // Estado del usuario
  const user = ref(null);
  const _displayName = ref('');
  const _email = ref('');
  const loading = ref(false);
  const error = ref(null);

  // Computed con getter y setter para permitir asignación externa
  const displayName = computed({
    get: () => _displayName.value,
    set: (value) => { _displayName.value = value; }
  });
  
  const email = computed({
    get: () => _email.value,
    set: (value) => { _email.value = value; }
  });

  // Computed: verificar si está autenticado
  const isAuthenticated = computed(() => !!user.value && !!_email.value);

  // Inicializar el store - escuchar cambios de autenticación
  function initAuth() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser;
          _displayName.value = firebaseUser.displayName || '';
          _email.value = firebaseUser.email || '';
        } else {
          user.value = null;
          _displayName.value = '';
          _email.value = '';
        }
        resolve(firebaseUser);
      });
    });
  }

  // Iniciar sesión con Google
  async function signInWithGoogle() {
    loading.value = true;
    error.value = null;

    try {
      const provider = new GoogleAuthProvider();
      
      // Agregar scopes adicionales si es necesario
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      
      // Actualizar el estado con los datos del usuario
      user.value = result.user;
      _displayName.value = result.user.displayName || '';
      _email.value = result.user.email || '';

      // Persistir en localStorage
      localStorage.setItem('google_user_name', _displayName.value);
      localStorage.setItem('google_user_email', _email.value);

      return result.user;
    } catch (err) {
      console.error('Error en Google Sign-In:', err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Cerrar sesión
  async function logout() {
    loading.value = true;
    try {
      await signOut(auth);
      user.value = null;
      _displayName.value = '';
      _email.value = '';
      
      // Limpiar localStorage
      localStorage.removeItem('google_user_name');
      localStorage.removeItem('google_user_email');
      localStorage.removeItem('paciente_nombre');
      localStorage.removeItem('paciente_email');
      localStorage.removeItem('paciente_pais');
      localStorage.removeItem('paciente_telefono');
      localStorage.removeItem('paciente_motivo');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // Obtener el ID token del usuario actual
  async function getIdToken() {
    if (!user.value) return null;
    try {
      return await user.value.getIdToken();
    } catch (err) {
      console.error('Error al obtener ID token:', err);
      return null;
    }
  }

  // Restaurar datos desde localStorage (para persistencia)
  function restoreFromStorage() {
    const savedName = localStorage.getItem('google_user_name');
    const savedEmail = localStorage.getItem('google_user_email');
    
    if (savedName) _displayName.value = savedName;
    if (savedEmail) _email.value = savedEmail;
    
    // También intentar obtener del objeto user si está disponible
    if (user.value) {
      if (!_displayName.value && user.value.displayName) {
        _displayName.value = user.value.displayName;
      }
      if (!_email.value && user.value.email) {
        _email.value = user.value.email;
      }
    }
  }

  return {
    // Estado
    user,
    displayName,
    email,
    loading,
    error,
    
    // Computed
    isAuthenticated,
    
    // Métodos
    initAuth,
    signInWithGoogle,
    logout,
    getIdToken,
    restoreFromStorage
  };
});
